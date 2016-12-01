# Lyft Web SDK

[Documentation](https://github.com/lyft/lyft-web-sdk/blob/master/doc/README.md)
 | [Code of Conduct](https://github.com/lyft/lyft-web-sdk/blob/master/CODE_OF_CONDUCT.md)
 | [License](https://github.com/lyft/lyft-web-sdk/blob/master/LICENSE)
 | [Support](#support)
 | [Lyft.com/developers](https://www.lyft.com/developers)

## Quick Start

**If you only want a finished component you don't need to install anything.** Instead, do the following:

1. Sign up for a `client_id` and `client_token` at [lyft.com/developers](https://www.lyft.com/developers).
2. (Optional) Get a [Google API Key](https://developers.google.com/maps/documentation/static-maps/) for Google Static Maps.
3. Grab the component itself from [dist](https://github.com/lyft/lyft-web-sdk/blob/master/dist).
4. Copy an example html file from [dist](https://github.com/lyft/lyft-web-sdk/blob/master/dist) and fill in the blanks.

If you chose `lyftWebButton` and configured it correctly it should look like this:

![lyftWebButton multicolor](doc/lyftWebButton-multicolor.png)

If you want to build your own components or modify existing ones you'll need to continue reading.

## Modifying and Building Components

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
2. Open [webpack-dev-server](http://localhost:8080) in a web browser.
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

## Support

If you're looking for help configuring or using the Lyft Web SDK, or if you have general
 questions related to our APIs, the Lyft Developer Platform team provides support through
 our [forum](https://developer.lyft.com/discuss) as well as on Stack Overflow using the
 `lyft-api` tag. _Please do not create tickets on help.lyft.com, as this is our help
 desk for regular users, and we won't be able to respond to requests made there._

## Reporting Security Vulnerabilities

If you've found a vulnerability or a potential vulnerability in the Lyft Web SDK please
 let us know at security@lyft.com. We'll send a confirmation email to acknowledge your
 report, and we'll send an additional email when we've identified the issue positively or
 negatively.
