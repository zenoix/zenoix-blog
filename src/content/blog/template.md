---
title: Title of the post. required
# author: Author of the post. default = SITE.author
pubDatetime: 1970-01-01T00:00:00.000Z # Published datetime in ISO 8601 format (use new Date().toISOString()). required 
# modDatetime: Modified datetime in ISO 8601 format. (only add this property when a blog post is modified)
# slug: Slug for the post. This field is optional but cannot be an empty string. default = slugified file name
featured: false # Whether or not to display this post as featured. default = false
draft: true # Mark this post as "unpublished":
tags:  # Tags of the post. default = others
  - data-science
description: Description of the post. Used in post excerpt and site description of the post. required
---

<!-- Can have text here. Normally a little intro -->

## Table of contents

<!-- The post content -->

You can store images inside `src/assets/` directory. These images will be automatically optimized by Astro.

You can use relative path or alias path (`@assets/`) to serve these images.

Example: Suppose you want to display example.jpg whose path is `/src/assets/images/example.jpg`.

```
![something](@assets/images/example.jpg)

<!-- OR -->

![something](../../assets/images/example.jpg)
```


You can also store images inside the `public` directory. Keep in mind that images stored in the `public` directory will need to be optimized. Use **TinyPng** or **TinyJPG** to do so.

For these images, you should use an absolute path; and these images can be displayed using markdown annotation or HTML img tag.

Example: Assume `example.jpg` is located at `/public/assets/images/example.jpg`.

```
![something](/assets/images/example.jpg)

<!-- OR -->

<img src="/assets/images/example.jpg" alt="something">
```

