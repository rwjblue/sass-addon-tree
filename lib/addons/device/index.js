/* global require,module,process */
var path = require('path');
var fs = require('fs');
var pickFiles = require('broccoli-static-compiler');

var DESKTOP = 'desktop';
var MOBILE = 'mobile';

var DEFAULT_DEVICE = DESKTOP;
var VALID_DEVICES = [DESKTOP, MOBILE];

var contentFor = {
  desktop: {
    head: [
      "<meta name='viewport' content='width=device-width, initial-scale=1'>"
    ]
  },
  mobile: {
    head: [
      "<meta name='viewport' content='initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'>"
    ]
  }
};

// Device addon
function Device(project) {
  this.project = project;
  this.name = 'Device-tailored Build';
}

// This addon is used to merge in the desktop or mobile specific files
// on top of the 'base' tree (inside 'app'). If possible we'd like to rename client/app to 'shared',
// but that isn't easy with the current version of ember-cli.
//
// Name may be 'app', 'templates', 'addon', 'vendor', 'test-support', 'styles'
Device.prototype.treeFor = function treeFor(name) {
  var device = this.app.device;

  var source;
  var destination;
  if (name === 'templates') {
    // templates are nested within app
    source = path.join(device, 'app', name);
  } else {
    // map to device dir, e.g. 'desktop/app', or 'mobile/vendor'
    source = path.join(device, name);
  }

  if (name === 'styles') {
    destination = '/app/styles';
  } else {
    destination = '/';
  }

  console.log('treeFor '+name+' : '+source+' : '+destination);

  if (fs.existsSync(source)) {
    return pickFiles(source, {
      srcDir: '/',
      files: ['**/*.*'],
      destDir: destination
    });
  }

  return undefined;
};

Device.prototype.included = function included(app) {
  var device = process.env.DEVICE || DEFAULT_DEVICE;
  if (VALID_DEVICES.indexOf(device) === -1) { throw new Error('Unknown device `' + device + '`'); }

  app.device = device; // 'public', i.e. accessed outside this addon
  this.app = app;
};

Device.prototype.contentFor = function(type, _config) {
  var html = '';
  var device = this.app.device;

  var content = contentFor[device];
  if (content) {
    var typeContent = content[type];
    if (typeContent) {
      html = typeContent.join("\n");
    }
  }

  return html;
};

module.exports = Device;
