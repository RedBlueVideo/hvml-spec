---
title: The `video` Element
date: "2018-09-05T21:25:13-05:00"
---

#### Contexts

- As a <b>child</b> of `hvml`

#### Content Attributes

- XML Global Attributes (e.g. `xml:id`)
- `type`
  <dl class="inline-flex">
    <dt>Required:</dt>
    <dd>No</dd>
    <dt>Type:</dt>
    <dd><code class="language-text">xs:string</code></dd>
    <dt>Values:</dt>
    <!-- <dd><code class="language-text">short</code></dd> -->
    <!-- <dd><code class="language-text">feature</code></dd> -->
    <!-- <dd><code class="language-text">series</code></dd> -->
    <dd><code class="language-text">narrative</code></dd>
    <dd><code class="language-text">ad</code></dd>
    <dd><code class="language-text">personal</code></dd>
    <dd><code class="language-text">historical</code></dd>
  </dl>

#### Definition

Represents a single theatrical film, TV show episode, advertisement, home movie, news segment, piece of archival footage, animated <abbr>GIF</abbr>, or any other motion picture (i.e., visual media with fixed changes along a temporal axis).

#### Authoring

The `type` attribute accepts one or more of the following values as a space-separated list:

<!-- - `short`, indicating that the video in question is a short film, or “short”. This does not designate a particular running time, as “short film” has varying personal, cultural, and institutional definitions.

  For instance, the Sundance Film Festival considers a short to be any film with a runtime of under 50 minutes, while the Academy Awards considers a short to be any film with a runtime of under 40 minutes. Other institutions distinguish shorts from “medium-length” films, and use the former term to designate films under 30, or even 20 minutes long.

  As such, this attribute value is only a hint to User-agents that the video in question is regarded as a “short”, either by the general public or by the video’s author. An <abbr>HVML</abbr>-aware website for a film festival might decide to ignore this value and instead use the video’s runtime to determine whether to categorize it as a “short”, “medium-length”, “feature”, or something else. Note that <abbr>HVML</abbr> does not distinguish between “short” and “medium” lengths; both can be represented by the `short` attribute value. -->
<!-- - `feature`, indicating that the video in question is a feature-length film. Like `short`, this is a subjective designation that does not impose a specific limit or minimum on running time. -->
- `narrative`, indicating that the video in question is a fictional film, usually with a distinct story arc, of any length;
- `documentary`, indicating that the video in question is an investigative, introspective, contemplative, or otherwise educational film of any length;
- `ad`, indicating that the video in question is primarily an advertisement for a product, service, company, or individual, i.e. a commercial. This designation alone is not suitable for videos that merely feature embedded advertisements such as product placement, paid reviews, “ad reads”, or other sponsorships, but are otherwise noncommercial in nature<!--These sponsored segments will be able to be marked up separately in a future edition of <abbr>HVML</abbr>-->;
- `personal`, indicating that the video in question is primarily from the perspective of an individual, family, friend group, or other close association, and may lack serious artistic direction, such as home movies, or “user-generated content” uploaded to a third-party website;
- `historical`, indicating that the video in question is pertinent to some aspect of history, such as a news program or segment, or miscellaneous footage belonging to a library, archive, or personal collection.

These values can be combined, in any order, in the following ways to derive additional meanings:

- `narrative documentary`: a documentary with fictionalized elements. This does not refer to disputed or exaggerated claims made in investigative journalism, but rather to hybrid fiction–nonfiction, such as a biopic portrayed by actors that also includes interviews with real-life people relating to the story;
- `personal documentary`: a self-authored vlog (video blog);
- `personal ad`: an advertisement for oneself, such as a political campaign commercial, or a video job application;
- `documentary ad`: an advertisement presented as educational content about a particular topic, e.g. “native advertising”;
- `historical ad`: a commercial for a defunct product or service, or a commercial that is no longer running;
- `historical personal`: a personal video that one has “archived” in order to exclude it or separate it from a list of their recent content in some interface.

When using <abbr>HVML</abbr>’s <b><abbr>XML</abbr> serialization</b> in an <b><abbr>HTML</abbr> context</b>, be aware that the User-agent, typically a Web browser, will interpret un-namespaced `<video>`s to be instances of <abbr>HTML</abbr>’s embedded video player element of the same name. This may result in the browser performing unnecessary work, such as populating the tag with extraneous <abbr>DOM</abbr> properties.

To minimize the potential for unwanted browser behavior, <abbr>HTML</abbr>’s media-specific attributes (as defined by the [<abbr>WHATWG</abbr> Living Standard](https://html.spec.whatwg.org/multipage/media.html#the-video-element:concept-element-attributes)) are reserved attributes in <abbr>HVML</abbr>, and will throw errors in conformance checkers if present: `autoplay`, `buffered`, `controls`, `crossorigin`, `height`, `loop`, `muted`, `preload`, `poster`, `src`, `width`, `playsinline`, or any other attribute defined therein.

When using <abbr>HVML</abbr>’s <b><abbr>XML</abbr> serialization</b> in an <b><abbr>XHTML</abbr> context</b> (i.e., served with `Content-Type: application/xhtml+xml`), unwanted browser behavior can be avoided merely by setting the appropriate namespace, as in one of the following configurations:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <video>
      <!-- HTML video definition -->
    </video>
    <hvml xmlns="https://hypervideo.tech/hvml#">
      <video>
        <!-- HVML video definition -->
      </video>
    </hvml>
  </body>
</html>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:hvml="https://hypervideo.tech/hvml#">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <video>
      <!-- HTML video definition -->
    </video>
    <hvml:hvml>
      <hvml:video>
        <!-- HVML video definition -->
      </hvml:video>
    </hvml:hvml>
  </body>
</html>
```