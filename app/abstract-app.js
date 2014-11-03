import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import { current as device } from './device';

Ember.MODEL_FACTORY_INJECTIONS = true;

var AbstractApp = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,

  device: device
});

loadInitializers(AbstractApp, config.modulePrefix);

export default AbstractApp;
