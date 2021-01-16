var ymaps$1 = {
  load: function load() {
    var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '//api-maps.yandex.ru/2.1/?lang=en_RU';

    var getNsParamValue = function getNsParamValue() {
      var results = src.match(/[\\?&]ns=([^&#]*)/);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    if (!this.promise) {
      this.promise = new Promise(function (resolve, reject) {
        var scriptElement = document.createElement('script');
        scriptElement.onload = resolve;
        scriptElement.onerror = reject;
        scriptElement.type = 'text/javascript';
        scriptElement.src = src;
        document.body.appendChild(scriptElement);
      }).then(function () {
        var ns = getNsParamValue();

        if (ns && ns !== 'ymaps') {
          (0, eval)("var ymaps = ".concat(ns, ";"));
        }

        return new Promise(function (resolve) {
          return ymaps.ready(resolve);
        });
      });
    }

    return this.promise;
  }
};

let mapsObject = null;
/**
 * @param {Object} options
 * @param {String} options.YMAPS_KEY - ключ яндекс карт
 * @param {String} options.YMAPS_LANG - версия языка
 * @param {String} options.YMAPS_VERSION - версия яндекс карт
 */
async function ymaps$2 (options) {
  if (mapsObject === null) {
    let o = {
      YMAPS_VERSION:'2.1',
      ...options
    };
    mapsObject = await ymaps$1.load(
      `https://api-maps.yandex.ru/${o.YMAPS_VERSION}/?${'YMAPS_KEY' in o ? `apiKey=${o.YMAPS_KEY}&` : ''}${'YMAPS_LANG' in o ? `lang=${o.YMAPS_LANG}` : ''}`
    );
  }
  return mapsObject;
}

/**
 * @param {Vue} Vue
 * @param {Object} options
 * @param {String} options.YMAPS_KEY - ключ яндекс карт
 * @param {String} options.YMAPS_LANG - версия языка
 * @param {String} options.YMAPS_VERSION - версия яндекс карт
 */
var index = {
    async install(Vue, options={}){
        await ymaps$2(options);
        Vue.component('v-ymap', ()=> import('./index-ef44c625.js'));
        Vue.component('v-ymap-collection', ()=> import('./collection-ad69d4ba.js'));
        Vue.component('v-ymap-clusterer', ()=> import('./clusterer-a94eb6d6.js'));
        Vue.component('v-ymap-circle', ()=> import('./circle-f765bfbe.js'));
        Vue.component('v-ymap-placemark', ()=> import('./placemark-75f14e85.js'));
        Vue.component('v-ymap-polygon', ()=> import('./polygon-dac46d89.js'));
        Vue.component('v-ymap-polyline', ()=> import('./polyline-6dea5074.js'));
        Vue.component('v-ymap-rectangle', ()=> import('./rectangle-1674aabc.js'));
        Vue.component('v-ymap-route', ()=> import('./route-31a3cbbd.js'));
    }
};

export { index as i, ymaps$2 as y };
