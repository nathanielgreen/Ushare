var path = Npm.require('path');
var fs = Npm.require('fs');

Package.describe({
  summary: 'Contains all your npm dependencies',
  version: '1.2.0',
  name: 'npm-container'
});

var packagesJsonFile = path.resolve('./packages.json');
try {
  var fileContent = fs.readFileSync(packagesJsonFile);
  var packages = JSON.parse(fileContent.toString());
  Npm.depends({
    "pusher-client": "0.2.3"
  });
} catch (ex) {
  console.error('ERROR: packages.json parsing error [ ' + ex.message + ' ]');
}

// Adding the app's packages.json as a used file for this package will get
// Meteor to watch it and reload this package when it changes
Package.onUse(function(api) {
  api.addFiles('index.js', 'server');
  api.use(['cosmos:browserify@0.7.0'], 'client');
  // api.addFiles(['../../app.browserify.js', '.npm/package/node_modules/pusher-client/lib/pusher.js'], 'client');
  if (api.addAssets) {
    api.addAssets('../../packages.json', 'server');
  } else {
    api.addFiles('../../packages.json', 'server', {
      isAsset: true
    });
  }
  api.export('pusher', 'client');
});