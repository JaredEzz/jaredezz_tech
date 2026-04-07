---
author: JaredEzz
pubDatetime: 2026-04-07T12:08:00.000Z
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
<summary>Where I first saw this chart</summary>

*When I was a teenager my dad drove me down to southern Utah so I could attend a Timberline scout camp. He attended a Wood Badge course himself — basically the same thing but for adults — at the next campground over. We had dinner together a few times during the week but it was mostly separate. The few things I remember were a crazy capture the flag game in the woods, being ostracized as "the city kid" because I showed up in a purple-and-black tie-dyed v-neck that apparently wasn't up to rural Utah fashion standards, and a small booklet with leadership principles, one of which depicted Tuckman's stages of group development.*

</details>

But AI isn't writing those features solidly for us yet. I could try to say why — either we haven't set up our AGENTS.md files correctly, or we need more skills, or we need to be using a better harness, or defining system prompts for various agents before setting them loose on a task. Or maybe it's because it can't do those things all by itself. Either way, I don't think it should. We don't want to [outsource our agency](https://mariozechner.at/posts/2026-03-25-thoughts-on-slowing-the-fuck-down/#toc_1) in building this thing, so in the meantime we'll delegate small tasks along the way to solid features.

But one thing AI coding tools are fantastic at one-shotting is prototypes.

## Where Prototypes Fit

Design vs implementation is a constant catch-22, chicken-and-egg issue. You want the design to be great, but maybe the UI designer doesn't realize the flashy feature they thought up is a performance nightmare and isn't mathematically possible. But if the developer starts building without understanding how the user will interact with the product, it will likely come out coarse and unrefined, and likely need a rewrite later.

Our prototypes have been awesome because we can have a discussion after only a tiny amount of work has been done (mostly by LLMs too) and we can look at an actual tangible thing, even if it's 0% functional, and decide whether it's technically possible to build, or whether we should can it and start over.

For example, before the latest featureset our whole team worked on for a sprint and released last week, I spun up a quick React page with a few tabs and our main flows. It was in a separate repo in our org and deployed to a random GitHub Pages link, but it was perfect to use in early discussions to explain to the team what we were building, and we kept coming back to it throughout the sprint to maintain the vision.

We've even gotten to the point where a prototype is in a really good state and development could start implementing it, but it's good enough that sales can just use it for demos until a client is invested enough in the idea that we can use it as contract renewal bait, or a potential client sees it as a deal-closer. We wait until then to fully build it out because the later it is, the more likely it is that we'll have more systems it needs to integrate with, or a different idea on how the implementation will go. It helps to have flexibility.

So anyway, we're still working on our process, and there's no silver bullet, but as we look for ways to improve efficiency and communication, I'm definitely going to be building more prototypes to show off. Just a cool thing I've cared about recently that I thought would be nice to share.
