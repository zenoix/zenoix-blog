---
title: Using Patches When Adding or Restoring with Git
# author: Author of the post. default = SITE.author
pubDatetime: 1970-01-01T00:00:00.000Z # Published datetime in ISO 8601 format (use date -Iseconds). required 
modDatetime: # Modified datetime in ISO 8601 format. (only add this property when a blog post is modified)
# slug: Slug for the post. This field is optional but cannot be an empty string. default = slugified file name
featured: false # Whether or not to display this post as featured. default = false
draft: true # Set this to 'first' when publishing
tags:  # Tags of the post. default = others
  - git
  - tips&tricks
description: Ever wanted to git add, restore, or unstage only a section of your code instead of the whole file? If so, then patches is exactly what you need. This little Git trick is probably my favourite feature, so I hope you find it as useful as I do!
---

If you've used Git before, you should be familiar with using `git add`, `git restore`, and `git restore --staged`. These are commands that coders use all the time to stage, restore, and unstage file changes. However, what if you don't want to add, restore, or unstage a whole file, but only a part of it? That's where the `-p` option and `--patch` flag come into play.

## Table of contents

## How to Use Patches When Adding/Restoring/Unstaging

To use patches when staging, restoring, or unstaging files, all one needs to do is add `-p` or `--patch` to the command. For example, when staging parts of a file, one may type something similar to the following:

```sh
$ git add -p file1.txt
```

or for restoring/unstaging parts of a file:

```sh
# Restoring parts of a file that hasn't been staged
$ git restore -p file2.txt

# Unstaging parts of a file that has been staged
$ git restore --staged -p file3.txt
```

After typing one of those commands, Git will attempt to split up the code changes in the file into what they call "hunks". It'll then go through each hunk, prompting you to tell Git what you would like to do with the hunk.

### Staging Parts of a File Example

## Why Not Just Add/Restore the Whole File?
