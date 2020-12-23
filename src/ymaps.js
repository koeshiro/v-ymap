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
    mapsObject = await ymaps.load(
      `https://api-maps.yandex.ru/${options.YMAPS_VERSION}/?apikey=${options.YMAPS_KEY}&lang=${options.YMAPS_LANG}`
    )
  }
  return mapsObject;
}
