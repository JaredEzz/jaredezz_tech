---
author: JaredEzz
pubDatetime: 2026-04-22T05:22:00.000Z
title: Fantastic Computers & Where to Find Them
postSlug: fantastic-computers-and-where-to-find-them
featured: true
draft: false
tags:
  - computers
  - hardware
  - homelab
  - nostalgia
  - kindle
  - pixel
  - personal
description: A tour through every computer I've owned — phones, laptops, the homelab, the tablets, and the janky formative-years devices I used to text my friends before I was allowed to have one.
---

> *A computer is the most remarkable tool that we've ever come up with. It's the equivalent of a bicycle for our minds.*
> — Steve Jobs

## Table of Contents

## Intro

Last week's post was about the slices of the internet I keep coming back to, but this one's all about the machines I use to get to those places, and other stuff.

I've had my fair share of computers, and given the amount of time I've spent on them, it's fair that I've gotten attached to them. Some still live with me on my desk or in my pocket, in a backpack I take to work or in a desk drawer or nightstand. Some are in a box in a closet with a dead battery, waiting to be dug up by my kids someday so I can tell them a story. A few didn't seem so much computers, but companions - they did one thing, they did it well, and I thoroughly enjoyed them for it.

Here's the tour.

---

## The Phone — Swiss Army Knife

It's kind of hard to argue that the phone isn't the most important computer I own. It's dumb and cliche but hey, here we are in 2026 and if there's a problem in my life, it's probably in part caused by and simultaneously solvable by using my phone.

It's a camera, a flashlight, my tap-to-pay wallet replacement, a TV, a map, and a gaming handheld. Lately it's been a great terminal for vibe-coding. If I had to pick one computer to keep I'd probably keep this one. It wouldn't be the most enjoyable to use because while it does a lot of things, it doesn't do any of them particularly well - I love that I have the luxury of preferring depth over breadth, but it is what it is.

