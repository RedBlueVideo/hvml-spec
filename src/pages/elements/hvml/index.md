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

#### Authoring

When using the <b>XML serialization</b> of <abbr>HVML</abbr>, one and only one <b><abbr>XML</abbr> prolog</b>—e.g. `<?xml version="1.0" encoding="UTF-8"?>`—[SHOULD](https://tools.ietf.org/html/rfc2119#section-3) be specified before the root node, for the benefit of <abbr>XML</abbr> parsers. If an <abbr>HVML</abbr> document omits the prolog, or omits either of the two prolog attributes, the document will be assumed to be an <abbr>XML</abbr> 1.0 document, and/or encoded using <abbr>UTF-8</abbr>, respectively.

#### Examples

1. A barebones configuration.

   **Note:** Although an attribute-less root element is conforming, this does not provide much context for the document’s contents, and is not recommended in most cases.

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <hvml></hvml>
   ```
2. A configuration setting document language to English.

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <hvml xml:lang="en"></hvml>
   ```
3. A configuration specifying the HVML namespace, and setting document language to French.

   **Note:** This is the recommended minimum configuration (with document language set appropriately).

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <hvml xmlns="https://hypervideo.tech/hvml#" xml:lang="fr"></hvml>
   ```
