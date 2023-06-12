import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  type PropType,
  ref,
  type Ref,
  watch,
  toRef
} from 'vue'
import { injectMapGeoObjectState, injectMaps } from '../../provider'
import type { IMapGeoObjectsStateManager } from '../../map-geo-objects-state-manager'

export type RoutePoint =
  | string
  | {
      type: string
      point: string | number[]
    }

export type RouteParams = {
  avoidTrafficJams?: boolean
  boundedBy?: number[][]
  mapStateAutoApply?: boolean
  multiRoute?: boolean
  reverseGeocoding?: boolean
  routingMode?: string
  searchCoordOrder?: string
  strictBounds?: boolean
  useMapMargin?: boolean
  viaIndexes?: number
  zoomMargin?: number | number[]
}

export type RouteProperties = {
  points: RoutePoint[]
  params: RouteParams
}

export type RouteMap = {
  geoObjectKey: Ref<number | undefined>
  maps: any
  stateManager: IMapGeoObjectsStateManager | undefined
}
async function getGeoObject(maps: any, points: RoutePoint[], params: RouteParams): Promise<any> {
  return await maps.value.route(points, params)
}

export const YRoute = defineComponent({
  name: 'y-route',
  setup($props: RouteProperties): RouteMap {
    const maps = injectMaps()
    const stateManager = injectMapGeoObjectState()
    const instance = getCurrentInstance()
    const geoObjectKey = ref(instance?.uid)
    onMounted(async () => {
      if (instance?.uid && instance?.parent?.type?.name) {
        stateManager?.setGeoObject(
          instance.uid,
          instance.parent.type?.name,
          await getGeoObject(maps, $props.points, $props.params)
        )
      }
    })
    watch($props, async (props) => {
      if (instance?.uid && instance?.parent?.type?.name) {
        stateManager?.setGeoObject(
          instance.uid,
          instance.parent.type?.name,
          await getGeoObject(maps, props.points, props.params)
        )
      }
    })
    return {
      geoObjectKey,
      maps,
      stateManager
    }
  },
  props: {
    points: {
      type: Array as PropType<RouteProperties['points']>,
      required: true,
      validator(value: RoutePoint[]) {
        if (!Array.isArray(value) || value.length === 0) {
          return false
        }
        for (const item of value) {
          if (typeof item === 'string' && item.length === 0) {
            return false
          }
          if (
            typeof item === 'object' &&
            (!('type' in item && 'point' in item) ||
              ('type' in item && 'point' in item && !['viaPoint', 'wayPoint'].includes(item.type)))
          ) {
            return false
          }
          if (
            typeof item === 'object' &&
            item.type === 'viaPoint' &&
            (typeof item.point !== 'string' ||
              (typeof item.point === 'string' && item.point.length === 0))
          ) {
            return false
          }
          if (
            typeof item === 'object' &&
            item.type === 'wayPoint' &&
            !(
              Array.isArray(item.point) &&
              item.point.length === 2 &&
              !Number.isNaN(item.point[0]) &&
              !Number.isNaN(item.point[1])
            )
          ) {
            return false
          }
        }
        return true
      }
    },
    params: {
      type: Object as PropType<RouteProperties['params']>,
      default() {
        return {}
      }
    }
  }
})
