# Lyft Web Button Distributable

<!-- div class="toc-container" -->

<!-- div -->

## `api.prototype`
* <a href="#apiprototypegetcostsdata-callback">`api.prototype.getCosts`</a>
* <a href="#apiprototypegetdriversdata-callback">`api.prototype.getDrivers`</a>
* <a href="#apiprototypegetetasdata-callback">`api.prototype.getEtas`</a>
* <a href="#apiprototypegetridetypesdata-callback">`api.prototype.getRideTypes`</a>
* <a href="#apiprototypepostmessagesdata-callback">`api.prototype.postMessages`</a>
* <a href="#apiprototyperequestwithcredentialsurl-data-callback">`api.prototype.requestWithCredentials`</a>

<!-- /div -->

<!-- div -->

## `jsonp.prototype`
* <a href="#jsonpprototypeinjectscriptoptions">`jsonp.prototype.injectScript`</a>
* <a href="#jsonpprototyperequestoptions">`jsonp.prototype.request`</a>
* <a href="#jsonpprototypeserializeobj-pfx">`jsonp.prototype.serialize`</a>

<!-- /div -->

<!-- div -->

## `lyftWebButton.prototype`
* <a href="#lyftwebbuttonprototypebindeventsonclick">`lyftWebButton.prototype.bindEvents`</a>
* <a href="#lyftwebbuttonprototypecreateelements">`lyftWebButton.prototype.createElements`</a>
* <a href="#lyftwebbuttonprototypeinitializeoptions">`lyftWebButton.prototype.initialize`</a>
* <a href="#lyftwebbuttonprototypeongetcostssuccessdata">`lyftWebButton.prototype.onGetCostsSuccess`</a>
* <a href="#lyftwebbuttonprototypeongetetassuccessdata">`lyftWebButton.prototype.onGetEtasSuccess`</a>
* <a href="#lyftwebbuttonprototypeupdatecontentstheme">`lyftWebButton.prototype.updateContents`</a>

<!-- /div -->

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

## `api.prototype`

<!-- div -->

