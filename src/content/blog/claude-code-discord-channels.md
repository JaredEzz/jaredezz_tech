---
author: JaredEzz
pubDatetime: 2026-03-20T13:00:00.000Z
title: "Claude Code Channels: the right way to run it headlessly via Discord (best OpenClaw alternative)"
postSlug: claude-code-channels-discord-openclaw-alternative
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
description: Claude Code just shipped Discord and Telegram channels. Here's how I set it up as a persistent homelab agent — and why it replaces the OpenClaw pattern entirely.
---

## Table of Contents

## What Are Claude Code Channels?

Anthropic shipped [Claude Code Channels](https://code.claude.com/docs/en/channels) yesterday as a research preview. Instead of Claude Code being something you sit at a terminal and type into, it becomes a background worker. Channels are MCP servers that push events into a running session, so Claude can react to things while you're away from your desk.

Telegram and Discord are the two supported channels right now. Install a plugin, point it at a bot token, launch with `--channels`, pair your account, and your bot is a real Claude Code session — full tool access, your filesystem, whatever you've got running on the server.

I run a Proxmox homelab with a NixOS LXC as my app server. I wanted to kick off coding tasks from my phone without Tailscaling in, opening Termius, and typing like a normal person. This does that.

## What You Need

- **Claude Code v2.1.80+** — `claude update`
- **A Claude subscription** — Channels require claude.ai login, API keys don't work. Pro ($20/month) should be fine for personal use. Max ($100/month) gets you virtually unlimited — I've never hit the cap on Max 5x
- **Bun** — the channel plugins are Bun scripts
- **A Discord bot** — free, takes 5 minutes in the Developer Portal
- **Somewhere to run it** — homelab, VPS, whatever

## Setting Up the Discord Bot

[discord.com/developers/applications](https://discord.com/developers/applications) → New Application:

1. **Bot** section → create a username → Reset Token → copy it, keep it safe
2. Enable **Message Content Intent** under Privileged Gateway Intents
3. **OAuth2 → URL Generator** → `bot` scope, with: View Channels, Send Messages, Send Messages in Threads, Read Message History, Attach Files, Add Reactions
4. Open the generated URL, add the bot to a server

Bots can't be added to group DMs — they join servers. If you want other people to use the same bot, you need a server text channel. More on that below.

## Installing the Plugin

In a Claude Code session:

```
/plugin install discord@claude-plugins-official
```

Store the token securely:

```bash
mkdir -p ~/.claude/channels/discord
echo "DISCORD_BOT_TOKEN=your_token_here" > ~/.claude/channels/discord/.env
chmod 600 ~/.claude/channels/discord/.env
```

Then configure:

```
/discord:configure your_token_here
```

## Launching

```bash
claude --channels plugin:discord@claude-plugins-official --dangerously-skip-permissions
```

`--dangerously-skip-permissions` skips tool approval prompts — without it Claude pauses waiting for terminal input that never comes. Only use it in an environment you control.

DM the bot. It replies with a pairing code. In Claude Code:

```
/discord:access pair <code>
/discord:access policy allowlist
```

Now only your Discord account can talk to it.

## Multi-User Access and Server Channels

Access control lives in `~/.claude/channels/discord/access.json`. Mine looks roughly like:

```json
{
  "dmPolicy": "allowlist",
  "allowFrom": ["your-discord-id"],
  "groups": {
    "your-server-channel-id": {
      "requireMention": false,
      "allowFrom": ["your-discord-id", "friend-discord-id"]
    }
  }
}
```

The `groups` key handles server channels. I added a text channel so a friend could use the bot too — `requireMention: false` means they don't have to @mention it, it responds to everything in that channel.

You don't edit the JSON directly. The `/discord:access` commands handle it:

```
/discord:access group add <channel-id>
/discord:access group <channel-id> allow <user-id>
```

People you add don't need to pair or do any setup on their end.

## Making It Persistent

Claude Code checks for an interactive terminal (TTY) on startup. Run it as a plain systemd service and it immediately exits with:

```
Error: Input must be provided either through stdin or as a prompt argument when using --print
```

Wrap it in `tmux` + `script` to fake a PTY:

```bash
tmux new-session -d -s claude \
  'script -q -c "claude --dangerously-skip-permissions --channels plugin:discord@claude-plugins-official" /dev/null'
```

First run has a "do you trust this folder?" prompt. Answer it:

```bash
tmux send-keys -t claude '' Enter
```

Attach any time with:

```bash
tmux attach -t claude
# Detach: Ctrl+B then D
```

### NixOS (skip if you're not on it)

Add `bun` to system packages and a service:

```nix
environment.systemPackages = with pkgs; [
  bun
  # ...
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

You'll still need to answer the trust prompt once interactively before it runs headlessly.

## Running It on a GCP VM (~$13/month)

An e2-small in us-central1 is about $13/month. Don't try e2-micro (~$6) — the Claude Code installer gets OOM killed, learned that the hard way.

```bash
gcloud projects create my-claude-bot
gcloud config set project my-claude-bot
gcloud services enable compute.googleapis.com
gcloud compute instances create claude-bot \
  --zone=us-central1-a \
  --machine-type=e2-small \
  --image-family=ubuntu-2404-lts-amd64 \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=20GB
```

Add swap before installing Claude Code:

```bash
gcloud compute ssh claude-bot --zone=us-central1-a --command="
  sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile &&
  sudo mkswap /swapfile && sudo swapon /swapfile &&
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
"
```

Anyone with project access can attach to the session via Cloud Shell:

```bash
gcloud compute ssh claude-bot --zone=us-central1-a
sudo -u claude tmux attach -t claude
```

## vs. OpenClaw

OpenClaw solved a real problem — async AI agents you can ping from your phone. I get why people ran it. But it's third-party code with root access, unofficial API patterns, and a [CVSS 8.8 WebSocket hijacking vuln](https://www.crowdstrike.com/en-us/blog/what-security-teams-need-to-know-about-openclaw-ai-super-agent/) that I'm not thrilled about on a box that also runs actual stuff. Channels is the same workflow, first-party, with access control built in.

I use Claude Code daily — freelance projects and a Team plan at work. I've used OpenCode extensively. I've tried most of the models seriously: GLM-5, MiniMax, Gemini 2.0 Pro and Flash, Codex 5.4 and 5.5. Opus 4.6 is the best I've used for agentic coding and it's not close. Anthropic built the model, the harness, the tooling, and the subscription together — it's a walled garden in the same way Apple is, and sometimes the quality makes it worth it.

One thing Channels doesn't do yet: proactive behavior. It's reactive — you message it, it responds. OpenClaw has a heartbeat that polls a task list on a timer. Claude Code has [Scheduled Tasks](https://code.claude.com/docs/en/scheduled-tasks) for some of that, and a cron job that drops a message into Discord on a schedule works for the rest.

## Current limitations

- Research preview — `--channels` syntax may change
- Requires claude.ai login, no API key auth
- TTY workaround needed for headless use (the `script` thing above)
- Telegram and Discord only for now — custom channels need `--dangerously-load-development-channels`
- Reactive only, no built-in heartbeat

---

If you've been running OpenClaw or considering it, this is the same thing without the sketchiness. Non-technical people don't need to do any setup — get them into a server with the bot and add their Discord ID to the allowlist.

Hit issues? [Claude Code GitHub](https://github.com/anthropics/claude-code/issues).

---

*Yes, Claude helped write this — as a summary of a setup process I did entirely manually, which took most of a night. I reread it, edited it, and iterated a few times. I don't consider that AI slop any more than using Grammarly makes your email AI-generated. The actual work happened first.*

If this saved you time, drop a comment. Curious how people are using Channels — especially if you find a cleaner solution to the TTY problem.
