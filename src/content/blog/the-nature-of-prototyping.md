---
author: JaredEzz
pubDatetime: 2026-04-07T12:00:00.000Z
title: The Nature of Prototyping in Professional Development
postSlug: the-nature-of-prototyping
featured: true
draft: true
tags:
  - prototyping
  - software-engineering
  - team-dynamics
  - product-development
  - sales-and-engineering
  - ai-coding-tools
description: How four years of building "no more, no less" pushed our team toward clean architecture — and why we're now rediscovering the value of fast prototypes.
---

## Table of Contents

## Intro

Getting into this is going to require some natural history lessons about the company where I work.

Four years ago we started with a single senior staff-level developer and a single junior developer — myself. We built an MVP system but tried hard not to optimize early and only built what we needed to. I eventually left my job to work full time on the project, but by that point two things had happened:

1. We were asked to build features fast and dirty, so we could sell them and start to get clients.
2. Because of personal reasons, the senior engineer left, and we hired more junior and mid-level developers.

Those two things led to a culture where we only built things out as much as we needed to, no more and no less.

## The Rewrite

Two to three years later, the core of our application was robust — the code was clean-ish and mostly maintainable, and worked well for our customer base at the time, but it was built on infrastructure that didn't scale well to multiple instances because of decisions made early on. Caches that built on startup with no good way of staying in sync with each other, a lack of typed structs on either side of an API call to enforce the contract — things that led to us doing a full rewrite of the back end, and a large refactoring of the front end into a cohesive architecture with separate layers.

This is fantastic, by the way. It's so much cleaner. But it was mostly driven by some new hires that had come from established companies with solid revenue pipelines. We weren't even breaking even. So what I fear we lost during that time was trust from our sales team that we could still deliver flashy, sexy new features at a speed that would support their efforts to get new clients. Our team's perceived velocity had tanked.

## Solid, but Slow

Now, we've of course been building things customers ask for to retain them. We've had internal strategy meetings to determine the focus of each release and each year broken into quarters. But because we've been so focused on clean architecture, the dev team would spend a good amount of time solutioning and building the feature solidly, which took longer than just getting a prototype out, and we'd launch it later than sales wanted.

So in the last few weeks we've started meeting more between sales and dev, and ultimately we've come to a few conclusions:

1. It's great that we've proven that we know how to build application features solidly — fully QA'd, designed, test coverage, filters, reports, polished UI/UX flows, the whole nine yards.
2. We sometimes need to build things faster so we can validate them with sales and existing/future clients before spending all that time up front.

## Why Now

Why I think this comes at a perfect time is that our entire team is just now starting to come up to speed with the AI coding tools. We definitely went through the typical [forming, storming, norming, and performing](https://en.wikipedia.org/wiki/Tuckman%27s_stages_of_group_development) stages. I still think we're in the last half of norming and I look forward to the performing stage.

![Tuckman's stages of group development: forming, storming, norming, performing](/assets/tuckman-stages.webp)

<details>
<summary>How I learned this</summary>

When I was a teenager my dad drove me down to southern Utah so I could attend a Timberline scout camp. He attended a Wood Badge course himself — basically the same thing but for adults — at the next campground over. We had dinner together a few times during the week but it was mostly separate. The few things I remember were a crazy capture the flag game in the woods, being ostracized as "the city kid" because I showed up in a purple-and-black tie-dyed v-neck that apparently wasn't up to rural Utah fashion standards, and a small booklet with leadership principles, one of which depicted Tuckman's stages of group development.

</details>

But AI isn't writing those features solidly for us yet. I could try to say why — either we haven't set up our AGENTS.md files correctly, or we need more skills, or we need to be using a better harness, or defining system prompts for various agents before setting them loose on a task. Or maybe it's because it can't do those things all by itself. Either way, I don't think it should. We don't want to [outsource our agency](https://mariozechner.at/posts/2026-03-25-thoughts-on-slowing-the-fuck-down/#toc_1) in building this thing, so in the meantime we'll delegate small tasks along the way to solid features.

But one thing AI coding tools are fantastic at one-shotting is prototypes.
