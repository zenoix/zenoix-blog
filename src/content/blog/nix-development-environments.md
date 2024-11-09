---
title: Nix Development Environments for Data Science
pubDatetime: 1970-01-01T00:00:00.000Z 
modDatetime: 
featured: false
draft: true
tags:
  - data-science
  - tools
  - nix
description: Have you ever worked with others and run into issues when you find out that you are developing with different versions of the same package? I have experienced that too many times to count. In this post, I will introduce how powerful Nix shells are for reproducible, declarative, and shareable development environments to save you from headaches in the future.
---

I've always believed that the field of data science needs to learn from software engineering and adopt some of their best practices (check out [why I hate coding notebooks](https://zenoix.com/why-i-dont-use-coding-notebooks)). At my current company, one thing I noticed was how disorganised and varied our development setups are. 

For example, we might have Windows users, MacOS users, and Linux users all working on the same project on their local machines and configuring everything based on their operating system. This alone is a huge nightmare. Code might work on one operating system/architecture but not on others, dependencies might be different, Windows users might use `\` for filepaths, deployments can fail, and so on. 

Now, I don't mind people using the tools that they're used to, but sometimes these minor setbacks add up and cause massive inefficiencies. Due to this, I've decided to write this blog post about implementing reproducible and shareable development environments using Nix (check out my [introduction to Nix](https://zenoix.com/posts/get-started-with-nix-and-home-manager) if you're not familiar with Nix). By using Nix, you can reduce the hassle of cross-machine development exponentially. 

>[!NOTE]
> Using Nix on Windows means that WSL2 will need to be used and so those who develop on Windows will have the hardest time transitioning. That being said, I believe all data scientists need to be somewhat familiar with Linux and using a shell, so they might as well start learning it now.

## Table of contents

## What Is a Shell

## How Does a Development Environment Relate to a Shell

## The Advantages of Using Nix for Dev Environments

## Real World Example Of Using Nix For Dev Environments

## Basic Nix Dev Shell

## Devenv and Direnv for Easier Dev Environments


