---
author: JaredEzz
pubDatetime: 2026-05-23T21:13:00.000Z
title: My Big Fat Greek Restaurant Debacle
postSlug: big-fat-greek-restaurant-debacle
featured: false
draft: false
tags:
  - work
  - lunch
  - doordash
  - rant
  - personal
description: I'm tired of being lunch leader at work.
---

## Table of Contents

## The Setup

I've been in charge of ordering meals for my team when we're in office on Fridays for a few years now.

DoorDash is the easiest way I've found to do it. They have a group order system that works pretty well.<sup>[1](#footnotes)</sup> It doesn't take me that much time. But it's ripe for disruption — and I'll get to the reason why.

Side note: last March we started a polling system. We did a March Madness style bracket where the winner of each lunch poll went on to the next round. It didn't work great because people didn't always choose their favorite — they just chose what they were in the mood for that day. Like Indian food lost on one given day because it was warmer, so the soup & salad restaurant was more favorable under those conditions, whereas most people actually preferred the Indian restaurant in the long run when we got to it in the loser's bracket later that year. There's probably an ELO system I could rig up but I don't care that much. We've stuck with the polls ever since, even though the brackets were too much to maintain.<sup>[2](#footnotes)</sup>

## Today's Poll

Today we finally got to a poll of [GR Kitchen](https://eatgrkitchen.com/) vs Zao Asian Café, and GR Kitchen won — thankfully. I love Greek food. We usually do Spitz, but one of our team members is gluten intolerant, and even though they have GF-labeled menu items, they have a disclaimer that all the food is prepared willy nilly (I'm paraphrasing) on the same surfaces, so we only order from them when he's OOO.

We always start our lunch polls early, on my way into the office around 7 or 8. I schedule them ahead of time if possible, but Microsoft Teams sucks and lets you *either* schedule a regular message *or* send a poll. You cannot schedule a poll.<sup>[3](#footnotes)</sup>

At 9:30 I figure everyone's had time to vote, so I take the winner and start a group order. Everyone has an hour to order. Around 10:30 I start bugging people who haven't ordered. By 11 I can place the order so it arrives by 12. That's the goal.

## The Timeline

Today is where things fell apart, and here's where the actual story begins.

- **10:30** — We have our weekly Friday standup, which is longer than most. Reviewing sprint points and time estimates for the week to adjust, as well as high-priority tasks people think they might not finish to reassign them if needed.
- **10:40–50ish** — 5 of the 11 people had ordered. The restaurant is closed. Their menu reminded us in every item description "it's cheaper to order from our website," but I ignore it like I always do because group order on DoorDash is easier.
- **10:56** — Team member #6, who was running the meeting, tells me they can't order. They're trying to, but the menu is gone. I verify. The menu is gone. The restaurant opens in a few minutes though so I tell him to just wait, maybe it'll resolve then.
- **11:00** — Nothing happened.
- **11:05** — The menu is back up. There are pictures now! There isn't the same message of "order on our website." Did they change their menu mid-order? Our old group cart is invalid. Everyone has to reorder. We get everyone's order in. We're in a meeting though.
- **11:27** — Meeting is slowing down, at least the part I have to present in is over, so I go to schedule it. No pickup times available. What?!? There's no way to order it.
- **11:45** — Meeting is over, so I finally have time to confirm. It's not working. So I go to their website to manually order delivery AND IT'S NOT EVEN CHEAPER.
- **11:50** — I've manually input all the orders from the screenshots of the DoorDash cart. Luckily it's the same 7 or 8 options. It's Greek food: lemon rice, Greek salad, vegetables, potato medley, choice of chicken/beef/lamb/pork, sauces are tzaziki/hummus/kafteri, and you can have it in a bowl, plate, gyro, or taco form factor. I didn't look any of that up. I don't know if I'll ever forget that menu now — it's thoroughly engrained.
- **12:05** — I pick up the food. I decided to just order pickup because at this point it would take another half hour to get the food and I just want this over with.
- **12:25** — I get back to the office with the food. People are deep in a design discussion whiteboarding a DB schema change. They aren't even ready for food. That's okay, because I still need to match all the orders with who gets what — DoorDash has names, but the GR Kitchen website doesn't. Luckily they didn't forget anything.
- **12:35** — We finally sit down to eat. Everyone loves it. The food was delicious. I wish it weren't, because now I'm going to have to figure this out again when we inevitably want to order from them again in a few weeks.

## The Moral

DoorDash is ripe for disruption. It's 2026 — there should be a Chrome extension or an app, or *something*, where I can have everyone go to a restaurant's website, pick what they want, fill out the form, and have it collate the results into a group cart for me to order with one payment method — without requiring that service to also fulfill the order and add a 20% upcharge. I don't care if you make it an API — I'll vibecode the front end. Maybe this kind of thing exists, but they probably have service fees I don't want to pay. I'm at the point where I might just build it myself. That's the only way to get things the way you want.

---

#### Footnotes

[1.](#the-setup) Costco also sells bundles of gift cards at a discount, so even though I expense the reports, I like to think I'm saving us money by using the discounted gift cards. It's negligible but it adds up.

[2.](#the-setup) How do I pick the restaurants then, you ask? Usually I just pick what I feel like. Jk, kinda, but not really, only sometimes. If it's someone's birthday that week, or they were on call and had a particularly rough time of it, I just ask them what they want and we don't do a poll. Maybe they ran one of our releases so they get to pick one. We have a rotation of the same 5 or 10 places anyway. Thai basically every other week. It's free food. Nobody complains.

[3.](#todays-poll) That's frustrating thing about Teams #2,319 on my list, and why we'd be better off using Discord than that corporate dumpster fire piece of software.
