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

export type CircleMethod = {
  getMap: () => any
  getOverlay: () => Promise<any>
  getOverlaySync: () => any
  getParent: () => any
  setParent: (parent: any) => Promise<any>
}

export type CircleContents = {
  iconContent?: string
  iconCaption?: string
  hintContent?: string
  balloonContent?: string
  balloonContentHeader?: string
  balloonContentBody?: string
  balloonContentFooter?: string
}

export type CircleOptions = {
  circleOverlay?: string | Function
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
  interactiveZIndex?: boolean
  interactivityModel?: string
  opacity?: number
  openBalloonOnClick?: boolean
  openEmptyBalloon?: boolean
  openEmptyHint?: boolean
  openHintOnHover?: boolean
  outline?: boolean
  pane?: string
  strokeColor?: string | string[]
  strokeOpacity?: number | number[]
  strokeStyle?:
    | string
    | string[]
    | { style: string; offset: number }
    | { style: string; offset: number }[]
  strokeWidth?: number | number[]
  syncOverlayInit?: boolean
  useMapMarginInDragging?: boolean
  visible?: boolean
  zIndex?: number
  zIndexActive?: number
  zIndexDrag?: number
  zIndexHover?: number
}

export type CircleProperties = {
  geometry: [number[], number]
  properties: CircleContents
  options: CircleOptions
}

export type CircleData = {
  geoObjectKey: Ref<number | undefined>
  maps: any
  stateManager: IMapGeoObjectsStateManager | undefined
}

export type CircleSetup = CircleData & CircleMethod

function getGeoObject(
  maps: any,
  geometry: [number[], number],
  properties: CircleContents,
  options: CircleOptions
) {
  return new maps.value.Circle(geometry, properties, options)
}

export const YCircle = defineComponent({
  name: 'y-circle',
  setup($props: CircleProperties): CircleSetup {
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
      type: Array as unknown as PropType<CircleProperties['geometry']>,
      required: true,
      validator(value: number[][]) {
        return (
          value.length === 2 &&
          Array.isArray(value[0]) &&
          !Number.isNaN(value[0][1]) &&
          !Number.isNaN(value[0][0]) &&
          !Number.isNaN(value[1])
        )
      }
    },
    properties: {
      type: Object as PropType<CircleProperties['properties']>,
      default(): CircleContents {
        return {}
      },
      validator(value: CircleContents) {
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
      type: Object as PropType<CircleProperties['options']>,
      default() {
        return {}
      }
    }
  }
})
