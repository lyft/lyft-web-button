# Selector Service

<!-- div class="toc-container" -->

<!-- div -->

## `selector.prototype`
* <a href="#selectorprototypeaddclasselement-classname">`selector.prototype.addClass`</a>
* <a href="#selectorprototyperemoveclasselement-classname">`selector.prototype.removeClass`</a>
* <a href="#selectorprototypeselectchildelementelement-attributes">`selector.prototype.selectChildElement`</a>
* <a href="#selectorprototypeselectchildelementbyattributeelement-attributename-attributevalue">`selector.prototype.selectChildElementByAttribute`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `selector.prototype`

<!-- div -->

<h3 id="selectorprototypeaddclasselement-classname"><code>selector.prototype.addClass(element, className)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/services/selector.js#L9 "View in source") [&#x24C9;][1]

Adds a class to an element.

#### Arguments
1. `element` *(Object)*: Required.
2. `className` *(string)*: Required.

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- div -->

<h3 id="selectorprototyperemoveclasselement-classname"><code>selector.prototype.removeClass(element, className)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/services/selector.js#L23 "View in source") [&#x24C9;][1]

Removes a class from an element.

#### Arguments
1. `element` *(Object)*: Required.
2. `className` *(string)*: Required.

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- div -->

<h3 id="selectorprototypeselectchildelementelement-attributes"><code>selector.prototype.selectChildElement(element, attributes)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/services/selector.js#L56 "View in source") [&#x24C9;][1]

Selects a single child element from an element tree according to some criteria.

#### Arguments
1. `element` *(Object)*: The top level of the element tree.
2. `attributes` *(Array)*: Strings describing the selection criteria.

#### Returns
*(Object)*: The selected element.

---

<!-- /div -->

<!-- div -->

<h3 id="selectorprototypeselectchildelementbyattributeelement-attributename-attributevalue"><code>selector.prototype.selectChildElementByAttribute(element, attributeName, attributeValue)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/services/selector.js#L39 "View in source") [&#x24C9;][1]

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

 [1]: #selector.prototype "Jump back to the TOC."
