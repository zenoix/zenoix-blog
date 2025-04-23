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
description: Ever wanted to git add or restore a section of your code instead of the whole file? If so, then patches is exactly what you need. This little Git trick is probably my favourite feature, so I hope you find it as useful as I do!
---

If you've used Git before, you should be familiar with using `git add`, `git restore`, and `git restore --staged`. These are commands that coders use all the time to stage, revert, and unstage file changes. However, what if you don't want to add or restore a whole file, but only a part of it? That's where the `-p` option and `--patch` flag come into play.

## Table of contents

## How to Use Patches When Adding or Restoring

## Why Not Just Add/Restore the Whole File?
