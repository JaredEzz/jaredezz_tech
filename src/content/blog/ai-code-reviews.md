---
author: JaredEzz
pubDatetime: 2023-08-05T17:15:00.000Z
title: AI code reviews are here
postSlug: ai-code-reviews
featured: true
tags:
  - ai
  - code-review
  - open-ai
  - github-actions
  - gpt-api
  - pull-requests
  - automation
  - code-quality
  - software-engineering
  - dev
description: Learn how to utilize OpenAI’s GPT API in GitHub Actions pipelines to review your pull requests
---

## Table of Contents
## Intro
When it comes to code reviews, nothing beats an experienced software engineer with project context. Unfortunately, our team members often have many demands on their time.<sup>[1](#footnotes)</sup>

AI might just be the buzziest buzzword in today’s tech industry, and while I'd agree that much of the hype is egregiously blown out of proportion, I do think  any developer who’s used GPT-4 to assist them in the process of working on software will testify to specific use cases where it comes in handy.<sup>[2](#footnotes)</sup>

The best part of automated code reviews as part of a GitHub Actions pipeline is that it’s *completely passive*. 

With ChatGPT, CodeGPT, Claude or other AI coding tools, to leverage the power of the trusty Language Learning Models, you have to make a conscious effort to craft the perfect prompt and give the right context for your question in hopes of receiving a magical response to help you in the right direction. 

This workflow requires none of that. Just commit your code and create a PR like usual. The rest will be taken care of. And if the reviews are completely devoid of help, or full of hallucinations, as GPT is prone to do, just ignore it!

## How it works

The AI Code Reviewer GitHub Action retrieves the pull request diff, filters out excluded files, and sends code chunks to the OpenAI API. It then generates review comments based on the AI's response and adds them to the pull request.

If you’re familiar with GitHub Actions, you can find all the information you need at the marketplace link [here](https://github.com/marketplace/actions/openai-gpt-code-review-action). Everything you need is in the README – enjoy!

For those of you who’d like a step-by-step walkthrough, let’s get started.

## OpenAI API token & model

To use this GitHub Action, you need an OpenAI API key. If you don't have one, sign up for one [here](https://platform.openai.com/signup). 

After you’ve signed up and set up billing, generate your API key and store it somewhere safe. You’ll need to store it in your GitHub Secrets, which [we’ll go over later](#github-secrets).

![Api Keys page on OpenAI](/assets/api-keys.png)

At the time of writing, new signups for the OpenAI API are granted immediate access to the `gpt-3.5-turbo` model, which is capable of providing valuable code reviews. 

The `gpt-4` model is available to users who have been enrolled for at least one month and have made a payment of $1 or more.<sup>[3](#footnotes)</sup>


Once you gain access to the gpt-4 model, I highly recommend switching to it and evaluating its suitability for your specific needs and budget.

## GitHub API Token

This GitHub Action requires access to your repository code and pull requests, so it can read the content to review and make comments accordingly.

![GitHub repository permissions](/assets/repo-permissions.png)

To create a GitHub API token with the necessary permissions, follow these steps:

1. Go to your GitHub account settings.
2. Click on **Developer settings** in the left sidebar.
3. Select **Personal access tokens** from the submenu.
4. Choose **Fine-grained tokens** or **Tokens (classic)** depending on your preference.
5. Click on the **Generate new token** button.
6. Give your token a descriptive name and select the desired permissions. For this action, make sure your token has the `repo` and `pull_requests` permissions.
7. Click on the **Generate token** button.
8. Copy the generated token and store it securely.


For more detailed instructions, you can refer to the [GitHub documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

<details>
    <summary>Tokens for an Organization Repository</summary>

    If you’re setting up this action on a GitHub repository that belongs to an organization, make sure you consult with a user with the Owner role in the GitHub Organization. 

    In the Organization’s Settings page, find Third-party Access on the settings sidebar, and enable Fine-grained personal access tokens under the “Personal access Tokens” option.

    This may require administrator approval, but after this is successfully set up, just follow the steps above. The rest of the process is the same as creating a personal token, except when creating the token, under "Repository Access" (I recommend choosing "Only select repositories"), be sure to select the Organization’s repository for which you’d like to set up this GitHub Action.

</details>

## GitHub Actions Secrets & Workflow file

Now that you have your OpenAI API key and GitHub API token, you can set up the GitHub Action.

### GitHub Secrets

You’ll want a secure way to store these tokens so not even you can access them later on. In the settings for your repository, navigate to **Actions secrets and variables**.

<p>https://github.com/[owner]/[repo-name]/settings/secrets/actions</p>

Add your two tokens with **New repository secret**. For the OpenAI token, use `OPENAI_API_KEY` and use `OCTOKIT_TOKEN` for the GitHub token (GitHub doesn’t like it if you start your tokens with `GITHUB_`). 

![Failed to add secret. Secret names must not start with GITHUB_.](/assets/github_failed_token_add.png)

### Actions Workflow file

Now that you have your tokens stored securely, you can create a workflow file to use the GitHub Action.

Create a new file in your repository at `.github/workflows/ai-code-review.yml` with the following contents:

```yaml
#.github/workflows/ai-code-review.yml
---
name: GPT Code Review

on:
  pull_request:
  workflow_dispatch:
permissions: write-all
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v3

      - name: AI Code Reviewer
        uses: Ostrich-Cyber-Risk/ai-codereviewer@main
        with:
          OCTOKIT_TOKEN: ${{ secrets.OCTOKIT_TOKEN }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          OPENAI_API_MODEL: "gpt-3.5-turbo-16k" # Optional: defaults to "gpt-4"
          exclude: "**/*.json, **/*.md" # Optional: exclude patterns separated by commas
---
```

This workflow file will run the GitHub Action on every pull request and on demand. You can customize the workflow to your liking. For more GitHub Actions workflow information and syntax help, visit their [docs](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions).


## Conclusion
Now that you've set up the GitHub Action, you're ready to go!

Simply commit & push this workflow file, and check out the Actions tab on your GitHub repo to see the AI code reviewer in action. 

Feel free to make pull requests, suggestions, or bring up issues on the [GitHub page for this action](https://github.com/Ostrich-Cyber-Risk/ai-codereviewer), and let me know in the comments what project you’ll be using this on first, or simply share your thoughts on how helpful you found this tool.

Happy Coding!

---

#### Footnotes

[1.](#intro) Reddit - [Why is it so hard to get people to review my PRs?](https://www.reddit.com/r/cscareerquestions/comments/mrhk2z/why_is_it_so_hard_to_get_people_to_review_my_prs/)

[2.](#intro) Pluralsight - [How to use ChatGPT to write code](https://www.pluralsight.com/blog/software-development/how-use-chatgpt-programming-coding)

[3.](#openai-api-token--model) OpenAI - [GPT-4 API general availability](https://openai.com/blog/gpt-4-api-general-availability)
