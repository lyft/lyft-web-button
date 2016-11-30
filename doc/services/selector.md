# Selector Service

<!-- div class="toc-container" -->

<!-- div -->

## `addClass`
* <a href="#addclasselement-classname">`addClass`</a>

<!-- /div -->

<!-- div -->

## `removeClass`
* <a href="#removeclasselement-classname">`removeClass`</a>

<!-- /div -->

<!-- div -->

## `selectChildElement`
* <a href="#selectchildelementelement-attributes">`selectChildElement`</a>

<!-- /div -->

<!-- div -->

## `selectChildElementByAttribute`
* <a href="#selectchildelementbyattributeelement-attributename-attributevalue">`selectChildElementByAttribute`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `addClass`

<!-- div -->

<h3 id="addclasselement-classname"><code>addClass(element, className)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/services/selector.js#L7 "View in source") [&#x24C9;][1]

Adds a class to an element.

#### Arguments
1. `element` *(Object)*:
2. `className` *(string)*:

#### Returns
*(void)*:

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `removeClass`

<!-- div -->

<h3 id="removeclasselement-classname"><code>removeClass(element, className)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/services/selector.js#L19 "View in source") [&#x24C9;][1]

Removes a class from an element.

#### Arguments
1. `element` *(Object)*:
2. `className` *(string)*:

#### Returns
*(void)*:

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `selectChildElement`

<!-- div -->

<h3 id="selectchildelementelement-attributes"><code>selectChildElement(element, attributes)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/services/selector.js#L48 "View in source") [&#x24C9;][1]

Selects a single child element from an element tree according to some criteria.

#### Arguments
1. `element` *(Object)*: The top level of the element tree.
2. `attributes` *(Array)*: Strings describing the selection criteria.

#### Returns
*(Object)*: The selected element.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `selectChildElementByAttribute`

<!-- div -->

<h3 id="selectchildelementbyattributeelement-attributename-attributevalue"><code>selectChildElementByAttribute(element, attributeName, attributeValue)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/services/selector.js#L33 "View in source") [&#x24C9;][1]

Selects a single child element from a given element according to some criteria.

#### Arguments
1. `element` *(Object)*: The parent element from which the child will be selected.
2. `attributeName` *(string)*: Name of the attribute for selection.
3. `attributeValue` *(string)*: Value of the named attribute for selection.

#### Returns
*(Object)*: The selected element.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #addclass "Jump back to the TOC."
