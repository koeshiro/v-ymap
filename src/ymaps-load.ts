let mapsObject = null;
let importPromise: Promise<any> | null = null;

export const load = (src:string = '//api-maps.yandex.ru/2.1/?lang=en_RU') => {
  if(importPromise !== null) {
    return importPromise;
  }
  importPromise = import(src);
  return importPromise;
}

export type Options = {
  YMAPS_KEY: string;
  YMAPS_LANG: string;
  YMAPS_VERSION?: string;
  YMAPS_LOAD_BY_REQUIRE?: boolean;
}
/**
 * @param options
 * @param options.YMAPS_KEY ключ яндекс карт
 * @param options.YMAPS_LANG версия языка
 * @param options.YMAPS_VERSION версия яндекс карт
 * @param options.YMAPS_LOAD_BY_REQUIRE
 */
export default async function (options:Options):Promise<any> {
  if (mapsObject === null) {
    let o = {
      YMAPS_LOAD_BY_REQUIRE: true,
      YMAPS_VERSION:'2.1',
      ...options
    }
    mapsObject = await load(
      `https://api-maps.yandex.ru/${o.YMAPS_VERSION}/?${
        'YMAPS_KEY' in o && o.YMAPS_KEY.length > 0 ? `apiKey=${o.YMAPS_KEY}&` : ''
      }${
        'YMAPS_LANG' in o ? `lang=${o.YMAPS_LANG}` : ''
      }${
        'YMAPS_LOAD_BY_REQUIRE' in o && o.YMAPS_LOAD_BY_REQUIRE === true ? '&loadByRequire=1' : ''
      }`
    )
  }
  return mapsObject;
}
