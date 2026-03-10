---
author: JaredEzz
pubDatetime: 2026-03-10T21:00:00.000Z
title: How to Join Jared's Minecraft Server
postSlug: minecraft-server
featured: true
tags:
  - minecraft
  - gaming
  - homelab
description: Connection instructions for Java and Bedrock players to join Jared's Minecraft server via GeyserMC
---

**Server Address:** `craft.jaredezz.tech`

Both Java and Bedrock players play on the same world via GeyserMC.

---

## Java Edition (PC/Mac)

### Mac
1. Open **Minecraft: Java Edition**
2. Click **Multiplayer** → **Add Server**
3. Server Address: `craft.jaredezz.tech:25565`
4. Click **Done**, then select the server and click **Join Server**

### Windows
1. Open **Minecraft: Java Edition** (from the Minecraft Launcher, make sure "Java Edition" is selected)
2. Click **Multiplayer** → **Add Server**
3. Server Address: `craft.jaredezz.tech:25565`
4. Click **Done**, then select the server and click **Join Server**

> Port 25565 is the default Java port — you can also just enter the IP without the port.

---

## Bedrock Edition (via Geyser on port 19133)

Bedrock players connect through GeyserMC. You authenticate with your **Microsoft account** — no Java account needed.

### Windows 10/11 (Bedrock)
1. Open **Minecraft for Windows** (Bedrock Edition, from the Microsoft Store)
2. Click **Play** → **Servers** tab → scroll down to **Add Server**
3. Server Name: `Jared's Server`
4. Server Address: `craft.jaredezz.tech`
5. Port: `19133`
6. Click **Save** then **Join Server**

### Mobile (iOS / Android)
1. Open **Minecraft** (Bedrock Edition)
2. Tap **Play** → **Servers** tab → scroll down to **Add Server**
3. Server Name: `Jared's Server`
4. Server Address: `craft.jaredezz.tech`
5. Port: `19133`
6. Tap **Save** then tap the server to join

### Nintendo Switch
The Switch version of Minecraft doesn't have an "Add Server" button by default. You need to use a **DNS workaround** to connect to custom servers.

#### Option A: BedrockConnect (Recommended)
1. Go to **System Settings** → **Internet** → **Internet Settings**
2. Select your Wi-Fi network → **Change Settings**
3. Set **DNS Settings** to **Manual**
4. **Primary DNS:** `104.238.130.180`
5. **Secondary DNS:** `008.008.008.008`
6. Save and connect
7. Open **Minecraft** → **Play** → **Servers** tab
8. Select **any featured server** (e.g., Hive, CubeCraft — it doesn't matter which)
9. A **BedrockConnect** menu will appear with a "Connect to a Server" option
10. Enter:
    - Server Address: `craft.jaredezz.tech`
    - Port: `19133`
11. Click **Submit** to join

#### Option B: Open DNS (Alternative)
If BedrockConnect is down, try these DNS servers instead:
- **Primary DNS:** `173.82.100.84`
- **Secondary DNS:** `008.008.008.008`

Same steps as above after changing DNS.

> **Note:** After you're done playing, you may want to switch DNS back to **Automatic** so other Switch online features work normally.

---

## Troubleshooting

- **"Unable to connect"** — The server might be down or restarting. Try again in a minute.
- **Switch can't find BedrockConnect menu** — Double-check DNS settings, restart Minecraft
- **Bedrock player name has a `*` prefix** — This is normal with Floodgate (e.g., `*YourName`)
- **"Disconnected" on first join** — Geyser may still be loading. Wait 30 seconds and retry.
