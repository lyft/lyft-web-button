# JSONP Service

<!-- div class="toc-container" -->

<!-- div -->

## `jsonp.prototype`
* <a href="#jsonpprototypeinjectscriptoptions">`jsonp.prototype.injectScript`</a>
* <a href="#jsonpprototyperequestoptions">`jsonp.prototype.request`</a>
* <a href="#jsonpprototypeserializeobj-pfx">`jsonp.prototype.serialize`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `jsonp.prototype`

<!-- div -->

<h3 id="jsonpprototypeinjectscriptoptions"><code>jsonp.prototype.injectScript(options)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/services/jsonp.js#L12 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/services/jsonp.js#L82 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/services/jsonp.js#L56 "View in source") [&#x24C9;][1]

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

 [1]: #jsonp.prototype "Jump back to the TOC."
