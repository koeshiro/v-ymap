import {
  defineComponent,
  type PropType,
  ref,
  shallowRef,
  h,
  onMounted,
  watch,
  nextTick,
  type Ref
} from 'vue'
import { type MapLoaderOptions, YMapsLoad } from '../ymaps-load'
import { provideMap, provideMaps, provideMapGeoObjectState } from '../provider'
import '../index.css'
import {
  type GeoObjectState,
  type IMapGeoObjectsStateManager,
  MapGeoObjectsStateManager
} from '../map-geo-objects-state-manager'
import { ComponentsWithChildren, VYMap } from '@/constants'

export type MapTypes = 'yandex#map' | 'yandex#satellite' | 'yandex#hybrid'

export type MapOptions = {
  autoFitToViewport?: string
  avoidFractionalZoom?: boolean
  exitFullscreenByEsc?: boolean
  fullscreenZIndex?: number
  mapAutoFocus?: boolean
  maxAnimationZoomDifference?: number
  maxZoom?: number
  minZoom?: number
  nativeFullscreen?: boolean
  projection?: any
  restrictMapArea?: boolean | number[][]
  suppressMapOpenBlock?: boolean
  suppressObsoleteBrowserNotifier?: boolean
  yandexMapAutoSwitch?: boolean
  yandexMapDisablePoiInteractivity?: boolean
}

export type MapProperties = MapLoaderOptions & {
  center: number[]
  zoom: number
  behaviors?: string[]
  controls?: string[]
  margin?: number[]
  type?: string
  options?: MapOptions
}

export type MapPanToOption = {
  checkZoomRange?: boolean
  delay?: number
  duration?: number
  flying?: boolean
  safe?: boolean
  timingFunction?: string
  useMapMargin?: boolean
}

export type MapBoundOption = {
  checkZoomRange?: boolean
  duration?: number
  preciseZoom?: boolean
  timingFunction?: string
  useMapMargin?: boolean
  zoomMargin?: number | number[]
}

export type MapCenterOption = {
  checkZoomRange?: boolean
  duration?: number
  timingFunction?: string
  useMapMargin?: boolean
}

export type MapGlobalPixelCenterOption = {
  checkZoomRange?: boolean
  duration?: number
  timingFunction?: string
  useMapMargin?: boolean
}

export type MapZoom = {
  checkZoomRange?: boolean
  duration?: number
  useMapMargin?: boolean
}

export type MapMethods = {
  getBounds: (options?: { useMapMargin: boolean }) => number[][]
  getCenter: (options?: { useMapMargin: boolean }) => number[]
  getGlobalPixelCenter: (options?: { useMapMargin: boolean }) => number[]
  getPanoramaManager: () => Promise<any>
  getType: () => string
  getZoom: () => number
  panTo: (center: number[] | any[], options?: MapPanToOption) => Promise<any>
  setBounds: (bounds: number[][], options?: MapBoundOption) => Promise<any>
  setCenter: (center: number[], zoom?: number, options?: MapCenterOption) => Promise<any>
  setGlobalPixelCenter: (
    globalPixelCenter: number[],
    zoom?: number,
    options?: MapGlobalPixelCenterOption
  ) => Promise<any>
  setType: (type: MapTypes | any, options?: { checkZoomRange: boolean }) => Promise<any>
  setZoom: (zoom: number, options?: MapZoom) => Promise<any>
}

export type MapData = {
  maps: any
  map: any
  dmap: Ref<HTMLDivElement | null>
  stateManager: IMapGeoObjectsStateManager
}

export type MapSetup = MapData & MapMethods

function processGeoObjects(stateManager: IMapGeoObjectsStateManager, map: any): void {
  const list = stateManager.getGeoObjects()
  const defaultParentGeoObjectState = map.value.geoObjects
  map.value.geoObjects.removeAll()
  let currentParentGeoObjectState: GeoObjectState | null = null
  let currentParentGeoObject: any | null = defaultParentGeoObjectState
  list.forEach((getGeoObject: GeoObjectState) => {
    if (ComponentsWithChildren.includes(getGeoObject.parentType)) {
      currentParentGeoObjectState = getGeoObject
      currentParentGeoObject = getGeoObject.geoObject
    } else if (getGeoObject.parentType === VYMap) {
      currentParentGeoObjectState = null
      currentParentGeoObject = defaultParentGeoObjectState
    }
    currentParentGeoObject.add(getGeoObject.geoObject)
  })
}

