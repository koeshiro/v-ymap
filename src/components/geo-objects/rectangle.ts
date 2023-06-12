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

export type RectangleContents = {
  iconContent?: string
  iconCaption?: string
  hintContent?: string
  balloonContent?: string
  balloonContentHeader?: string
  balloonContentBody?: string
  balloonContentFooter?: string
}

export type RectangleOptions = {
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

export type RectangleProperties = {
  geometry: number[][]
  properties: RectangleContents
  options: RectangleOptions
}

export type RectangleMethod = {
  getMap: () => any
  getOverlay: () => Promise<any>
  getOverlaySync: () => any
  getParent: () => any
  setParent: (parent: any) => Promise<any>
}

export type RectangleData = {
  geoObjectKey: Ref<number | undefined>
  maps: any
  stateManager: IMapGeoObjectsStateManager | undefined
} & RectangleMethod

function getGeoObject(
  maps: any,
  geometry: number[][],
  properties: RectangleContents,
  options: RectangleOptions
) {
  return new maps.value.Rectangle(geometry, properties, options)
}

export const YRectangle = defineComponent({
  name: 'y-rectangle',
  setup($props: RectangleProperties): RectangleData {
    const instance = getCurrentInstance()
    const maps = injectMaps()
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
          getGeoObject(maps, $props.geometry, $props.properties, $props.options)
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
      type: Array as PropType<RectangleProperties['geometry']>,
      required: true,
      validator(value: number[][]) {
        if (value.length === 0) {
          return false
        }
        for (const points of value) {
          if (!Array.isArray(points)) {
            return false
          }
          if (
            points.length !== 2 ||
            (points.length === 2 && (Number.isNaN(points[0]) || Number.isNaN(points[1])))
          ) {
            return false
          }
        }
        return true
      }
    },
    properties: {
      type: Object as PropType<RectangleProperties['properties']>,
      default() {
        return {}
      },
      validator(value: RectangleContents) {
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
      type: Object as PropType<RectangleProperties['options']>,
      default() {
        return {}
      }
    }
  },
  methods: {}
})
