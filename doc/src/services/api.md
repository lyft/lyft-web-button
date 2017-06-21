# API Service

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

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `api.prototype`

<!-- div -->

<h3 id="apiprototypegetcostsdata-callback"><code>api.prototype.getCosts(data, callback)</code></h3>
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/services/api.js#L53 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/services/api.js#L67 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/services/api.js#L82 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/services/api.js#L97 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/services/api.js#L112 "View in source") [&#x24C9;][1]

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
[&#x24C8;](https://github.com/lyft/lyft-web-button/blob/master/src/services/api.js#L27 "View in source") [&#x24C9;][1]

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

<!-- /div -->

 [1]: #api.prototype "Jump back to the TOC."
