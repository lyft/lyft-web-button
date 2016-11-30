# Lyft Web Modal Component

<!-- div class="toc-container" -->

<!-- div -->

## `bindEvents`
* <a href="#bindeventslocation-objectname">`bindEvents`</a>

<!-- /div -->

<!-- div -->

## `close`
* <a href="#close">`close`</a>

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

## `onPostMessagesSuccess`
* <a href="#onpostmessagessuccessdata">`onPostMessagesSuccess`</a>

<!-- /div -->

<!-- div -->

## `open`
* <a href="#open">`open`</a>

<!-- /div -->

<!-- div -->

## `updateContents`
* <a href="#updatecontentsgoogleapikey-location">`updateContents`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `bindEvents`

<!-- div -->

<h3 id="bindeventslocation-objectname"><code>bindEvents(location, objectName)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/components/lyftWebModal/index.js#L60 "View in source") [&#x24C9;][1]

Binds events to some elements.

#### Arguments
1. `location` *(Object)*: Location of the intended destination.
2. `location.address` *(string)*:
3. `location.latitude` *(string)*:
4. `location.longitude` *(string)*:
5. `location.name` *(string)*:
6. `objectName` *(string)*: This instance's name in the global namespace.

#### Returns
*(void)*:

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `close`

<!-- div -->

<h3 id="close"><code>close()</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/components/lyftWebModal/index.js#L168 "View in source") [&#x24C9;][1]

Makes the modal window invisible and detaches it from the DOM.

#### Returns
*(void)*:

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `createElements`

<!-- div -->

<h3 id="createelements"><code>createElements()</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/components/lyftWebModal/index.js#L30 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/components/lyftWebModal/index.js#L190 "View in source") [&#x24C9;][1]

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
*(void)*:

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `onPostMessagesSuccess`

<!-- div -->

<h3 id="onpostmessagessuccessdata"><code>onPostMessagesSuccess(data)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/components/lyftWebModal/index.js#L140 "View in source") [&#x24C9;][1]

Success callback for postMessages request.

#### Arguments
1. `data` *(Object)*: Response data.

#### Returns
*(void)*:

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `open`

<!-- div -->

<h3 id="open"><code>open()</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/components/lyftWebModal/index.js#L157 "View in source") [&#x24C9;][1]

Attaches the modal window to the DOM and makes it visible.

#### Returns
*(void)*:

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `updateContents`

<!-- div -->

<h3 id="updatecontentsgoogleapikey-location"><code>updateContents(googleApiKey, location)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/components/lyftWebModal/index.js#L105 "View in source") [&#x24C9;][1]

Updates the contents of some elements.

#### Arguments
1. `googleApiKey` *(string)*: API key for Google Static Maps.
2. `location` *(Object)*: Location of the intended destination.
3. `location.address` *(string)*:
4. `location.latitude` *(string)*:
5. `location.longitude` *(string)*:
6. `location.name` *(string)*:

#### Returns
*(void)*:

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #bindevents "Jump back to the TOC."
