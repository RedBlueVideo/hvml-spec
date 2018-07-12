---
title: The `group` Element
date: "2018-07-12T02:53:57-05:00"
---

#### Contexts

- As a child of `series`
- As a child of `group`

#### Content Attributes

- XML Global Attributes (e.g. `xml:id`)
- `type`
  <dl class="inline-flex">
    <dt>Required:</dt>
    <dd>No</dd>
    <dt>Type:</dt>
    <dd><code class="language-text">xs:string</code></dd>
    <dt>Values:</dt>
    <dd><code class="language-text">curation</code></dd>
  </dl>
<!--
- `order`
  <dl class="inline-flex">
    <dt>Required:</dt>
    <dd>No</dd>
    <dt>Type:</dt>
    <dd><code class="language-text">xs:string</code></dd>
    <dt>Values:</dt>
    <dd><code class="language-text">ascending</code></dd>
    <dd><code class="language-text">descending</code></dd>
    <dd><code class="language-text">custom</code></dd>
  </dl>
 -->

#### Definition

An arbitrary grouping.

#### Examples

1. Marking up a curated list of episodes.

   ```xml
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="en">
     <series xml:id="hughs-vlog">
       <title>Hugh’s Vlog</title>
       <group xml:id="best-of-hughs-vlog" type="curation">
         <video xml:id="episode-01"></video>
         <video xml:id="episode-03"></video>
         <video xml:id="episode-05"></video>
       </group>
     </series>
   </hvml>
   ```

2. Marking up a curated list of episodes from a previously-defined set of episodes.

   For this we must import the `xlink` namespace on the root node, in order to use `xlink:href` to target specific `xml:id`s.

   ```xml
   <hvml
     xmlns="https://hypervideo.tech/hvml#"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     xml:lang="en"
   >
     <series xml:id="hughs-vlog">
       <title>Hugh’s Vlog</title>
       <series xml:id="season-01">
         <video xml:id="episode-01"></video>
         <video xml:id="episode-02"></video>
         <video xml:id="episode-03"></video>
         <video xml:id="episode-04"></video>
         <video xml:id="episode-05"></video>
       </series>
       <group xml:id="best-of-hughs-vlog" type="curation">
         <video xml:id="best-of-01" xlink:href="#episode-01"></video>
         <video xml:id="best-of-02" xlink:href="#episode-03"></video>
         <video xml:id="best-of-03" xlink:href="#episode-05"></video>
       </group>
     </series>
   </hvml>
   ```
