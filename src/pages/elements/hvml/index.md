---
title: The `hvml` Element
date: "2018-06-30T03:14:58-05:00"
---

#### Contexts

- Documents

#### Content Attributes

- XML Root Node Attributes (e.g. `xmlns`)
- XML Global Attributes (e.g. `xml:id`)

#### Definition

This is the root node. Limit one per document. Required.

#### Examples

1. A barebones configuration.

   **Note:** Although this is conforming, this does not provide much context for the document’s contents, and is not recommended in most cases.

   ```xml
   <hvml></hvml>
   ```
2. A configuration setting document language to English.

   ```xml
   <hvml xml:lang="en"></hvml>
   ```
3. A configuration specifying the HVML namespace, and setting document language to French.

   **Note:** This is the recommended minimum configuration (with document language set appropriately).

   ```xml
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="fr"></hvml>
   ```
