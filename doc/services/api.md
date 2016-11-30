# API Service

<!-- div class="toc-container" -->

<!-- div -->

## `getCosts`
* <a href="#getcostsdata-callback">`getCosts`</a>

<!-- /div -->

<!-- div -->

## `getDrivers`
* <a href="#getdriversdata-callback">`getDrivers`</a>

<!-- /div -->

<!-- div -->

## `getEtas`
* <a href="#getetasdata-callback">`getEtas`</a>

<!-- /div -->

<!-- div -->

## `getRideTypes`
* <a href="#getridetypesdata-callback">`getRideTypes`</a>

<!-- /div -->

<!-- div -->

## `postMessages`
* <a href="#postmessagesdata-callback">`postMessages`</a>

<!-- /div -->

<!-- div -->

## `requestWithCredentials`
* <a href="#requestwithcredentialsdata-callback-url">`requestWithCredentials`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `getCosts`

<!-- div -->

<h3 id="getcostsdata-callback"><code>getCosts(data, callback)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/services/api.js#L49 "View in source") [&#x24C9;][1]

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

<!-- /div -->

<!-- div -->

## `getDrivers`

<!-- div -->

<h3 id="getdriversdata-callback"><code>getDrivers(data, callback)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/services/api.js#L61 "View in source") [&#x24C9;][1]

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

<!-- /div -->

<!-- div -->

## `getEtas`

<!-- div -->

<h3 id="getetasdata-callback"><code>getEtas(data, callback)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/services/api.js#L74 "View in source") [&#x24C9;][1]

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

<!-- /div -->

<!-- div -->

## `getRideTypes`

<!-- div -->

<h3 id="getridetypesdata-callback"><code>getRideTypes(data, callback)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/services/api.js#L87 "View in source") [&#x24C9;][1]

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

<!-- /div -->

<!-- div -->

## `postMessages`

<!-- div -->

<h3 id="postmessagesdata-callback"><code>postMessages(data, callback)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/services/api.js#L100 "View in source") [&#x24C9;][1]

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

<!-- /div -->

<!-- div -->

## `requestWithCredentials`

<!-- div -->

<h3 id="requestwithcredentialsdata-callback-url"><code>requestWithCredentials(data, callback, url)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-sdk/blob/master/src/services/api.js#L25 "View in source") [&#x24C9;][1]

Requests JSONP with injected credentials.

#### Arguments
1. `data` *(Object)*: Required.
2. `callback` *(function)*: Optional.
3. `url` *(string)*: Required.

#### Returns
*(void): Result of jsonp.request()*.

---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #getcosts "Jump back to the TOC."
