// dependencies
var docdown = require('docdown');
var fs = require('fs');
var path = require('path');

// constants
var GITHUB_URL = 'https://github.com/lyft/lyft-web-button';

/**
 * Returns a configuration for consumption by docdown.
 * @memberOf doc
 * @category doc
 * @param {string} name Local file name minus the extension.
 * @param {string} title Title to be shown in the generated markdown.
 * @param {string} type Type of the file. One of [component, dist, service].
 * @returns {Object} Docdown configuration.
 */
function getDocdownConfiguration(name, title, type) {
  switch (type) {
  case 'component':
    return {
      // for docdown:
      path: path.join(__dirname, '../src/components/' + name + '/index.js'),
      properties: 'categories',
      style: 'github',
      title: title,
      url: GITHUB_URL + '/blob/master/src/components/' + name + '/index.js',
      // for fs.writeFileSync:
      __writePath: path.join(__dirname, './src/components/' + name + '/index.md')
    };
  case 'dist':
    return {
      // for docdown:
      path: path.join(__dirname, '../dist/' + name + '.js'),
      properties: 'categories',
      style: 'github',
      title: title,
      url: GITHUB_URL + '/blob/master/dist/' + name + '.js',
      // for fs.writeFileSync:
      __writePath: path.join(__dirname, './dist/' + name + '.md')
    };
  case 'service':
    return {
      // for docdown:
      path: path.join(__dirname, '../src/services/' + name + '.js'),
      properties: 'categories',
      style: 'github',
      title: title,
      url: GITHUB_URL + '/blob/master/src/services/' + name + '.js',
      // for fs.writeFileSync:
      __writePath: path.join(__dirname, './src/services/' + name + '.md')
    };
  default:
    break;
  }
}

// configurations
var configurations = [
  getDocdownConfiguration('lyftWebButton', 'Lyft Web Button Distributable', 'dist'),
  getDocdownConfiguration('lyftWebButton', 'Lyft Web Button Component', 'component'),
  getDocdownConfiguration('lyftWebModal', 'Lyft Web Modal Component', 'component'),
  getDocdownConfiguration('api', 'API Service', 'service'),
  getDocdownConfiguration('jsonp', 'JSONP Service', 'service'),
  getDocdownConfiguration('selector', 'Selector Service', 'service')
];

// generate markdown data and write files
for (var i = 0, l = configurations.length; i < l; i++) {
  // docdown reads the file synchronously...
  var markdownData = docdown(configurations[i]);
  // ...and this writes the file synchronously
  fs.writeFileSync(configurations[i].__writePath, markdownData, function (err) {
    if (err) {throw err;}
  });
}