<h3 id="apiprototypegetcostsdata-callback"><code>api.prototype.getCosts(data, callback)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L352 "View in source") [&#x24C9;][1]

Gets `costs`.

#### Arguments
1. `data` *(Object)*: Required.
2. `data.start_lat` *(string)*: Required.
3. `data.start_lng` *(string)*: Required.
4. `data.end_lat` *(string)*: Required.
5. `data.end_lng` *(string)*: Required.
6. `data.ride_type` *(string)*: Optional.
7. `callback` *(function)*: Optional.

#### Returns
*(void): Result of requestWithCredentials()*.

---

<!-- /div -->

<!-- div -->

<h3 id="apiprototypegetdriversdata-callback"><code>api.prototype.getDrivers(data, callback)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L366 "View in source") [&#x24C9;][1]

Gets `drivers`.

#### Arguments
1. `data` *(Object)*: Required.
2. `data.lat` *(string)*: Required.
3. `data.lng` *(string)*: Required.
4. `callback` *(function)*: Optional.

#### Returns
*(void): Result of requestWithCredentials()*.

---

<!-- /div -->

<!-- div -->

<h3 id="apiprototypegetetasdata-callback"><code>api.prototype.getEtas(data, callback)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L381 "View in source") [&#x24C9;][1]

Gets `etas`.

#### Arguments
1. `data` *(Object)*: Required.
2. `data.lat` *(string)*: Required.
3. `data.lng` *(string)*: Required.
4. `data.ride_type` *(string)*: Optional.
5. `callback` *(function)*: Optional.

#### Returns
*(void): Result of requestWithCredentials()*.

---

<!-- /div -->

<!-- div -->

<h3 id="apiprototypegetridetypesdata-callback"><code>api.prototype.getRideTypes(data, callback)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L396 "View in source") [&#x24C9;][1]

Gets `ride_types`.

#### Arguments
1. `data` *(Object)*: Required.
2. `data.lat` *(string)*: Required.
3. `data.lng` *(string)*: Required.
4. `data.ride_type` *(string)*: Optional.
5. `callback` *(function)*: Optional.

#### Returns
*(void): Result of requestWithCredentials()*.

---

<!-- /div -->

<!-- div -->

<h3 id="apiprototypepostmessagesdata-callback"><code>api.prototype.postMessages(data, callback)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L411 "View in source") [&#x24C9;][1]

POSTs `messages`.

#### Arguments
1. `data` *(Object)*: Required.
2. `data.phone_number` *(string)*: Required.
3. `data.end_lat` *(string)*: Optional.
4. `data.end_lng` *(string)*: Optional.
5. `callback` *(function)*: Optional.

#### Returns
*(void): Result of requestWithCredentials()*.

---

<!-- /div -->

<!-- div -->

<h3 id="apiprototyperequestwithcredentialsurl-data-callback"><code>api.prototype.requestWithCredentials(url, data, callback)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L326 "View in source") [&#x24C9;][1]

Requests JSONP with injected credentials.

#### Arguments
1. `url` *(string)*: Required.
2. `data` *(Object)*: Required.
3. `callback` *(function)*: Optional.

#### Returns
*(void): Result of jsonp.request()*.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `jsonp.prototype`

<!-- div -->

<h3 id="jsonpprototypeinjectscriptoptions"><code>jsonp.prototype.injectScript(options)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L442 "View in source") [&#x24C9;][1]

Injects a script into the DOM with given options.

#### Arguments
1. `options` *(Object)*: Required.
2. `options.src` *(string)*: Required.
3. `options.async` *(boolean)*: Optional.
4. `options.callback` *(function)*: Optional.
5. `options.defer` *(boolean)*: Optional.

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- div -->

<h3 id="jsonpprototyperequestoptions"><code>jsonp.prototype.request(options)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L512 "View in source") [&#x24C9;][1]

Performs a JSONP request.

#### Arguments
1. `options` *(Object)*: Required.
2. `options.url` *(string)*: Required.
3. `options.callback` *(string): Callback path relative to window context &#42;(optional)*&#42;.
4. `options.data` *(Object): JSON-compatible data payload &#42;(optional)*&#42;.

#### Returns
*(void): Result of injectScript()*.

---

<!-- /div -->

<!-- div -->

<h3 id="jsonpprototypeserializeobj-pfx"><code>jsonp.prototype.serialize(obj, pfx)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L486 "View in source") [&#x24C9;][1]

Recursively serializes data as a query-parameter string.

#### Arguments
1. `obj` *(Object): Data to serialize &#42;(required)*&#42;.
2. `pfx` *(string): Key prefix for data chunk &#42;(optional)*&#42;.

#### Returns
*(string)*: Query-parameter string.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `lyftWebButton.prototype`

<!-- div -->

<h3 id="lyftwebbuttonprototypebindeventsonclick"><code>lyftWebButton.prototype.bindEvents(onClick)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L1011 "View in source") [&#x24C9;][1]

Binds events to some elements.

#### Arguments
1. `onClick` *(function)*: Handler for button's onclick event.

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- div -->

<h3 id="lyftwebbuttonprototypecreateelements"><code>lyftWebButton.prototype.createElements()</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L992 "View in source") [&#x24C9;][1]

Creates elements from a template and stores some useful references.

#### Returns
*(Object)*: Template's root element.

---

<!-- /div -->

<!-- div -->

<h3 id="lyftwebbuttonprototypeinitializeoptions"><code>lyftWebButton.prototype.initialize(options)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L1099 "View in source") [&#x24C9;][1]

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
*(void)*: Void.

---

<!-- /div -->

<!-- div -->

<h3 id="lyftwebbuttonprototypeongetcostssuccessdata"><code>lyftWebButton.prototype.onGetCostsSuccess(data)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L1043 "View in source") [&#x24C9;][1]

Success callback for getCosts request.

#### Arguments
1. `data` *(Object)*: Response data.

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- div -->

<h3 id="lyftwebbuttonprototypeongetetassuccessdata"><code>lyftWebButton.prototype.onGetEtasSuccess(data)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L1067 "View in source") [&#x24C9;][1]

Success callback for getEtas request.

#### Arguments
1. `data` *(Object)*: Response data.

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- div -->

<h3 id="lyftwebbuttonprototypeupdatecontentstheme"><code>lyftWebButton.prototype.updateContents(theme)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L1025 "View in source") [&#x24C9;][1]

Updates the contents of some elements.

#### Arguments
1. `theme` *(string)*: Name of the user's chosen theme.

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `lyftWebModal.prototype`

<!-- div -->

<h3 id="lyftwebmodalprototypebindeventslocation-objectname"><code>lyftWebModal.prototype.bindEvents(location, objectName)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L133 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L249 "View in source") [&#x24C9;][1]

Makes the modal window invisible and detaches it from the DOM.

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- div -->

<h3 id="lyftwebmodalprototypecreateelements"><code>lyftWebModal.prototype.createElements()</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L90 "View in source") [&#x24C9;][1]

Creates elements from a template and stores some useful references.

#### Returns
*(Object)*: Template's root element.

---

<!-- /div -->

<!-- div -->

<h3 id="lyftwebmodalprototypeinitializeoptions"><code>lyftWebModal.prototype.initialize(options)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L273 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L217 "View in source") [&#x24C9;][1]

Success callback for postMessages request.

#### Arguments
1. `data` *(Object)*: Response data.

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- div -->

<h3 id="lyftwebmodalprototypeopen"><code>lyftWebModal.prototype.open()</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L236 "View in source") [&#x24C9;][1]

Attaches the modal window to the DOM and makes it visible.

#### Returns
*(void)*: Void.

---

<!-- /div -->

<!-- div -->

<h3 id="lyftwebmodalprototypeupdatecontentsgoogleapikey-location"><code>lyftWebModal.prototype.updateContents(googleApiKey, location)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L180 "View in source") [&#x24C9;][1]

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

<!-- div -->

## `selector.prototype`

<!-- div -->

<h3 id="selectorprototypeaddclasselement-classname"><code>selector.prototype.addClass(element, className)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L542 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L556 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L589 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/dist/lyftWebButton.js#L572 "View in source") [&#x24C9;][1]

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

 [1]: #api.prototype "Jump back to the TOC."
