---
author: JaredEzz
pubDatetime: 2026-03-20T12:00:00.000Z
title: Claude Code Channels — Your AI Dev Assistant on Discord
postSlug: claude-code-discord-channels
featured: true
tags:
  - ai
  - claude
  - discord
  - homelab
  - anthropic
  - automation
  - self-hosted
  - nixos
  - gcp
description: How I set up Claude Code's new Channels feature to chat with my AI coding assistant from Discord — and how you can build a sanctioned, subscription-backed chatbot for non-technical users too.
---

## Table of Contents

## What Are Claude Code Channels?

Anthropic just shipped [Claude Code Channels](https://code.claude.com/docs/en/channels) as a research preview, and it's one of the more quietly significant releases in the Claude ecosystem.

The short version: Channels are MCP servers that push events into a *running* Claude Code session. Instead of Claude Code being something that holds your terminal hostage while you type at it, it becomes a background worker you can hand tasks to from anywhere — including your phone.

The first two officially supported channels are **Telegram** and **Discord**. You install a plugin, configure a bot token, launch with `--channels`, pair your account, and from that point on you can DM your bot to kick off coding tasks, ask questions about your codebase, or manage your homelab — all from your phone.

This is the "OpenClaw on a subscription" pattern, done properly. Instead of running a third-party agent with broad permissions and [documented security vulnerabilities](https://www.crowdstrike.com/en-us/blog/what-security-teams-need-to-know-about-openclaw-ai-super-agent/), you're running Claude Code — the actual Anthropic product — with a Claude Max subscription that explicitly sanctions this usage.

## What You'll Need

- **Claude Code v2.1.80 or later** — `claude update` if you're behind
- **A Claude Max subscription** (Channels require claude.ai login — API keys are not supported)
- **Bun** — the channel plugins are Bun scripts
- **A Discord bot** — free to create in the Discord Developer Portal
- **A server to run it on** — your homelab, a VPS, a spare machine

## Setting Up the Discord Bot

Head to [discord.com/developers/applications](https://discord.com/developers/applications):

1. **New Application** — give it a name
2. Go to the **Bot** section — create a username, click **Reset Token**, copy it
3. Scroll down to **Privileged Gateway Intents** — enable **Message Content Intent**
4. Go to **OAuth2 → URL Generator** — select `bot` scope with these permissions:
   - View Channels
   - Send Messages
   - Send Messages in Threads
   - Read Message History
   - Attach Files
   - Add Reactions
5. Open the generated URL and invite the bot to a server (a private one just for you is fine)

## Installing the Plugin

In a Claude Code session:

```
/plugin install discord@claude-plugins-official
```

Save your bot token somewhere secure. On Linux I use a dedicated env file with tight permissions:

```bash
mkdir -p ~/.claude/channels/discord
echo "DISCORD_BOT_TOKEN=your_token_here" > ~/.claude/channels/discord/.env
chmod 600 ~/.claude/channels/discord/.env
```

Configure Claude Code to use it:

```
/discord:configure your_token_here
```

## Launching with Channels

```bash
claude --channels plugin:discord@claude-plugins-official --dangerously-skip-permissions
```

The `--dangerously-skip-permissions` flag means Claude won't pause to ask you to approve tool use — necessary for async operation since you won't be at the terminal. Only use this in environments you trust.

DM your bot on Discord. It replies with a pairing code. Back in Claude Code:

```
/discord:access pair <code>
/discord:access policy allowlist
```

The allowlist policy means only your Discord account can drive the session — everyone else is silently dropped.

## Making It Persistent

The tricky part: Claude Code detects whether it has an interactive terminal (TTY). Running it as a plain systemd service fails because there's no TTY, and it exits with `Input must be provided either through stdin or as a prompt argument when using --print`.

The workaround that works is wrapping it in `tmux` with `script` to fake a PTY:

```bash
tmux new-session -d -s claude \
  'script -q -c "claude --dangerously-skip-permissions --channels plugin:discord@claude-plugins-official" /dev/null'
```

When the session starts you'll get a one-time "do you trust this folder?" prompt. Answer it:

```bash
tmux send-keys -t claude '' Enter
```

To attach later and see what's happening:

```bash
tmux attach -t claude
# Detach without killing: Ctrl+B then D
```

### NixOS

If you're on NixOS, add `bun` to your system packages and a systemd service that wraps the tmux launch. Here's the relevant config block:

```nix
environment.systemPackages = with pkgs; [
  bun
  # ... your other packages
];

systemd.services.claude-discord = {
  description = "Claude Code with Discord Channel";
  after = [ "network-online.target" ];
  wants = [ "network-online.target" ];
  wantedBy = [ "multi-user.target" ];
  serviceConfig = {
    Type = "simple";
    User = "youruser";
    ExecStart = "${pkgs.util-linux}/bin/script -q -c '/home/youruser/.local/bin/claude --channels plugin:discord@claude-plugins-official --dangerously-skip-permissions' /dev/null";
    Restart = "on-failure";
    RestartSec = "30s";
    EnvironmentFile = "/home/youruser/.claude/channels/discord/.env";
    WorkingDirectory = "/home/youruser";
  };
};
```

Note: the systemd service approach has the same TTY issue. The `script` wrapper resolves it for the NixOS service as well, but the first-run trust prompt still needs to be answered interactively once. After that it runs headlessly.

## Running It on a $13/Month GCP VM

If you don't have a homelab or want a dedicated cloud instance:

```bash
# Create the project and VM
gcloud projects create my-claude-bot
gcloud config set project my-claude-bot
gcloud services enable compute.googleapis.com
gcloud compute instances create claude-bot \
  --zone=us-central1-a \
  --machine-type=e2-small \
  --image-family=ubuntu-2404-lts-amd64 \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=20GB

# Add swap (e2-small has 2GB RAM, the installer needs headroom)
gcloud compute ssh claude-bot --zone=us-central1-a --command="
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
"
```

e2-small runs about **$13/month**. e2-micro is ~$6 but too tight for the Claude Code installer — it gets OOM killed without swap.

SSH in, create a dedicated user, install Bun and Claude Code, drop the bot token in the env file, and follow the same setup steps as above.

The neat thing about GCP is that anyone with project access can attach to the tmux session via Cloud Shell:

```bash
# In Cloud Shell at console.cloud.google.com
gcloud compute ssh claude-bot --zone=us-central1-a
sudo -u claude tmux attach -t claude
```

This makes it genuinely collaborative — your whole team can see what Claude is doing in real time.

## Building a Chatbot for Non-Technical Users

This is where it gets interesting. The `--channels` flag and the access control system give you a real foundation for a multi-user chatbot that's actually backed by a legit Anthropic subscription.

### Expanding the Allowlist

The default pairing locks to a single Discord account. But you can add more users:

1. Have the new user DM the bot — they'll get a pairing code
2. Run `/discord:access pair <code>` to approve them
3. Their Discord ID is now on the allowlist

Each user in the allowlist can send messages that Claude will respond to. This turns your Claude Code session into a shared assistant for a small team or group.

### What This Looks Like in Practice

Create a private Discord server. Invite your bot. Walk each person through the pairing flow (it's just: DM the bot, get a code, give it to whoever runs the setup). Now your whole group has a conversational AI assistant that:

- Runs on your hardware or a VM you control
- Is backed by your Claude Max subscription (fully sanctioned by Anthropic)
- Has access to whatever your homelab or server exposes
- Responds in Discord, where non-technical users already are

For non-technical users, Discord is a far more natural interface than a terminal. They don't need to know what Claude Code is — they just DM a bot and get answers.

### Coaching New Users Through It

If you want others to run their *own* instance (rather than sharing yours), the barrier is low:

1. They need a **Claude Max subscription** (~$100/month) — this is the sanctioned path, not a workaround
2. Install Claude Code (`curl -fsSL https://claude.ai/install.sh | bash`)
3. Install Bun, create a Discord bot, drop the token in the env file
4. Run with `--channels` and pair

The whole thing takes maybe 20 minutes the first time. The Discord Developer Portal setup is the fiddliest part — walk them through it over a screen share.

### Why This Beats OpenClaw

OpenClaw (and its predecessors) achieved the same async, chat-driven AI agent pattern, but:

- Required running third-party code with broad system access
- Has had documented security issues (CVSS 8.8 WebSocket hijacking)
- Used unofficial API access patterns
- Required significant self-hosting infrastructure

Claude Code Channels gives you the same workflow with:

- First-party Anthropic code
- A subscription that explicitly covers this use case
- Per-sender allowlisting built in
- No unofficial API gymnastics

The one honest gap: Channels is still **reactive only**. OpenClaw has a heartbeat system where the agent proactively checks a task list on a timer. Claude Code's [Scheduled Tasks](https://code.claude.com/docs/en/scheduled-tasks) feature covers some of this, and you can bridge the rest with a cron job that drops a message into Discord via the API on a schedule — Claude picks it up through the channel and acts on it.

## Current Limitations

- **Research preview** — the `--channels` flag syntax may change
- **No proactive behavior** — Claude waits for you to message it
- **Permission prompts block async** — `--dangerously-skip-permissions` is required for headless use
- **TTY requirement** — running as a plain service requires the `script` workaround described above
- **Only Telegram and Discord** for now — custom channels require `--dangerously-load-development-channels`

## Wrapping Up

Claude Code Channels is the right way to do what people have been hacking together with OpenClaw, AutoGPT wrappers, and unofficial API access for years. It's backed by a real subscription, built by Anthropic, and designed for exactly this use case.

The Discord setup is approachable enough that you can walk non-technical users through it. And with the allowlist system, you can share one instance with a small group without giving anyone more access than they need.

If you set this up and hit issues, the [Claude Code GitHub repo](https://github.com/anthropics/claude-code/issues) is the right place to report them — it's actively monitored during the research preview.
