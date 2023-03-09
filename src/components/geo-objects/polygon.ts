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

export type PolygonOptions = {
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
  iconOffset?: number[]
  iconShape?: any
  interactiveZIndex?: boolean
  interactivityModel?: string
  opacity?: number
  openBalloonOnClick?: boolean
  openEmptyBalloon?: boolean
  openEmptyHint?: boolean
  openHintOnHover?: boolean
  pane?: string
  pointOverlay?: string | Function
  syncOverlayInit?: boolean
  strokeWidth?: number
  useMapMarginInDragging?: boolean
  visible?: boolean
  zIndex?: number
  zIndexActive?: number
  zIndexDrag?: number
  zIndexHover?: number
}

export type PolygonContents = {
  iconContent?: string
  iconCaption?: string
  hintContent?: string
  balloonContent?: string
  balloonContentHeader?: string
  balloonContentBody?: string
  balloonContentFooter?: string
}

export type PolygonProperties = {
  geometry: number[][][]
  properties: PolygonContents | undefined | null
  options: PolygonOptions | undefined | null
}

export type PolygonMethods = {
  getMap: () => any
  getOverlay: () => Promise<any>
  getOverlaySync: () => any
  getParent: () => any
  setParent: (parent: any) => Promise<any>
}

export type PolygonData = {
  geoObjectKey: Ref<number | undefined>
  maps: any
  stateManager: IMapGeoObjectsStateManager | undefined
} & PolygonMethods

function getGeoObject(
  maps: any,
  geometry: PolygonProperties['geometry'],
  properties: PolygonProperties['properties'],
  options: PolygonProperties['options']
) {
  return new maps.value.Polygon(geometry, properties, options)
}

export const YPolygon = defineComponent({
  name: 'y-polygon',
  setup($props: PolygonProperties): PolygonData {
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
      type: Array as PropType<PolygonProperties['geometry']>,
      required: true,
      validator(value: number[][]) {
        if (value.length === 0) {
          return false
        }
        for (const items of value) {
          if (!Array.isArray(items)) {
            return false
          }
          for (const points of items) {
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
        }
        return true
      }
    },
    properties: {
      type: Object as PropType<PolygonProperties['properties']>,
      default() {
        return {}
      },
      validator(value: PolygonContents) {
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
      type: Object as PropType<PolygonProperties['options']>,
      default(): PolygonOptions {
        return {} as PolygonOptions
      }
    }
  }
})
