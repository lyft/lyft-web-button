# Lyft Web SDK

### Installation (requires [node](https://nodejs.org))

```bash
# clone repository
git clone https://github.com/lyft/lyft-web-sdk.git

# install dependencies
cd lyft-web-sdk
npm install
```

### Usage

1. Start the server with `npm run-script start`.
2. Open [webpack-dev-server](http://localhost:8080/webpack-dev-server/) in a web browser.
3. As you work the page will automatically update via websocket connection.

### Scripts
```bash
# build
npm run-script build

# build with minification
npm run-script build:dist

# test (silence ELIFECYCLE output)
npm run-script --silent test
```

### Limitations
- `lyftWebButton` can appear more than once on a page, but the implementation needs improvement.
- `lyftWebModal` uses a single theme, but it can be overridden with CSS.
- `lyftWebModal` only supports Google Maps at this time, but it may be worth allowing a custom background image.
