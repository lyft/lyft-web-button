# JSONP Service

<!-- div class="toc-container" -->

<!-- div -->

## `injectScript`
* <a href="#injectscriptoptions">`injectScript`</a>

<!-- /div -->

<!-- div -->

## `request`
* <a href="#requestoptions">`request`</a>

<!-- /div -->

<!-- div -->

## `serialize`
* <a href="#serializeobj-pfx">`serialize`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `injectScript`

<!-- div -->

<h3 id="injectscriptoptions"><code>injectScript(options)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/services/jsonp.js#L10 "View in source") [&#x24C9;][1]

Injects a script into the DOM with given options.

#### Arguments
1. `options` *(Object)*: Required.
2. `options.src` *(string)*: Required.
3. `options.async` *(boolean)*: Optional.
4. `options.callback` *(function)*: Optional.
5. `options.defer` *(boolean)*: Optional.

#### Returns
*(void)*:

---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `request`

<!-- div -->

<h3 id="requestoptions"><code>request(options)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/services/jsonp.js#L76 "View in source") [&#x24C9;][1]

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

<!-- /div -->

<!-- div -->

## `serialize`

<!-- div -->

<h3 id="serializeobj-pfx"><code>serialize(obj, pfx)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/services/jsonp.js#L52 "View in source") [&#x24C9;][1]

Recursively serializes data as a query-parameter string.

#### Arguments
1. `obj` *(Object): Data to serialize &#42;(required)*&#42;.
2. `pfx` *(string): Key prefix for data chunk &#42;(optional)*&#42;.

#### Returns
*(string)*: Query-parameter string.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #injectscript "Jump back to the TOC."
