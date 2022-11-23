let mapsObject = null;
let importPromise: Promise<any> | null = null;

async function importMap(src: string, ns?: string) {
  const key = ns ?? 'ymaps';
  return new Promise((resolve, reject) => {
    const scriptElement = document.createElement('script');
    scriptElement.onload = resolve;
    scriptElement.onerror = reject;
    scriptElement.type = 'text/javascript';
    scriptElement.src = src;
    document.body.appendChild(scriptElement);
  }).then(() => {
    return new Promise(resolve => (window||global)[key].ready(resolve));
  });
}

const load = (src: string = '//api-maps.yandex.ru/2.1/?lang=en_RU', ns?: string) => {
  if(importPromise !== null) {
    return importPromise;
  }
  importPromise = importMap(src, ns);
  return importPromise;
}

export type MapLoaderOptions = {
  YMAPS_KEY: string;
  YMAPS_LANG: string;
  YMAPS_VERSION?: string;
  YMAPS_LOAD_BY_REQUIRE?: boolean;
  YMAPS_NS?: string;
};

export const YMapsLoad = async function (options: MapLoaderOptions): Promise<any> {
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
      }`,
        o.YMAPS_NS ?? undefined
    )
  }
  return mapsObject;
}
