---
title: The `group` Element
date: "2018-06-30T03:20:03-05:00"
---

#### Contexts

- As a child of `hvml`
- As a child of `group`
- As a child of `glossary`

#### Content Attributes

- XML Global Attributes (e.g. `xml:id`)
- `type`
   - **Type:** `xs:string`
   - **Possible values:**
      - As a child of `hvml` or `group`: `series`
      - As a child of `glossary`: `profanity | nudity | sex | violence | drugs | scale`

#### Definition

An arbitrary grouping.

#### Examples

1. As a child of `hvml`: Denoting an episodic television show.

   ```xml
   <group xml:id="hughs-vlog" type="series">
     <!-- … -->
   </group>
   ```
2. As a child of `group`: Denoting a distinct “season” or “series” of an episodic television show.

   ```xml
   <group xml:id="hughs-vlog" type="series">
     <group xml:id="season-01" type="series">
       <!-- … -->
     </group>
   </group>
   ```
3. As a child of `glossary`: Defining a group of content rating classifications.

   ```xml
   <group type="profanity">
     <rating code="L-" maturity="0" color="green">
       <title>No strong language</title>
     </rating>
     <!-- … -->
     <rating code="L+" maturity="1" color="red">
       <title>Explicit language</title>
     </rating>
   </group>
   ```
4. As a child of `glossary`: Defining a group of content ranking classifications.

   ```xml
   <group type="scale">
     <score xml:id="nstv-ma" code="Ma" rank="1">
       <title>Masterpiece</title>
     </score>
     <!-- … -->
     <score xml:id="nstv-u" code="U" rank="0">
       <title>Unwatchable</title>
     </score>
   </group>
   ```
