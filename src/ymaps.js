import ymaps from "ymaps"
let mapsObject = null;
/**
 * @param {Object} options
 * @param {String} options.YMAPS_KEY - ключ яндекс карт
 * @param {String} options.YMAPS_LANG - версия языка
 * @param {String} options.YMAPS_VERSION - версия яндекс карт
 * @param {Boolean} options.YMAPS_LOAD_BY_REQUIRE
 */
export default async function (options) {
  if (mapsObject === null) {
    let o = {
      YMAPS_LOAD_BY_REQUIRE: true,
      YMAPS_VERSION:'2.1',
      ...options
    }
    mapsObject = await ymaps.load(
      `https://api-maps.yandex.ru/${o.YMAPS_VERSION}/?${'YMAPS_KEY' in o && o.YMAPS_KEY.length > 0 ? `apiKey=${o.YMAPS_KEY}&` : ''}${'YMAPS_LANG' in o ? `lang=${o.YMAPS_LANG}` : ''}${'YMAPS_LOAD_BY_REQUIRE' in o && o.YMAPS_LOAD_BY_REQUIRE === true ? '&loadByRequire=1' : ''}`
    )
  }
  return mapsObject;
}
