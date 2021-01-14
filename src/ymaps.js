import ymaps from "ymaps"
let mapsObject = null;
/**
 * @param {Object} options
 * @param {String} options.YMAPS_KEY - ключ яндекс карт
 * @param {String} options.YMAPS_LANG - версия языка
 * @param {String} options.YMAPS_VERSION - версия яндекс карт
 */
export default async function (options) {
  if (mapsObject === null) {
    let o = {
      YMAPS_VERSION:'2.1',
      ...options
    }
    mapsObject = await ymaps.load(
      `https://api-maps.yandex.ru/${o.YMAPS_VERSION}/?${'YMAPS_KEY' in o ? `apiKey=${o.YMAPS_KEY}&` : ''}${'YMAPS_LANG' in o ? `lang=${o.YMAPS_LANG}` : ''}`
    )
  }
  return mapsObject;
}
