---
title: Get Started with Nix and Home Manager
# author: Author of the post. default = SITE.author
pubDatetime: 1970-01-01T00:00:00.000Z # Published datetime in ISO 8601 format (use date -Iseconds). required 
modDatetime: # Modified datetime in ISO 8601 format. (only add this property when a blog post is modified)
# slug: Slug for the post. This field is optional but cannot be an empty string. default = slugified file name
featured: false # Whether or not to display this post as featured. default = false
draft: true # Set this to 'first' when publishing
tags:  # Tags of the post. default = others
  - nix
  - tools
description: TODO
---

You might've heard of this thing called Nix a lot recently and how it promises a declarative, reproducible, and unbreakable package environment. From first-hand experience, these promises are real. Using Nix has given me so much more confidence during development that nothing will screw up, and if I want to share my environments with others, they'll get exactly what I designed. If you want to learn more of the benefits of using Nix, check out [what the official documentation says](https://nix.dev/#what-can-you-do-with-nix).
  
If that intrigues you and you want to get started with Nix and/or Home Manager, then this tutorial is for you! I'll get you through the basic setup, configuration, and how to use those tools. Of course, this isn't a comprehensive course (that would be way too long, and I'm not a Nix expert yet), but it should be enough for you to continue on your own.

> [!TIP]
> Nix is considered to be very complex. However, the basics of Nix aren't. I will hopefully demystify the fundamental concepts behind Nix and how easy it is to use it for your day-to-day development needs.

> [!NOTE]
> This is not a guide to NixOS, the declarative operating system built on Nix. However, most of the concepts can be applied to NixOS, including using Home Manager .
## Table of contents

## ELI5 Nix and Home Manager

First, the Nix ecosystem. The Nix ecosystem is actually comprised of three main parts:

- NixOS - A declarative operating system,
- Nixpkgs and the Nix Package Manager - the largest and most up-to-date package repository and it's package manager,
- and the Nix Language - a purely functional programming language.

> [!NOTE]
> The three parts can be used in isolation. For example, you do not need to use NixOS to be able to use the Nix package manager.

As I mentioned before, we will not be touching NixOS in this guide, but we will cover the basics of Nixpkgs, the package manager, and the Nix Language. If up to this point you're thinking to yourself, "I like your funny words magic man", don't worry, I'll explain them in a bit more detail.

### Nixpkgs and the Package Manager



### The Nix Language

The Nix Language is a purely functional programming language used for pretty much all Nix related stuff. It might look daunting at first (obviously as you don't understand the syntax), but the syntax I will be introducing will look very similar to JSON (with some additional features). If you're already familiar with JSON then great! If not, it's all good, the Nix syntax I'll be showing is very intuitive.

