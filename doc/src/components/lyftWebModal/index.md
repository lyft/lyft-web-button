# Lyft Web Modal Component

<!-- div class="toc-container" -->

<!-- div -->

## `lyftWebModal.prototype`
* <a href="#lyftwebmodalprototypebindeventslocation-objectname">`lyftWebModal.prototype.bindEvents`</a>
* <a href="#lyftwebmodalprototypeclose">`lyftWebModal.prototype.close`</a>
* <a href="#lyftwebmodalprototypecreateelements">`lyftWebModal.prototype.createElements`</a>
* <a href="#lyftwebmodalprototypeinitializeoptions">`lyftWebModal.prototype.initialize`</a>
* <a href="#lyftwebmodalprototypeonpostmessagessuccessdata">`lyftWebModal.prototype.onPostMessagesSuccess`</a>
* <a href="#lyftwebmodalprototypeopen">`lyftWebModal.prototype.open`</a>
* <a href="#lyftwebmodalprototypeupdatecontentsgoogleapikey-location">`lyftWebModal.prototype.updateContents`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `lyftWebModal.prototype`

<!-- div -->

<h3 id="lyftwebmodalprototypebindeventslocation-objectname"><code>lyftWebModal.prototype.bindEvents(location, objectName)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/components/lyftWebModal/index.js#L78 "View in source") [&#x24C9;][1]

Binds events to some elements.

#### Arguments
1. `location` *(Object)*: Location of the intended destination.
2. `location.address` *(string)*:
3. `location.latitude` *(string)*:
4. `location.longitude` *(string)*:
5. `location.name` *(string)*:
6. `objectName` *(string)*: This instance's name in the global namespace.

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- div -->

<h3 id="lyftwebmodalprototypeclose"><code>lyftWebModal.prototype.close()</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/components/lyftWebModal/index.js#L194 "View in source") [&#x24C9;][1]

Makes the modal window invisible and detaches it from the DOM.

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- div -->

<h3 id="lyftwebmodalprototypecreateelements"><code>lyftWebModal.prototype.createElements()</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/components/lyftWebModal/index.js#L35 "View in source") [&#x24C9;][1]

Creates elements from a template and stores some useful references.

#### Returns
*(Object)*: Template's root element.

---

<!-- /div -->

<!-- div -->

<h3 id="lyftwebmodalprototypeinitializeoptions"><code>lyftWebModal.prototype.initialize(options)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/components/lyftWebModal/index.js#L218 "View in source") [&#x24C9;][1]

Initialize.

#### Arguments
1. `options` *(Object)*:
2. `options.clientId` *(string)*:
3. `options.clientToken` *(string)*:
4. `options.googleApiKey` *(string)*:
5. `options.location` *(Object)*:
6. `options.location.address` *(string)*:
7. `options.location.latitude` *(string)*:
8. `options.location.longitude` *(string)*:
9. `options.location.name` *(string)*:
10. `options.objectName` *(string)*:
11. `options.parentElement` *(Object)*:

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- div -->

<h3 id="lyftwebmodalprototypeonpostmessagessuccessdata"><code>lyftWebModal.prototype.onPostMessagesSuccess(data)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/components/lyftWebModal/index.js#L162 "View in source") [&#x24C9;][1]

Success callback for postMessages request.

#### Arguments
1. `data` *(Object)*: Response data.

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- div -->

<h3 id="lyftwebmodalprototypeopen"><code>lyftWebModal.prototype.open()</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/components/lyftWebModal/index.js#L181 "View in source") [&#x24C9;][1]

Attaches the modal window to the DOM and makes it visible.

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- div -->

<h3 id="lyftwebmodalprototypeupdatecontentsgoogleapikey-location"><code>lyftWebModal.prototype.updateContents(googleApiKey, location)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/components/lyftWebModal/index.js#L125 "View in source") [&#x24C9;][1]

Updates the contents of some elements.

#### Arguments
1. `googleApiKey` *(string)*: API key for Google Static Maps.
2. `location` *(Object)*: Location of the intended destination.
3. `location.address` *(string)*:
4. `location.latitude` *(string)*:
5. `location.longitude` *(string)*:
6. `location.name` *(string)*:

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #lyftwebmodal.prototype "Jump back to the TOC."
