---
title: The `title` Element
date: "2018-06-30T00:07:48-05:00"
---

#### Contexts

- As a child of `video`
- As a child of `venue`

#### Definition

Represents the <b>canonical title</b> for a given video or other creative work.

A <dfn>canonical title</dfn> [SHOULD](https://tools.ietf.org/html/rfc2119#section-3) be what the resource in question has been named by its author, without any additional information that might be present upon displaying it to a user.

For example, a video appearing in the search results of a video portal site might have the <b>presentational title</b> “Last Day of Summer ’16 | Hugh’s Vlog”. The <b>canonical title</b> would be “Last Day of Summer ’16”. The text after the spacer “ | ” denotes the name of the series, and should not be included in an episode’s `<title>`, as it can usually be inferred from the context of the larger document, if authored correctly. To illustrate:

```xml
<hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
  <group xml:id="hughs-vlog" type="series">
    <title>Hugh’s Vlog</title>
    <!-- … -->
    <group xml:id="season-02" type="series">
      <!-- … -->
      <video xml:id="ep-15">
        <title>Last Day of Summer ’16</title>
      </video>
    </group>
  </group>
</hvml>
```

Given this markup, an <abbr>HVML</abbr>-aware <abbr>CMS</abbr> could automatically generate the display title “Last Day of Summer ’16 | Hugh’s Vlog”, or alternatively display titles such “Hugh’s Vlog #15: Last Day of Summer ’16”.

However, in the case where one is simply archiving the data of a non-<abbr>HVML</abbr>-aware site, which does not have a separate metadata field for series titles, it would be appropriate to include the entire <b>presentational title</b> in a `<title>`.

These two use cases can even be covered in the same document without conflict:

```xml
<hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
  <group xml:id="hughs-vlog" type="series">
    <title>Hugh’s Vlog</title>
    <!-- … -->
    <group xml:id="season-02" type="series">
      <!-- … -->
      <video xml:id="ep-15">
        <title>Last Day of Summer ’16</title>
        <showing scope="release" datetime="2016-09-10">
          <venue type="site" datetime="04:28:03.000Z">
            <entity site="https://www.youtube.com/">YouTube</entity>
            <uri>https://www.youtube.com/watch?v=YvP_2qi5XuA</uri>
            <title>Last Day of Summer ’16 | Hugh’s Vlog</title>
          </venue>
        </showing>
      </video>
    </group>
  </group>
</hvml>
```
