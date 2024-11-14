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

I've always believed that the field of data science needs to learn from software engineering and adopt some of their best practices (check out [why I hate coding notebooks](zenoix.com/why-i-dont-use-code-notebooks)). At my current company, one thing I noticed was how disorganised and varied our development setups are. 

For example, we might have Windows users, MacOS users, and Linux users all working on the same project on their local machines and configuring everything based on their operating system. This alone is a huge nightmare. Code might work on one operating system/architecture but not on others, dependencies might be different, Windows users might use `\` for filepaths, deployments can fail, and so on. 

Now, I don't mind people using the tools that they're used to, but sometimes these minor setbacks add up and cause massive inefficiencies. Due to this, I've decided to write this blog post about implementing reproducible and shareable development environments using Nix (check out my [introduction to Nix](https://zenoix.com/posts/get-started-with-nix-and-home-manager) if you're not familiar with Nix). By using Nix, you can reduce the hassle of cross-machine development exponentially. 

>[!NOTE]
> Using Nix on Windows means that WSL2 will need to be used and so those who develop on Windows will have the hardest time transitioning. That being said, I believe that all data scientists need to be somewhat familiar with Linux and using a shell, so they might as well start learning it now.

>[!TIP]
All code can be found in the [zenoix/zenoix-blog-resources repo](https://github.com/zenoix/zenoix-blog-resources/tree/main/04-nix-development-environments).

## Table of contents

## What Is a Shell

We first need to explain what a **shell** is. I'm not talking about the kinds of shells you find at the beach, but the kind you use on a computer. A shell is a program you use to communicate with and perform actions on your operating system. Examples of a shell include: bash, zsh, fish, nushell, and more.

A command line shell specifically, is a program that allows the user to interact with the operating system by typing commands. The shell will interpret your commands and then interact with the system if that command is valid. Typically, a command line shell is much more powerful and efficient in allowing you to achieve what you need to do when compared to a graphical interface.

### Simple Example

Here's a simple example of what you can do with a command line shell. Let's say you want to install and use [bat](https://github.com/sharkdp/bat) to print out a file with pretty syntax highlighting. 

To interact with a command line shell, you would typically use a terminal emulator. A terminal emulator is a graphical program that you can use to interact with the shell. In my case, I will be using running zsh in [the kitty terminal](https://github.com/kovidgoyal/kitty).

<!-- Insert image of zsh in kitty -->

Kitty is the window you are looking at and the `>` prompt you can see is the prompt to my zsh shell. That is where I can enter commands to run. Let's install bat using the following command:

```bash
$ nix-shell -p bat
```

What happens when I run that line? This is an oversimplification, but what happens is that my shell (zsh) reads the input and parses it. It then checks if the input is valid by checking if `nix-shell` is a valid command and if `-p bat` is a valid option and value for that option. If it is all valid, the shell will communicate what you wanted with something called the kernel. The kernel will process what you asked for and return an output that your shell can display.

<!-- Insert image of bat being installed -->

In this case, as I'm using `nix-shell`, it's actually creating an ephemeral (temporary) shell with bat installed inside the original shell. We can test it by trying to run `bat` on a file.

<!-- Insert image of running bat in a nix shell -->

In this case, the ephemeral shell does the parsing, validation, and communication with the kernel to run bat on the file that exists on the system. A cool thing about using `nix-shell` for ephemeral shells is that when you exit that shell, the programs won't be accessible with your original shell.

<!-- Insert image of running bat outside the ephemeral shell -->

That means you can try or use programs without having it permanently bloating your user space. Handy isn't it?

## The Advantages of Using Nix for Dev Environments

Why did I show the use of Nix's ephemeral shell? Well, that's because it's the basis of the development environments I'm introducing today. You can have an ephemeral shell with a set of packages for one project and another ephemeral shell with a different set of packages without the two conflicting.

Another advantage you get is due to the reproducibility that is intrinsic to how Nix works when using flakes. You can create a `flake.nix` (and corresponding `flake.lock`) file, then share that to other members of your project through something like a GitHub repository. They can then use that to completely reproduce the development environment. Why is that useful? Well, it means that every member of the team has full confidence that the packages they're using to develop the software is the same as everyone else's. No more missing packages or differing versions. 

Overall, using Nix significantly reduces the hassle of coordinating each member's development environment and provides assurance that everyone's environment is correct.

## Real World Example Of Using Nix For Dev Environments

[Bellroy](https://bellroy.com), an Australian company that makes and sells bags, wallets, and other accessories, uses Nix for their development environments. They use Nix for their development environments to ensure that they are reproducible across different team members' development machines. One nice perk they found was that by distributing the instructions to build development environments using a `shell.nix` file (more on this in the next section), it was

> a great way to get started because it doesn’t ask developers to radically change their workflows, and allows them to trial Nix at their own pace.

By introducing Nix to developers using Nix development environments, it allows the adoption of Nix (which has a reputation for being complicated) at a company much easier.

You can find out more about how Bellroy uses Nix [in their post here](https://exploring-better-ways.bellroy.com/the-history-of-nix-at-bellroy.html).

## Real World Example Of Using Nix For Dev Environments

## Basic Nix Dev Shell

## Devenv and Direnv for Easier Dev Environments

