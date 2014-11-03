/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// USEFUL FOR DEBUGGING
// 
// EmberApp.prototype.styles = function() {
//   var addonTrees = this.addonTreesFor('styles');
//   var external = this._processedExternalTree();
//   var styles = pickFiles(this.trees.styles, {
//     srcDir: '/',
//     destDir: '/app/styles'
//   });
//
//   var trees = [external].concat(addonTrees);
//   trees.push(styles);
//
//   var stylesAndVendor = mergeTrees(trees, {
//     description: 'TreeMerger (stylesAndVendor)'
//   });
//
//   console.info('---[ addonTrees ]---');
//   console.info(addonTrees);
//   console.info('---[ styles ]---');
//   console.info(styles);
//   console.info('---[ trees ]---');
//   console.info(trees);
//   console.info('---[ stylesAndVendor ]---');
//   console.info(stylesAndVendor);
//
//   throw new Error('halt');
//
// };

module.exports = app.toTree();
