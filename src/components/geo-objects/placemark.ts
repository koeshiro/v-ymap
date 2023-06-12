import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  type PropType,
  type Ref,
  ref,
  watch
} from 'vue'
import { injectMapGeoObjectState, injectMaps } from '../../provider'
import type { IMapGeoObjectsStateManager } from '../../map-geo-objects-state-manager'

export type PlacemarkOptions = {
  cursor?: string
  draggable?: boolean
  fill?: boolean
  fillColor?: string
  fillImageHref?: string
  fillMethod?: string
  fillOpacity?: number
  hasBalloon?: boolean
  hasHint?: boolean
  hideIconOnBalloonOpen?: boolean
  iconOffset: number[]
  iconShape: any
  interactiveZIndex?: boolean
  interactivityModel?: string
  opacity?: number
  openBalloonOnClick?: boolean
  openEmptyBalloon?: boolean
  openEmptyHint?: boolean
  openHintOnHover?: boolean
  pane?: string
  pointOverlay: string | Function
  syncOverlayInit?: boolean
  useMapMarginInDragging?: boolean
  visible?: boolean
  zIndex?: number
  zIndexActive?: number
  zIndexDrag?: number
  zIndexHover?: number
}

export type PlacemarkContents = {
  iconContent?: string
  iconCaption?: string
  hintContent?: string
  balloonContent?: string
  balloonContentHeader?: string
  balloonContentBody?: string
  balloonContentFooter?: string
}

export type PlacemarkProperties = {
  geometry: number[]
  properties: PlacemarkContents | undefined | null
  options: PlacemarkOptions | undefined | null
}

export type PlacemarkMethods = {
  getGeoObject: (maps: any) => any
  getMap: () => any
  getOverlay: () => Promise<any>
  getOverlaySync: () => any
  getParent: () => any
  setParent: (parent: any) => Promise<any>
}

export type PlacemarkData = {
  geoObjectKey: Ref<number | undefined>
  maps: any
  stateManager: IMapGeoObjectsStateManager | undefined
} & PlacemarkMethods

function getGeoObject(
  maps: any,
  geometry: PlacemarkProperties['geometry'],
  properties: PlacemarkProperties['properties'],
  options: PlacemarkProperties['options']
) {
  return new maps.value.Placemark(geometry, properties, options)
}

export const YPlacemark = defineComponent({
  name: 'y-placemark',
  setup($props: PlacemarkProperties): PlacemarkData {
    const maps = injectMaps()
    const instance = getCurrentInstance()
    const stateManager = injectMapGeoObjectState()
    const geoObjectKey = ref(instance?.uid)
    onMounted(() => {
      if (instance?.uid && instance?.parent?.type?.name) {
        stateManager?.setGeoObject(
          instance.uid,
          instance.parent.type?.name,
          getGeoObject(maps, $props.geometry, $props.properties, $props.options)
        )
      }
    })
    watch($props, (props) => {
      if (instance?.uid && instance?.parent?.type?.name) {
        stateManager?.setGeoObject(
          instance.uid,
          instance.parent.type?.name,
          getGeoObject(maps, props.geometry, props.properties, props.options)
        )
      }
    })
    return {
      geoObjectKey,
      maps,
      stateManager,
      getGeoObject() {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1)
      },
      getMap(): any {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).getMap()
      },
      getOverlay(): Promise<any> {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).getOverlay()
      },
      getOverlaySync(): any {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).getOverlaySync()
      },
      getParent(): any {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).getParent()
      },
      setParent(parent): Promise<any> {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).setParent(parent)
      }
    }
  },
  props: {
    geometry: {
      type: Array as PropType<PlacemarkProperties['geometry']>,
      required: true,
      validator(value: number[]) {
        return value.length === 2 && !Number.isNaN(value[0]) && !Number.isNaN(value[1])
      }
    },
    properties: {
      type: Object as PropType<PlacemarkProperties['properties']>,
      default() {
        return {}
      },
      validator(value: PlacemarkContents) {
        return Object.keys(value).length > 0
          ? 'iconContent' in value ||
              'iconCaption' in value ||
              'hintContent' in value ||
              'balloonContent' in value ||
              ('balloonContentHeader' in value &&
                'balloonContentBody' in value &&
                'balloonContentFooter' in value)
          : true
      }
    },
    options: {
      type: Object as PropType<PlacemarkProperties['options']>,
      default(): PlacemarkOptions {
        return {} as PlacemarkOptions
      }
    }
  }
})
