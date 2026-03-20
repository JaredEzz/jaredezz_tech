---
author: JaredEzz
pubDatetime: 2026-03-20T11:38:00.000Z
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

Anthropic shipped [Claude Code Channels](https://code.claude.com/docs/en/channels) yesterday as a research preview. The idea is simple: instead of Claude Code being something you sit at a terminal and type into, it becomes a background worker. Channels are MCP servers that push events into a running session, so Claude can react to things while you're away from your desk.

The two supported channels right now are Telegram and Discord. Install a plugin, point it at a bot token, launch with `--channels`, pair your account, and from that point on your bot is a real Claude Code session — full tool access, your filesystem, whatever you've got running on the server.

I run a Proxmox homelab with a NixOS LXC as my app server. I wanted to be able to kick off coding tasks from my phone without Tailscaling in, opening Termius, and typing like a normal person. This solves that.

It's also the "OpenClaw on a real subscription" pattern, done properly. More on that later.

## What You Need

- **Claude Code v2.1.80+** — `claude update`
- **Claude Max** ($100/month) — Channels require claude.ai login, API keys don't work
- **Bun** — the channel plugins are Bun scripts
- **A Discord bot** — free, takes 5 minutes in the Developer Portal
- **Somewhere to run it** — homelab, VPS, whatever

## Setting Up the Discord Bot

[discord.com/developers/applications](https://discord.com/developers/applications) → New Application:

1. **Bot** section → create a username → Reset Token → copy it, keep it safe
2. Enable **Message Content Intent** under Privileged Gateway Intents
3. **OAuth2 → URL Generator** → `bot` scope, with: View Channels, Send Messages, Send Messages in Threads, Read Message History, Attach Files, Add Reactions
4. Open the generated URL, add the bot to a server

One important thing: **bots can't be added to group DMs**. They join servers. So if you want other people to use the same bot, you need a server text channel — not a group DM. I'll get to that.

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

`--dangerously-skip-permissions` skips tool approval prompts. Without it, Claude will pause waiting for terminal input that never comes. Only use it in an environment you control.

DM the bot. It replies with a pairing code. In Claude Code:

```
/discord:access pair <code>
/discord:access policy allowlist
```

That last command locks it down — only your Discord account can talk to it. Everyone else gets silently dropped.

## Multi-User Access and Server Channels

The access control lives in `~/.claude/channels/discord/access.json`. After initial setup mine looks roughly like:

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

The `groups` key is where you configure server channels. I added a text channel in my Discord server so a friend could use the bot too — since you can't add a bot to a group DM, a server channel is the right move. `requireMention: false` means they don't have to @mention the bot, it responds to everything in that channel.

The `/discord:access` commands handle all of this — you don't manually edit the JSON. The channel re-reads the config automatically.

To add a server channel and allow someone:

```
/discord:access group add <channel-id>
/discord:access group <channel-id> allow <user-id>
```

People you add this way don't need to pair or do any setup. You're the one running the session — they just talk to the bot.

## Making It Persistent

This is the annoying part. Claude Code checks whether it has an interactive terminal (TTY) on startup. Run it as a plain systemd service and it immediately dies with:

```
Error: Input must be provided either through stdin or as a prompt argument when using --print
```

The fix: wrap it in `tmux` + `script` to fake a PTY.

```bash
tmux new-session -d -s claude \
  'script -q -c "claude --dangerously-skip-permissions --channels plugin:discord@claude-plugins-official" /dev/null'
```

There's also a one-time "do you trust this folder?" prompt on first run. Answer it:

```bash
tmux send-keys -t claude '' Enter
```

After that it runs headlessly. Attach any time with:

```bash
tmux attach -t claude
# Detach: Ctrl+B then D
```

### NixOS

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

Same TTY caveat applies — you'll need to answer the trust prompt once interactively before the service will run fully headlessly.

## Running It on a GCP VM (~$13/month)

No homelab? An e2-small in us-central1 is about $13/month and has enough RAM. e2-micro is ~$6 but the Claude Code installer gets OOM killed — learned that the hard way.

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

Add swap before installing Claude Code — the installer needs the headroom even on e2-small:

```bash
gcloud compute ssh claude-bot --zone=us-central1-a --command="
  sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile &&
  sudo mkswap /swapfile && sudo swapon /swapfile &&
  echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
"
```

The GCP angle is nice for shared setups — anyone with project access can watch the session via Cloud Shell:

```bash
gcloud compute ssh claude-bot --zone=us-central1-a
sudo -u claude tmux attach -t claude
```

## Why This Beats OpenClaw

OpenClaw got popular because it solved a real problem — async, chat-driven AI agents that work while you're away from the terminal. But it did it with third-party code, unofficial API patterns, and a [CVSS 8.8 WebSocket hijacking vulnerability](https://www.crowdstrike.com/en-us/blog/what-security-teams-need-to-know-about-openclaw-ai-super-agent/) that I don't feel great about on a homelab that also runs production stuff.

Channels is the same pattern, except:

- It's first-party Anthropic code
- Your Max subscription explicitly covers it
- Access control is built in, not bolted on
- You're not running someone's npm package with root access

The one real gap: Channels is reactive. OpenClaw has a heartbeat that polls a task list on a timer. Claude Code has [Scheduled Tasks](https://code.claude.com/docs/en/scheduled-tasks) which covers some of this — or you can wire up a cron job that sends a Discord message on a schedule and Claude picks it up through the channel.

## Limitations Worth Knowing

- Research preview — the `--channels` syntax may change
- Claude Max required — no API key auth
- TTY workaround required for headless/service use
- Telegram and Discord only for now (custom channels need `--dangerously-load-development-channels`)
- Reactive only — no built-in proactive/heartbeat behavior yet

## That's It

If you've been running OpenClaw or looking for an excuse to, this is the cleaner path. The Discord setup is approachable enough to walk a non-technical person through — they just need to be in a server your bot is in, and you add their ID to the allowlist. No pairing, no setup on their end.

Hit issues? [Claude Code GitHub](https://github.com/anthropics/claude-code/issues) — it's monitored during the preview.
