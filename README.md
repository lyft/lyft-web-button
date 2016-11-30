# Lyft Web SDK

[Documentation](https://github.com/lyft/lyft-web-sdk/blob/master/doc/README.md)
 | [Code of Conduct](https://github.com/lyft/lyft-web-sdk/blob/master/CODE_OF_CONDUCT.md)
 | [Lyft.com/developers](https://www.lyft.com/developers)

### Quick Start

**If you only want a finished component you don't need install anything.** Instead, do the following:

1. Sign up for a `client_id` and `client_token` at [lyft.com/developers](https://www.lyft.com/developers).
2. (Optional) Get a [Google API Key](https://developers.google.com/maps/documentation/static-maps/) for Google Static Maps.
3. Grab the component itself from [dist](https://github.com/lyft/lyft-web-sdk/blob/master/dist).
4. Copy an example html file from [dist](https://github.com/lyft/lyft-web-sdk/blob/master/dist) and fill in the blanks.

If you want to build your own components or modify existing ones you'll need to continue reading.

### Installation

To build this from source make sure you have the following:
- [git](https://git-scm.com/downloads) (latest version)
- [node](https://nodejs.org) (>=4.0.0)
- npm (auto-installs with node)

Next, open a shell session and enter the following commands:
```bash
# clone repository
git clone https://github.com/lyft/lyft-web-sdk.git

# install dependencies
cd lyft-web-sdk
npm install
```

### Usage

1. Start the server with `npm start` (or `npm run-script start`).
2. Open [webpack-dev-server](http://localhost:8080/webpack-dev-server/) in a web browser.
3. As you work the page will automatically update via websocket connection.

### Scripts
```bash
# build
npm run-script build

# build with minification
npm run-script build:dist

# regenerate documentation
npm run-script doc

# test (silence ELIFECYCLE output)
npm run-script --silent test
```

### Limitations
- `lyftWebButton` can appear more than once on a page, but the implementation needs improvement.
- `lyftWebModal` uses a single theme, but it can be overridden with CSS.
- `lyftWebModal` only supports Google Maps at this time, but it may be worth allowing a custom background image.
