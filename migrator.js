var Blueprint = require('ember-cli/lib/models/blueprint');
var merge     = require('lodash-node/modern/object/merge');
var path      = require('path');

function migrator(blueprintName) {
  var coffee     = require('ember-cli-coffeescript/blueprints/' + blueprintName);
  var coffeePath = path.dirname(require.resolve('ember-cli-coffeescript/blueprints/' + blueprintName));
  var es6        = require('ember-cli/blueprints/' + blueprintName);
  var es6Path    = path.dirname(require.resolve('ember-cli/blueprints/' + blueprintName));

  function switchable(name) {
    return function(options) {
      var fun;

      if (options.javascript) {
        merge(this, es6);
        this.path = es6Path;
        fun = es6[name];
      } else {
        merge(this, coffee);
        this.path = coffeePath;
        fun = coffee[name];
      }

      fun = fun || Blueprint.prototype[name];

      return fun.apply(this, arguments);
    }
  }

  return {
    options: [{ name: 'javascript', type: Boolean, aliases: ['j'] }],

    install: switchable('install'),

    uninstall: switchable('uninstall'),

    lookupBlueprint: function(name) {
      var blueprintPath = path.dirname(require.resolve('ember-cli/blueprints/' + name));
      return Blueprint.load(blueprintPath);
    }
  };
}

module.exports = migrator;
