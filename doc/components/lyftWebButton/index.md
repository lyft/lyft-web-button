# Lyft Web Button Component

<!-- div class="toc-container" -->

<!-- div -->

## `bindEvents`
* <a href="#bindeventsonclick">`bindEvents`</a>

<!-- /div -->

<!-- div -->

## `createElements`
* <a href="#createelements">`createElements`</a>

<!-- /div -->

<!-- div -->

## `initialize`
* <a href="#initializeoptions">`initialize`</a>

<!-- /div -->

<!-- div -->

## `onGetCostsSuccess`
* <a href="#ongetcostssuccessdata">`onGetCostsSuccess`</a>

<!-- /div -->

<!-- div -->

## `onGetEtasSuccess`
* <a href="#ongetetassuccessdata">`onGetEtasSuccess`</a>

<!-- /div -->

<!-- div -->

## `updateContents`
* <a href="#updatecontentstheme">`updateContents`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `bindEvents`

<!-- div -->

<h3 id="bindeventsonclick"><code>bindEvents(onClick)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/components/lyftWebButton/index.js#L41 "View in source") [&#x24C9;][1]

Binds events to some elements.

#### Arguments
1. `onClick` *(function)*: Handler for button's onclick event.

#### Returns
*(void)*:

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `createElements`

<!-- div -->

<h3 id="createelements"><code>createElements()</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/components/lyftWebButton/index.js#L24 "View in source") [&#x24C9;][1]

Creates elements from a template and stores some useful references.

#### Returns
*(Object)*: Template's root element.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `initialize`

<!-- div -->

<h3 id="initializeoptions"><code>initialize(options)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/components/lyftWebButton/index.js#L121 "View in source") [&#x24C9;][1]

Initialize.

#### Arguments
1. `options` *(Object)*:
2. `options.clientId` *(string)*:
3. `options.clientToken` *(string)*:
4. `options.location` *(Object)*:
5. `options.location.address` *(string)*:
6. `options.location.latitude` *(string)*:
7. `options.location.longitude` *(string)*:
8. `options.location.name` *(string)*:
9. `options.objectName` *(string)*:
10. `options.parentElement` *(Object)*:
11. `options.theme` *(string)*:

#### Returns
*(void)*:

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `onGetCostsSuccess`

<!-- div -->

<h3 id="ongetcostssuccessdata"><code>onGetCostsSuccess(data)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/components/lyftWebButton/index.js#L69 "View in source") [&#x24C9;][1]

Success callback for getCosts request.

#### Arguments
1. `data` *(Object)*: Response data.

#### Returns
*(void)*:

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `onGetEtasSuccess`

<!-- div -->

<h3 id="ongetetassuccessdata"><code>onGetEtasSuccess(data)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/components/lyftWebButton/index.js#L91 "View in source") [&#x24C9;][1]

Success callback for getEtas request.

#### Arguments
1. `data` *(Object)*: Response data.

#### Returns
*(void)*:

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `updateContents`

<!-- div -->

<h3 id="updatecontentstheme"><code>updateContents(theme)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/components/lyftWebButton/index.js#L53 "View in source") [&#x24C9;][1]

Updates the contents of some elements.

#### Arguments
1. `theme` *(string)*: Name of the user's chosen theme.

#### Returns
*(void)*:

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #bindevents "Jump back to the TOC."