export const YMap = defineComponent({
  name: VYMap,
  render() {
    return h('div', { class: 'yandex-maps_container' }, [
      h(
        'div',
        {
          class: 'yandex-maps',
          ref: 'dmap'
        },
        h(
          'div',
          {
            class: 'yandex-maps_slots'
          },
          this.map && this.$slots.default ? this.$slots.default() : []
        )
      )
    ])
  },
  props: {
    YMAPS_KEY: {
      type: String,
      default: ''
    },
    YMAPS_LANG: {
      type: String,
      default: 'ru_RU'
    },
    YMAPS_VERSION: {
      type: String,
      default: '2.1'
    },
    YMAPS_LOAD_BY_REQUIRE: {
      type: Boolean,
      default: true
    },
    center: {
      type: Array as PropType<MapProperties['center']>,
      required: true,
      validator(value: number[]) {
        return value.length === 2 && !Number.isNaN(value[0]) && !Number.isNaN(value[1])
      }
    },
    zoom: {
      type: Number,
      required: true
    },
    behaviors: {
      type: Array as PropType<MapProperties['behaviors']>,
      default() {
        return ['default']
      }
    },
    controls: {
      type: Array as PropType<MapProperties['controls']>,
      default() {
        return ['default']
      }
    },
    margin: {
      type: Array as PropType<MapProperties['margin']>,
      default() {
        return []
      },
      validator(value: number[]) {
        for (const v of value) {
          if (Number.isNaN(v)) {
            return false
          }
        }
        return true
      }
    },
    type: {
      type: String as PropType<MapProperties['type']>,
      default: 'yandex#map' as MapTypes,
      validator(value: MapTypes) {
        return ['yandex#map', 'yandex#satellite', 'yandex#hybrid'].includes(value)
      }
    },
    options: {
      type: Object as PropType<MapProperties['options']>,
      default() {
        return {}
      }
    }
  },
  expose: [
    'dmap',
    'map',
    'getCenter',
    'getBounds',
    'getGlobalPixelCenter',
    'getPanoramaManager',
    'getType',
    'getZoom',
    'panTo',
    'setBounds',
    'setCenter',
    'setGlobalPixelCenter',
    'setType',
    'setZoom'
  ],
  setup($props: MapProperties, context): MapSetup {
    const maps = shallowRef<any>(null)
    const map = shallowRef<any>(null)
    const dmap = ref<HTMLDivElement | null>(null)
    const stateManager = new MapGeoObjectsStateManager()
    const state = stateManager.getGeoObjectsRef()
    onMounted(async () => {
      maps.value = await YMapsLoad({
        YMAPS_KEY: $props.YMAPS_KEY,
        YMAPS_LANG: $props.YMAPS_LANG,
        YMAPS_VERSION: $props.YMAPS_VERSION,
        YMAPS_LOAD_BY_REQUIRE: $props.YMAPS_LOAD_BY_REQUIRE
      })
      map.value = new maps.value.Map(
        dmap.value,
        {
          center: $props.center,
          zoom: $props.zoom,
          behaviors: $props.behaviors,
          controls: $props.controls,
          margin: $props.margin,
          type: $props.type
        },
        {
          ...$props.options
        }
      )
      nextTick(() => {
        processGeoObjects(stateManager, map)
      })
    })
    watch(state, () => {
      nextTick(() => {
        processGeoObjects(stateManager, map)
      })
    })
    watch(
      () => context.slots,
      () => {
        nextTick(() => {
          processGeoObjects(stateManager, map)
        })
      }
    )
    provideMapGeoObjectState(stateManager)
    provideMaps(maps)
    provideMap(map)
    return {
      maps,
      map,
      dmap,
      stateManager,
      getCenter: (options?: { useMapMargin: boolean }): number[] => {
        return map.value?.getCenter(options)
      },
      getBounds: (options?: { useMapMargin: boolean }): number[][] => {
        return map.value?.getBounds(options)
      },
      getGlobalPixelCenter: (options?: { useMapMargin: boolean }): number[] => {
        return map.value?.getGlobalPixelCenter(options)
      },
      getPanoramaManager: (): Promise<any> => {
        return map.value?.getPanoramaManager()
      },
      getType: (): string => {
        return map.value?.getType()
      },
      getZoom: (): number => {
        return map.value?.getZoom()
      },
      panTo: (center: number[] | any[], options?: MapPanToOption): Promise<any> => {
        return map.value?.panTo(center, options)
      },
      setBounds: (bounds: number[][], options?: MapBoundOption): Promise<any> => {
        return map.value?.setBounds(bounds, options)
      },
      setCenter: (center: number[], zoom?: number, options?: MapCenterOption): Promise<any> => {
        return map.value?.setCenter(center, zoom, options)
      },
      setGlobalPixelCenter: (
        globalPixelCenter: number[],
        zoom?: number,
        options?: MapGlobalPixelCenterOption
      ): Promise<any> => {
        return map.value?.setGlobalPixelCenter(globalPixelCenter, zoom, options)
      },
      setType: (type: MapTypes | any, options?: { checkZoomRange: boolean }): Promise<any> => {
        return map.value?.setType(type, options)
      },
      setZoom: (zoom: number, options?: MapZoom): Promise<any> => {
        return map.value?.setZoom(zoom, options)
      }
    }
  }
})
