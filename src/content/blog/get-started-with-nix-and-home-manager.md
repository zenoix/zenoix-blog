---
title: Get Started with Nix and Home Manager
pubDatetime: 2024-11-04T01:14:31.088Z
modDatetime: 2024-11-04T01:15:21Z
featured: false
draft: false
tags:
  - nix
  - tools
description: Here's a little introduction to the world of Nix, and how to get started with Nix and Home Manager so you can pop off with a declarative system configuration.
---

You might've heard of this thing called Nix a lot recently and how it promises a declarative, reproducible, and unbreakable package environment. From first-hand experience, these promises are real. Using Nix has given me so much more confidence during development that nothing will screw up, and if I want to share my environments with others, they'll get exactly what I designed. If you want to learn more about the benefits of using Nix, check out [what the official documentation says](https://nix.dev/#what-can-you-do-with-nix).
  
If that intrigues you and you want to get started with Nix and/or Home Manager, then this tutorial is for you! I'll get you through the basic setup, configuration, and how to use those tools. Of course, this isn't a comprehensive course (that would be way too long, and I'm not a Nix expert yet), but it should be enough for you to continue on your own.

All code can be found in the [zenoix/zenoix-blog-resources repo](https://github.com/zenoix/zenoix-blog-resources/tree/main/03-get-started-with-nix-and-home-manager).

> [!TIP]
> Nix as a whole is considered to be very complex. However, the basics of Nix aren't. I will hopefully demystify the fundamental concepts behind Nix and how easy it is to use it for your day-to-day development needs.

> [!WARNING]
> This is not a guide to NixOS, the declarative operating system built on Nix, nor Nix Darwin. However, most of the concepts can be applied to both of them, including using Home Manager.

## Table of contents

## What is Nix?

First, the Nix ecosystem. The Nix ecosystem is comprised of three main parts:

- NixOS - A declarative operating system,
- Nixpkgs and the Nix Package Manager - the largest and most up-to-date package repository and it's package manager,
- and the Nix Language - a purely functional programming language.

> [!NOTE]
> The three parts can be used in isolation if you wish and do not all need to be used together. For example, you do not need to use NixOS to be able to use the Nix package manager.

As I mentioned before, we will not be touching NixOS in this guide, but we will cover the basics of Nixpkgs, the package manager, and the Nix Language. If up to this point, you're thinking to yourself, "I like your funny words magic man," don't worry; I'll explain them in a bit more detail.

### Nixpkgs and the Package Manager

The Nix package manager and the Nixpkgs repository are *the* best package manager and package repository that exist for Unix systems. Yes, even better than Pacman+AUR and Homebrew.

Enter the graph that everyone uses when talking about Nixpkgs (note the top right corner):

![Graph showing the number of packages and the number of fresh packages](@assets/images/get-started-with-nix-and-home-manager/package-size-freshness.svg)

>[!NOTE]
>From now on, I'll use "Nix" to refer to both the package manager and the package repositories (a.k.a. the software distribution system). When I'm specifically talking about the language, I'll use "Nix language.".

The size and freshness of the Nix package repositories aren't what make it the best, although it does help. The main benefit is how Nix builds and installs packages on your system. 

When a package is built using Nix, the package's **derivation** is evaluated. A derivation is a file (typically written in the Nix language) that explicitly contains all the information needed to build the package. Think of it as a blueprint on what is needed to build the package, how to build it, and some additional metadata.

Bear with me; this part might be a bit confusing at first. Using the derivation, Nix [hashes](https://en.wikipedia.org/wiki/Cryptographic_hash_function) the information in the derivation to produce the path in the system where the package will be stored. This usually comes in the form of `/nix/store/<hash>-<name>-<version>`. For example, I have a zsh store path `/nix/store/rgfyvch8ck64zfrqhk193jk6hzrc0xj1-zsh-5.9`. Lastly, it builds the package using the derivation in an isolated environment alongside all of its dependencies.

>[!NOTE]
Some things to note are:
>- Nix is a purely functional package manager. Packages are values that are built by functions that don’t have side effects. This means that they will never change after they have been built, allowing for reproducible and reliable environments.
>- The hash of the derivation, such as `rgfyvch8c...`, contains all the information that was used to build the package, including the dependencies. That means two packages with the same store path are guaranteed to come from the same derivation values.
>-  Unless some non-constant value, such as the current time, is used as part of the derivation, the same derivation will always build identical packages.
> - Only Nix can modify `/nix/store`, allowing for maximum confidence that no one changes your packages.

How Nix works, in addition to the points in the note, results in some rather useful properties:

#### Increased reproducibility

This is exactly why we use Nix! We can guarantee (with pinned derivation inputs) that if a package works on one machine, it works on another. No more "it works on my machine"! We can also tell if packages are different by their store path and rectify it accordingly.

#### You will never have package conflicts

Multiple versions of the same package can be installed due to the unique store path. This is especially useful when multiple packages share different versions of the same dependency. For example, upgrading a package will not break other packages, as the upgrade will not update or delete files that are used by other packages. 

#### Atomic upgrades and rollbacks

More on this later.

### The Nix Language

Phew, that was a lot of writing for the Nixpkgs and the package manager. Luckily, what I need to explain about the Nix language is much, much shorter.

The Nix Language is a purely functional programming language used for pretty much all Nix-related stuff. It might look daunting at first (obviously as you don't understand the syntax), but the syntax I will be introducing will look very similar to JSON (with some additional features). 

```nix
{
  programs.git = {
    enable = true;
    userName = "iusegit";
    userEmail = "mygitemail@emaildomain.com";

    aliases = {
      tree = "log --all --graph --decorate";
    };

    extraConfig = {
      init.defaultBranch = "main";
    };
  };
}
```

If you're already familiar with JSON then great! If not, it's all good; the Nix syntax I'll be showing is very intuitive.

I told you it'll be a lot shorter.

### Flakes

If you've looked into Nix before, you've probably heard of something called a Nix Flake. A Flake is a self-contained Nix program with explicit `inputs` and `outputs` attributes written in a `flake.nix` file. The `outputs` attribute is a *function* that takes in the inputs and returns the output of your Flake.

One thing Flakes allows is a consistent schema for designing environments, which allows for much easier sharing of Nix projects. However, the biggest benefit of using Flakes is that it allows for dependency locking to ensure that builds and environments are reproducible. The inputs to the Flake are pinned to a specific version and are then locked into a `flake.lock` file. By sharing the `flake.nix` file and the `flake.lock` file, environments and packages will always result in the same output from a build.

As a result of these benefits, I will be using Flakes in this guide.

> [!NOTE]
> They are an experimental feature (although they've been widely adopted by the community) and need to be opted into to use. I will show you how to opt in later.

## What is Home Manager?

Now let's move on to Home Manager. Home Manager is built on Nix, and it manages a user's environment using the package manager. This means that you can install software decoratively in your user space using Nix, and you can use it to manage your dotfiles (user program configurations). 

I will be using it to show you how you can declaratively set up your user environment with the packages you need and how to configure programs such as your shell and git. 

>[!TIP]
>Home Manager works with Flakes too. What this means is that you can reproduce a user environment and share it with others. A great use-case for this is making onboarding easier if your company has standards for development: give a recruit the Flake, they run it, and everything they need will be set up for them with minimal effort.

## How to Install Nix

Cool, we've got all the theory out of the way. Let's get started with actually installing Nix. Instructions on how to install Nix can be found [on the Nix website](https://nixos.org/download/). For Windows, you will need WSL2, as Nix only works on Unix-based systems.

>[!TIP]
>I recommend using the multi-user installation even if you are the only user on the machine. For WSL2, make sure [systemd support](https://learn.microsoft.com/en-us/windows/wsl/wsl-config#systemd-support) is available and enabled. 

Make sure you read through the installation tool and follow the instructions. Then let it run, and if all goes well, Nix will be installed on your machine. Create a **new terminal** shell session and make sure it's installed:
```bash
$ nix --version
```

>[!CAUTION]
>If you ever see tutorials or resources using the `nix-env` command, **do not** run them. That will imperatively install packages onto your system like a typical package manager (Homebrew, apt, Pacman, etc.) would. You thus forego the reproducibility benefits and declarative nature of Nix.

Lastly, let's enable the ability to use Flakes. Edit the file `/etc/nix/nix.conf` (you may need to sudo) and add the following line:

```
experimental-features = nix-command flakes
```

You should now be able to use Flakes. You can check with:

```
$ nix flake --help
```

## Let's Get Started

To get started with using Nix and Home Manager, we want to first temporarily install Home Manager into a temporary Nix shell. To do this, use the following command:

```
$ nix-shell -p home-manager
```

What this command is doing is creating a Nix shell, and the `-p home-manager` part is telling it to install the `home-manager` package into this interactive shell.

> [!TIP]
>This `nix-shell -p ...` command is very useful when you want to install a package temporarily into an isolated shell, which means you don't pollute your user shell. 
>
>In this case, we're using it to temporarily install Home Manager once so that we can use it to install itself declaratively from this point onwards (I understand that might sound confusing). 

In the new shell, you should be able to use `home-manager --version` to make sure it's installed (only in that shell). 

Next, let's figure out where to store our configurations. By default, it uses `~/.config/home-manager/`. If that's fine with you, you can use the following command to initialise the first generation of your configurations:

```
$ home-manager init
```

However, if you're like me and want to store your configurations somewhere else, figure out where you want to store them. For this tutorial, I'll use `~/mySpecialConfig/` which means we'll need to add that path to the `home-manager init` command:

```
$ home-manager init ~/mySpecialConfig/
```

### Generated Configuration

After you've run the initialisation command, change directories to where your configurations were placed. You should see two files if you have Flakes enabled:

```
$ cd ~/mySpecialConfig
$ ls
.
├── flake.nix
└── home.nix
```

Let's first look at the `flake.nix` file, as that's the main entry point of our configuration. It should look something like this:

```nix
{
  description = "Home Manager configuration of zenoix";

  inputs = {
    # Specify the source of Home Manager and Nixpkgs.
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { nixpkgs, home-manager, ... }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      homeConfigurations."zenoix" = home-manager.lib.homeManagerConfiguration {
        inherit pkgs;

        # Specify your home configuration modules here, for example,
        # the path to your home.nix.
        modules = [ ./home.nix ];

        # Optionally use extraSpecialArgs
        # to pass through arguments to home.nix
      };
    };
}
```

>[!NOTE]
>We will not be modifying this file in this guide unless the value of `system` is incorrect for your device or you want to make your Home Manager configuration more modular.

We can see that the whole Flake is within curly brackets; we then have a description, `inputs`, and `outputs` as I mentioned earlier. 

In the `inputs` section, we have two items:
- `nixpkgs.url` tells the Flake where we want to get our packages from. In this case, from `github:nixos/nixpkgs/nixos-unstable`.
- `home-manager` tells the Flake where to get Home Manager from and which nixpkgs to follow (for when Home Manager installs packages for us). 
These are pinned in the `flake.lock` file that will be generated when we switch to our configuration.

Next is the `outputs` function. It takes in two inputs to the function: 'nixpkgs', which is where we'll get our packages from, and `home-manager`. The only three lines that we should pay attention to at this point are the following:
- `system = "x86_64-linux";` - Make sure this is correct for your system.
- `homeConfigurations."zenoix" = home-manager.lib.homeManagerConfiguration {` - This line says the home configuration for the `zenoix` user will be whatever is inside the curly brackets. Make sure this is set to your username.
- `modules = [ ./home.nix ];`: These are the modules that Home Manager will use in your Home Manager configuration. At the moment, this is only the `home.nix` file we saw earlier. This is the main file we'll be making changes to. 

Time to move onto the `home.nix` file. This is where the actual magic happens. Opening it up, this is what it looks like (with comments removed for brevity):

```nix
{ config, pkgs, ... }:

{
  home.username = "zenoix";
  home.homeDirectory = "/home/zenoix";

  home.stateVersion = "23.11"; # Please read the comment before changing.

  home.packages = [
  
  ];

  home.file = {
  
  };

  home.sessionVariables = {
  
  };

  programs.home-manager.enable = true;
}
```

I highly recommend reading the comments that are generated in the `home.nix` file. They introduce you to the kinds of things Home Manager can do. Once again, make sure that `home.username` and `home.homeDirectory` match your username and the home directory for your user.

For this tutorial, we'll only be touching `home.packages` in this file as we won't be going over environment variables and we'll be doing our dotfiles differently. This means we can reduce our `home.nix` file to the following:

```nix
{ pkgs, ... }:

{
  home.username = "zenoix";
  home.homeDirectory = "/home/zenoix";

  home.stateVersion = "23.11"; # Please read the comment before changing.

  home.packages = [
  
  ];

  programs.home-manager.enable = true;
}
```

You might've noticed that `config` disappeared. The values in the curly brackets can be thought of as modules that we use in our Nix file. `config` holds information about our config, which we won't need. `pkgs` is left behind because we need it to access Nixpkgs from the flake to install the packages we want. Let's do that right now!

To install a package for the user, all you need to do is add it to the `home.packages` section. For example, let's install go:

```nix
home.packages = [
  pkgs.go
]
```

This tells Home Manager to install git from `pkgs`. It can also be written like this:

```
home.packages = with pkgs; [
  go
]
```

This way is shorter as we are specifying that the items in the list come from `pkgs` and therefore won't need to prefix each item with `pkgs.`. Anyways, it's that easy to install packages!

>[!TIP]
>You can find what packages are available in the [packages search](https://search.nixos.org/packages). Don't worry if what you want isn't there; you can build your own packages, but that's outside the scope of this guide.

You can also do your dotfiles (which will also install the packages needed). For example, let's do a basic `gitconfig` using Home Manager. Add the following to your `home.nix` file with the values of `userName` and `userEmail` changed to your git information:

```nix
programs.git = {
  enable = true;
  userName = "...";
  userEmail = "...";
};
```

This will enable git for the user (installing it as well) and set up the username and email in the git config.

>[!TIP]
>Home Manager options can be found on the [reference page](https://nix-community.github.io/home-manager/options.xhtml).

Altogether, you should have something looking like this:

```nix
{ pkgs, ... }:

{
  home.username = "zenoix";
  home.homeDirectory = "/home/zenoix";

  home.stateVersion = "23.11"; # Please read the comment before changing.

  home.packages = with pkgs; [
    go
  ];

  programs.home-manager.enable = true;

  programs.git = {
    enable = true;
    userName = "...";
    userEmail = "...";
  };
}
```

Let's switch our user configuration to the one we just created. Use the following command to switch to the new Home Manager configuration we just created (substituting the path to the flake directory):

```
$ home-manager switch --flake ~/mySpecialConfig/
```

> [!TIP]
> It might be useful to set this command to an alias, especially if you will be updating your configuration frequently. I have mine set to `hms` for `home-manager switch`. Try to use Home Manager to add your shell alias declaratively!

After a bit, you should now have go and git installed and a `gitconfig`. We have also installed Home Manager in the user's environment. So we can use `exit` to leave the temporary shell. Check that everything went well by using the following four commands:

```
$ go version
$ git --version
$ cat ~/.config/git/config
$ home-manager --version
```

You should see the versions printed out for go, git, and Home Manager, in addition to the `user` fields automatically filled in with the git username and email.

Congratulations! You know how to install packages and configure your dotfiles with Nix and Home Manager. The example configuration I showed can be found in the [zenoix/zenoix-blog-resources repo](https://github.com/zenoix/zenoix-blog-resources/tree/main/03-get-started-with-nix-and-home-manager).

## What If I Screw Up?

It's now time to introduce atomic updates and rollbacks.

Let's say you update your configuration or you update the inputs to your flake with `nix flake update ~/mySpecialConfig`, and during the build phase of your system, something goes wrong. That's where *atomic upgrades* come in. Traditionally, with imperative package managers, if your upgrade errors out during the upgrade process, there's a chance that some packages were upgraded while others weren't. This can potentially break packages or even your whole system. That is not the case with Nix. Due to how Nix works, it builds your new packages and does not replace your old ones. That way, if the upgrade process stops, you still have all your original packages, and your new ones won't be used. Only if everything succeeds do the new packages get added to your path.

This fact also allows for rollbacks of your system. Say you want to go back to a previous generation of your Home Manager configuration; you can do that easily because your old packages are still there. To do so, run the following command to get the history of your Home Manager configurations:

```
$ home-manager generations
2024-11-04 01:16 : id 739 -> /nix/store/yrjcvrc7h37nx44fcclh0h4qcrj6dfvn-home-manager-generation
2024-11-02 15:54 : id 738 -> /nix/store/5k7d0x909p1zjxrqc0nd3ggv93dlb7iw-home-manager-generation
2024-10-30 20:47 : id 737 -> /nix/store/qf4zbz134i1gjaidsvd79z0ml4wryknd-home-manager-generation
2024-10-30 20:35 : id 736 -> /nix/store/b70pm038jdcwqi89x8jdka2i8lmky5gw-home-manager-generation
2024-10-30 20:31 : id 735 -> /nix/store/y180rn38wfyl8kpinhqqhslxrs798km1-home-manager-generation
```

Then choose the store path of the generation you want to roll back to. For example, if I wanted to go to the 738th generation, I'd use

```
/nix/store/qf4zbz134i1gjaidsvd79z0ml4wryknd-home-manager-generation
```

Lastly, activate that generation by running the `activate` script in the store path.

```
$ /nix/store/qf4zbz134i1gjaidsvd79z0ml4wryknd-home-manager-generation/activate
```

The ability for atomic upgrades and rollbacks gives you peace of mind that you'll always have a working system.

>[!TIP]
>You might be wondering if storage space will be an issue with all these package versions being installed and not deleted. Nix allows for garbage collection, which can remove packages that aren't used anymore, which will help reclaim some storage space.

## Making the Home Manager Config More Modular

You will end up having way more configurations in your `home.nix` than just go and a git config. If you're someone who likes to have everything in one file, feel free to skip this section. However, for me, I prefer having my configuration split up across files. So let's do just that.

Let's first create a folder in your Home Manager directory (remember I'm using `~/mySpecialConfig` in the examples) to hold the Home Manager modules you want as follows:

```
.
├── homeManagerModules/
├── flake.nix
└── home.nix
```

Let's say I want to have a file containing only the git configuration. To do that, let's create a `git.nix` inside of `homeManagerModules/` as follows:

```
.
├── homeManagerModules
│   └── git.nix
├── flake.nix
└── home.nix
```

Now, move the git section of our `home.nix` into the `git.nix` file within some curly brackets.
```nix
# homeManagerModules/git.nix
{
  programs.git = {
    enable = true;
    userName = "johndoe";
    userEmail = "johndoe9919231@gmail.com";
  };
}
```

We now need to link `home.nix` to `git.nix`. The way I like to do it is to create a `default.nix` inside of `homeManagerModules` with the following content:

```nix
# homeManagerModules/default.nix

{
  imports = [
    ./git.nix
  ];
}
```

Putting a `default.nix` into `homeManagerModules` allows you to run Nix code when a directory is imported into a Nix program. In this case, when `homeManagerModules` is imported, that will import the `git.nix` file as well, and thus the git configuration.

Next, we need to add `homeManagerModules` as a Home Manager module in the `flake.nix` file.

```nix
{
  description = "Home Manager configuration of zenoix";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { nixpkgs, home-manager, ... }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      homeConfigurations."zenoix" = home-manager.lib.homeManagerConfiguration {
        inherit pkgs;

        modules = [ 
          ./home.nix
          ./homeManagerModules  # Add this line
        ];
      };
    };
}
```

You have now modularised your Home Manager configuration! You can keep adding more files and adding them to the `default.nix`. You can even add subdirectories to group modules together. Just remember to add a `default.nix` file that imports everything in the directory.

```
.
├── foo
│   ├── bar.nix
│   └── default.nix
├── default.nix
└── git.nix
```

This would have the outer `default.nix` import `./foo` and `./git.nix`, and the `foo`'s `default.nix` would import `./bar.nix`.

>[!TIP]
>Nix file paths in a `.nix` file are all relative to the nix file.


## You Survived

Well done. You've successfully survived your first step into the Nix world. You should now have enough knowledge to keep exploring further yourself. If you're daring enough, maybe you'll even install NixOS. Anyways, thanks for reading my little intro to Nix.