My very first smartphone was the **Moto X**<sup>[1](#footnotes)</sup>. It was 2014 and I was starting my senior year of high school, and Motorola had just been acquired by Google and was making phones in Houston, where I was born! The customization was super fun and I was excited about Android 4.4.4 KitKat as a google fanboy.  
After that, the phones I've had in order: **Nexus 5X, Pixel 2, Pixel 4XL, Pixel 6, Pixel 10 Pro.**

I realized recently that every phone I've ever owned has had an X in its name. I didn't do that on purpose, but I've accidentally locked myself into a tradition I now have to keep. If companies stop using words like "Max" or "XL" sizing I may have to invent my own phone or never upgrade. Honestly, the only reason I'd make a big change in the smartphone space is to get a foldable, which I've come close to a few times but haven't pulled the trigger on. Currently eyeing the latest Oppo Find N6 - it looks promising, but alas, no X in the name.

---

## The Laptop

The first laptop I owned was a **late-2008 aluminum unibody MacBook**, a hand-me-down form my uncle when I started my freshman year college. After serving an LDS mission I tried to continue to use it as my college machine and it was so unusably slow that I just lived in the BYU engineering labs on their linux machines to do real work. That was fine before I was married, but then, spending all my time in a campus computer lab stopped being as acceptable, and I bought myself a fancy **HP Envy** with a two-way hinge and a touchscreen and pen support. I thought I'd use the pen all the time and, I did for a while but mostly it was just a novelty because OneNote always has sucked and always will.

It was also the first computer I ever owned with an AMD chip. Which mattered to no one but me, and I still feel a little smug about it. My wife has used it repeatedly for touch-screen steam games like Mini Motorways, and we use it for Excel every month when we update our budgets and finances. It's probably on its last couple years of life, and I think about removing Windows in favor of a different OS which would either extend its lifespan or immediately end it. 50-50

(we also have our work laptops but those aren't interesting - I have a Thinkpad and she has a 13" macbook pro)

---

## The PC - Workhorse

I always had PCs available in my home growing up but the first desktop I owned was borrowed from a friend who wanted me to have it to game on - and I gradually expanded into something that was barely his PC anymore, ship of theseus and all that [(PCPartPicker)](https://pcpartpicker.com/user/JaredEzz/saved/#view=rqCZcf). I got into streaming on Twitch with that PC during COVID and played a ton of Destiny 2 and other steam games since it had a workable GPU, but eventually I had enough disposable income that I wanted an upgrade. Another friend had started building PCs for hire so I called him over to make one with me with some actual good parts. Not top of the line, but not shabby either.

It wasn't just for gaming - I slowly accumulated services that needed to be always on - Teslamate, Audiobookshelf, Plex, you name it. I didn't want the wear and tear on my main PC so I eventually migrated that all to the next machine.

---

## The Homelab - The Vault

This is hopefully the last computer I'll ever need, and the one I wouldn't need to grab in event of a house fire, but I'd be tempted to. What led me here was a combination of the always-running apps on my PC and growing peer pressure from a group of friends who talked about their NAS systems all the time. I wasn't about to drop a ton of money on a fancy synology, but I found some local sellers with the parts I needed and ordered some drives online to make it work. This was just earlier this year - I spent my annual christmas bonus from work on it, which was the excuse I use mentally for how I justified the cost.

It's pretty simple - a Proxmox host running a NixOS LXC with a bunch of stuff that I configure declaratively - which is a fancy way of saying the whole thing is described in text files, and if it ever catches fire I could rebuild it from scratch by re-running a command. Or at least that's the idea. It hosts my self-hosted things which is growing like crazy now that I've developed an addiction to AI coding tools. Opencode, Gemini, and Claude Code are the only reasons I felt confident enough to undertake a project like this. I've always been interested in being more technical but never had the gumption or prowess to find everything I needed on forums or scouring through documentation and man pages. Asking claude to spin up a new docker container is so easy that I do it multiple times a week, and it's just as easy to spin down when I'm done with it. I do my best to keep things secure too.

The thing I love about it is that I don't have to buy a new computer anymore when I want to do a new thing. I just add a container. It's a weirdly freeing relationship to hardware. The hardware is the vault; the software is what I actually care about. I have a better backup system for this than I ever have before - for family photos, my personal notes, and whatever files are important to me at any given time.

---

## The Tablets

I never thought of myself as a tablet person, and then I looked up and realized I had three.

### iPad mini

This one came with me on my mission. I used Apple Notes copiously on every lesson plan, every training outline, every thought I had in a month went into Apple Notes. Around the same time, Apple released **Swift Playgrounds**, and I already knew I wanted to go into software so I spent late evenings poking at it.

The thing I ended up loving most though wasn't the coding, it was deep linking. You could write a note with a link that opened another app on the device, so I'd put together training handouts with tap-to-open references to study materials instead of web pages, AirDrop them to other missionaries, and they thought I was magic. Some of the guides I put together traveled around the mission like wildfire and I was asked to keep updating the docs after a while - it was our own little distributed intranet I guess.

The mini still works even though it's way past its upgrade lifetime. None of the streaming apps work on it - these days it just reads PDFs and EPUBs for me on occasion. It earned a dignified semi-retirement.

### Kindle Paperwhite

I think this is one of my favorite computers I own. Single-use machines are great when they do their one job perfectly, and very few do it as well as the Paperwhite. The e-ink is beautiful, and the new version has dark mode, which is even better. I gave my old one to my little sister when she started college because I got my first one my freshman year to avoid paying exorbitant fees for my textbooks. I ended up using it less for textbooks and more for reading novels like Project Hail Mary, the Martian, and Ready Player One.

My one complaint is that you can't pair a bluetooth device of any kind to turn the page. I just want to use a Switch joycon, or a Bluetooth mouse, or literally anything - I have a weird aversion to touching the screen of whatever device I'm currently using while I'm using it unless it explicitly requires touch controls. My current workaround is a little capacitive remote that taps the screen for me, which works, but I'd rather the Kindle just let me connect something to it so I can make a better solution. I'll probably end up on a Kobo or some other e-ink tablet someday but I love the kindle's form factor and as long as they keep letting me send my own .epubs to it, I'll be okay.

### Amazon Fire tablet

I'm pretty addicted to Old School RuneScape. Last year a limited-time game mode was coming up and I was planning to play a bunch on mobile, because my wife was pregnant and was going to bed early every night from being sore and I wanted to keep her company, at least physically if not mentally. I bought a small Fire tablet off Craigslist for twenty bucks and flashed open-source software on it to get it as close to stock Android as I could.

When the game mode ended, I watched the entirety of *Rick and Morty* on it. After that I realized my phone was about 10x faster at every single thing it tried to do, and the Fire slowly stopped getting picked up. Our nanny uses it now to log our little one's nap times while we're still figuring out her sleep schedule. Which is, honestly, the most useful thing it has ever done. For a time I used it as a photo frame too.

---

## Formative Years

I did most of my early tinkering on machines that weren't mine. Not sure what it was that drew me to computers - we had family Windows PCs my whole childhood, and we had access at school in computer labs too. I learned to type, played CD-ROMs, wrote homework assignment papers in Word, made presentations in PowerPoint, and designed invitations for my birthday parties in Publisher. But I don't really think of any of those as my computers, because I never had unfettered access to any of them.

The next three I did.

In a family where I wasn't getting a cell phone before I was sixteen, and a social situation where all my friends were a few years older and already had phones, most of my early tinkering was about bypassing restrictions and figuring out how to text them anyway. Whenever I tell my wife these stories she quotes Jurassic Park, but instead of "life finds a way," it's "Jared will find a way to have internet access."

### The Peek

The first machine I used for that was a little **Peek** email device.<sup>[2](#footnotes)</sup> My dad got it for me because he thought it was neat, and it was - the keyboard in particular was incredibly satisfying. I learned pretty quickly how to use email for everything. Dad would forward me the news, I signed up for a joke-of-the-day newsletter and a daily astronomy report, and at some point I figured out you could email a phone number and the person on the other end could reply with SMS or some kind of bridge. I still don't fully understand it, but it worked.

My best friend had an iPod Touch and was in the same no-phone household I was. We emailed back and forth, and used our emails as a shared gateway to text our mutual friends. It was absurd, but it worked and I felt pretty clever about it.

### Palm Treo 700wx

At some point my dad upgraded from his **Palm Treo**<sup>[3](#footnotes)</sup> and it came down to me. That thing was a brick - I probably could've dropped it and the floor would get more damaged than it would. I loved the stylus for the same reason I loved the DS - I was used to it, and it felt cool to use on Windows Mobile. But the Treo had actually usable apps, the most interesting of which was a web browser. Images barely loaded, which in hindsight was probably good for my nascent adolescent brain.

Google Voice, though, had no trouble launching, so I got myself a phone number. I'm still a little unclear on how the Treo had internet at all, but I think it worked without wifi. Those were the wild-west of 3G days, and I wasn't using much bandwidth, so it's possible my parents were quietly paying for a cell line they didn't know I was using, or it was just an included add-on. I texted my friends like crazy on that, and it worked so much better and faster than the Peek.

### Nintendo 3DS

Finally, my **3DS**. I used Google Voice on that too, and its browser was the first one I had access to that felt genuinely fast. I used it for Tumblr, mobile Facebook, Wikipedia, Google Buzz, *Avatar: The Last Airbender* and *How I Met Your Mother* on the Netflix app, and falling asleep to Crash Course and Vsauce on YouTube. The screen was tiny but with the headphone jack, it was everyhting I needed. I think I used it more for "computing" than gaming because after I played through Pokemon Y and Alpha Sapphire and played enough Smash Bros and Mario Kart, any other games just cost money but there were new things on the internet every day for free - this was the same time I got into webcomics like XKCD and The Oatmeal.

---

## Conclusion - Liberating Form

It's a little sad to me that computers have gotten so ubiquitous that they've lost some of the novelty they used to have.

I'm a fan of a concept called **Liberating Form**, from a 1975 discourse that related it to religion and poetry, but at the base level describes how constraints and limits really unlock creativity and learning. When the **MacBook Neo** came out, a lot of the discussion around it hearkened back to my early days and made me feel nostalgic for when my computers couldn't do everything easily. I see iPad kids inundated with attention-grabbing material that didn't require any work to produce and doesn't have many limits to push back against.

I'm sure we'll keep figuring out what computing looks like for the next rising generation (cue the old Apple ["what's a computer?"](https://www.youtube.com/watch?v=Ixy2ql7g3-I) ad), but I've been super glad I got to experience what it looked like for mine.

---

## About This Post

A few friends and I decided to do a weekly blog challenge through the month of April 2026 — each week one of us picks a prompt and we all write something to it. Week 3 was Dave's turn:

> *How do you compute? (Explain what computers you use, ones you used to use, software you use, just whatever you think answers the question.)*

Go read what the others wrote this week:

- [Sam](https://samwarnick.com/blog/how-do-i-computer/)
- [Carter](https://carter.works/blog/2026-04-21-a-totally-objective-ranking-of-configuration-languages/)
- [Dave](https://catskull.net/how-i-compute-2026.html)

---

#### Footnotes

[1.](#the-phone--swiss-army-knife) The **Moto X** (1st gen, 2013). Mine had a silver accent ring instead of the red one in this shot. Image via [IBTimes UK](https://www.ibtimes.co.uk/).

![Moto X (1st gen)](/assets/moto-x.jpg)

[2.](#the-peek) The **Peek** email device. Mine had a black front like the first photo; the second shows the back well. Images originally from [The Gadgeteer](https://the-gadgeteer.com/2010/10/) and [Wired](https://www.wired.com/).

![Peek with black front](/assets/peek-black.jpg)

![Peek back view](/assets/peek-back.jpg)

[3.](#palm-treo-700wx) The **Palm Treo 700wx** — exact model I had. Image via [Wikipedia](https://en.wikipedia.org/wiki/Treo_700wx) (same photo used for both 700w and 700wx articles — visually identical).

![Palm Treo 700wx](/assets/palm-treo-700w.jpg)
