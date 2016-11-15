# Lyft Web Library

### Installation (requires [node](https://nodejs.org))

```bash
# clone repository
git clone https://github.com/lyft/lyft-web-library.git

# install dependencies
cd lyft-web-library
npm install
```

### Usage

1. Start the server with `npm run-script start`.
2. Open [index.html](http://localhost:8080/webpack-dev-server/) in a web browser.
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
- `lyftWebButton` cannot appear more than once on a page at this time. This is a technical implementation detail, and it may change in the future.
- `lyftWebModal` uses a single theme, but it can be changed with CSS.
