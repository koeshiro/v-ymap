'use strict';

/**
 * @param {Vue} Vue
 */

var index = {
  install: function install(Vue) {
    Vue.component('v-ymap', function () {
      return Promise.resolve().then(function () { return require('./index-8af2a00c.js'); });
    });
    Vue.component('v-ymap-collection', function () {
      return Promise.resolve().then(function () { return require('./collection-bad660ec.js'); });
    });
    Vue.component('v-ymap-clusterer', function () {
      return Promise.resolve().then(function () { return require('./clusterer-5d71cf23.js'); });
    });
    Vue.component('v-ymap-circle', function () {
      return Promise.resolve().then(function () { return require('./circle-34676e26.js'); });
    });
    Vue.component('v-ymap-placemark', function () {
      return Promise.resolve().then(function () { return require('./placemark-87800f47.js'); });
    });
    Vue.component('v-ymap-polygon', function () {
      return Promise.resolve().then(function () { return require('./polygon-4d0e113d.js'); });
    });
    Vue.component('v-ymap-polyline', function () {
      return Promise.resolve().then(function () { return require('./polyline-e4fb5b1f.js'); });
    });
    Vue.component('v-ymap-rectangle', function () {
      return Promise.resolve().then(function () { return require('./rectangle-5b5052fe.js'); });
    });
    Vue.component('v-ymap-route', function () {
      return Promise.resolve().then(function () { return require('./route-01f45d2f.js'); });
    });
  }
};

module.exports = index;
