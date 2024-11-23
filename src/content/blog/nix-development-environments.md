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

## Basic Nix Dev Shell

### Shell.nix Approach

Let's start with creating a basic development environment using a `shell.nix` file. First, create the `shell.nix` file, preferably in your project directory.

```bash
$ touch shell.nix
```

After opening it up with your preferred text editor, add the following code to the file:

```nix
{
  pkgs ? import <nixpkgs> { },
}:
pkgs.mkShell {

}
```

The first part of the code is a function that either takes in a version of `pkgs` as input, or it uses your system (or user) `nixpkgs`. The second part (after the `:`) is another function called `mkShell` that is returned from `pkgs` from the first function.

> [!TIP]
> If that's confusing, don't worry, we'll move onto an easier to understand method of implementing development environments soon.

Next, you'll probably want to add packages that your environment will use. This can easily be done by adding `packages` into `mkShell`. 

Say we want to make a Python environment with numpy and pandas, and the bat CLI tool. We'd do something like the following:

```nix
{
  pkgs ? import <nixpkgs> { },
}:
pkgs.mkShell {
  packages = with pkgs; [
    bat
    (python3.withPackages (
      ps: with ps; [
        numpy
        pandas
      ]
    ))
  ];
}
```

We can also run commands when we enter the shell by using `shellHook`:

```nix
{
  pkgs ? import <nixpkgs> { },
}:
pkgs.mkShell {
  packages = with pkgs; [
    bat
    (python3.withPackages (
      ps: with ps; [
        numpy
        pandas
      ]
    ))
  ];

  shellHook = ''
    bat --decorations never README.md
  '';
}
```

In this case, we're using the shell's bat to print out the readme with some nice colours.

You can also add environment variables by adding key-value pairs. For instance, an environment variable to indicate we're in a development environment variable and not production:

```nix
{
  pkgs ? import <nixpkgs> { },
}:
pkgs.mkShell {
  packages = with pkgs; [
    bat
    (python3.withPackages (
      ps: with ps; [
        numpy
        pandas
      ]
    ))
  ];

  shellHook = ''
    bat --decorations never README.md
  '';

  ENV = "DEV";
}
```

> [!NOTE]
> The key must not be an option of `mkShell` otherwise it'll be parsed as one and may cause issues.

We now have a simple development environment set up. Let's try it out by using running the following command:

```bash
$ nix-shell
```

![Entering the shell](@assets/images/nix-development-environments/entering-shell-shellnix.jpg)

We see that the readme file got "batted" out with a nice coloured heading. Our packages are also all here:

![Shell packages are installed](@assets/images/nix-development-environments/packages-shellnix.jpg)

And the `ENV` environment variable is set:

![Env vars are set](@assets/images/nix-development-environments/env-var-shellnix.jpg)

If we leave the shell with `exit`, we see that we lose what we've set in the `shell.nix` file:

![Shell is reverted when exited](@assets/images/nix-development-environments/exit-shell-shellnix.jpg)

That was pretty easy wasn't it?

### Flakes Approach

Let's improve how we create, use, and share development environments by using Nix flakes. 

>[!TIP]
>Flakes bring a lot of benefits when it comes to development environments. A major one is making pinning of dependencies much easier by using a `flake.lock`.

To go from the `shell.nix` we created earlier, it's quite easy. Here's a reminder of what the `shell.nix` file looked like:

```nix
# shell.nix

{
  pkgs ? import <nixpkgs> { },
}:
pkgs.mkShell {
  packages = with pkgs; [
    bat
    (python3.withPackages (
      ps: with ps; [
        numpy
        pandas
      ]
    ))
  ];

  shellHook = ''
    bat --decorations never README.md
  '';

  ENV = "DEV";
}
```

For we need to create a `flake.nix` in the project directory (for example, by using `touch flake.nix`). We can then start building out `flake.nix` file.

Let's start with an empty flake:

```nix
# flake.nix

{

}
```

To this, let's add a description for the flake. In this case, I'll use "Python project development environment flake":

```nix
{
  description = "Python project development environment flake";
}
```

Next, we'll add the `inputs` to the flake. The important one is where to get the nix packages from (similar to the `pkgs ? import <nixpkgs> { }` line from before). However, this time we'll also add `systems` which will be used to make sure we can distribute this flake to different kinds of system architectures (like `x86_64-linux` and `aarch64-darwin`) easily.

```nix
{
  description = "Python project development environment flake";
  
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
  };
};
```

The last section of the flake are the `outputs`. First, we grab `inputs` as the inputs of the `outputs` function.  These are `self`, `nixpkgs`, and `system` as so:

```nix
{
  description = "Python project development environment flake";
  
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
  };

  outputs =
    {
      self,
      nixpkgs,
      systems,
    }:
	
};
```

We'll then use set up the boilerplate for the development environments for every system architecture:

```nix
{
  description = "Python project development environment flake";
  
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
  };

  outputs =
    {
      self,
      nixpkgs,
      systems,
    }:
    let
      forEachSystem = nixpkgs.lib.genAttrs (import systems);
    in
    {
      devShells = forEachSystem (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
		  default = ...
        }
      );
};
```

What did we just add? You can pretty much think of what we just added as looping over each system and setting the default development shell and `pkgs` value based on the system. 

The last thing to do is actually design the shell as we did in the `shell.nix` file. This stage is easy. Just grab the `pkgs.mkShell` function and its body and place it after `default = `:

```nix
{
  description = "Python project development environment flake";
  
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
  };
  
  outputs =
    {
      self,
      nixpkgs,
      systems,
    }:
    let
      forEachSystem = nixpkgs.lib.genAttrs (import systems);
    in
    {
      devShells = forEachSystem (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              bat
              (python3.withPackages (
                ps: with ps; [
                  numpy
                  pandas
                ]
              ))
            ];

            shellHook = ''
              bat --decorations never README.md
            '';

            ENV = "DEV";
          };
        }
      );
    };
}
```

We're now done with the development environment! To activate it, we use a different command:

```bash
$ nix develop
```

We then get the exact same shell as we did using `shell.nix`, but with the benefits of using flakes. You can now share the `flake.nix` and `flake.lock` files to your team and have the confidence that everyone will have the same development environment.

## Devbox and Direnv for Easier Dev Environments

