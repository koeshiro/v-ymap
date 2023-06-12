import { defineComponent, getCurrentInstance, onMounted, type PropType, ref, type Ref } from 'vue'
import { injectMapGeoObjectState, injectMaps } from '../provider'
import type { IMapGeoObjectsStateManager } from '../map-geo-objects-state-manager'

export type ClustererProps = {
  gridSize: number
  groupByCoordinates: boolean
  hasBalloon: boolean
  hasHint: boolean
  margin: number[]
  maxZoom: number
  minClusterSize: number
  preset?: string
  showInAlphabeticalOrder: boolean
  useMapMargin: boolean
  viewportMargin: number
  zoomMargin: number
}

export type ClustererData = {
  geoObjectKey: Ref<number | undefined>
  maps: any
  stateManager: IMapGeoObjectsStateManager | undefined
} & ClustererMethods

export type ClustererMethods = {
  getBounds: () => number[][] | null
  getClusters: () => any[]
  getGeoObjects: () => any[]
  getMap: () => any
  getObjectState: (geoObject: any) => any | null
  getParent: () => any
  setParent: (parent: any) => any
}

async function getGeoObject(maps: any, $props: ClustererProps): Promise<any> {
  return new maps.value.Clusterer({
    gridSize: $props.gridSize,
    groupByCoordinates: $props.groupByCoordinates,
    hasBalloon: $props.hasBalloon,
    hasHint: $props.hasHint,
    margin: $props.margin,
    maxZoom: $props.maxZoom,
    minClusterSize: $props.minClusterSize,
    preset: $props.preset,
    showInAlphabeticalOrder: $props.showInAlphabeticalOrder,
    useMapMargin: $props.useMapMargin,
    viewportMargin: $props.viewportMargin,
    zoomMargin: $props.zoomMargin
  })
}

export const YClusterer = defineComponent({
  name: 'y-clusterer',
  setup($props: ClustererProps): ClustererData {
    const maps = injectMaps()
    const stateManager = injectMapGeoObjectState()
    const instance = getCurrentInstance()
    const geoObjectKey = ref(instance?.uid)
    onMounted(() => {
      if (instance?.uid && instance?.parent?.type?.name) {
        stateManager?.setGeoObject(
          instance.uid,
          instance.parent.type?.name,
          getGeoObject(maps, $props)
        )
      }
    })
    return {
      geoObjectKey,
      maps,
      stateManager,
      getBounds(): number[][] | null {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).getBounds()
      },
      getClusters(): any[] {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).getClusters()
      },
      getGeoObjects(): any[] {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).getGeoObjects()
      },
      getMap(): any {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).getMap()
      },
      getObjectState(geoObject: any): any | null {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).getObjectState(geoObject)
      },
      getParent(): any {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).getParent()
      },
      setParent(parent: any): any {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).setParent(parent)
      }
    }
  },
  props: {
    gridSize: {
      type: Number as PropType<ClustererProps['gridSize']>,
      default: 64,
      validator(value: number) {
        return value % 2 === 0
      }
    },
    groupByCoordinates: {
      type: Boolean as PropType<ClustererProps['groupByCoordinates']>,
      default: false
    },
    hasBalloon: {
      type: Boolean as PropType<ClustererProps['hasBalloon']>,
      default: true
    },
    hasHint: {
      type: Boolean as PropType<ClustererProps['hasHint']>,
      default: true
    },
    margin: {
      type: Array as PropType<ClustererProps['margin']>,
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
    maxZoom: {
      type: Number as PropType<ClustererProps['maxZoom']>,
      default: Infinity
    },
    minClusterSize: {
      type: Number as PropType<ClustererProps['minClusterSize']>,
      default: 2,
      validator(value: number) {
        return value > 0
      }
    },
    preset: {
      type: String as PropType<ClustererProps['preset']>
    },
    showInAlphabeticalOrder: {
      type: Boolean as PropType<ClustererProps['showInAlphabeticalOrder']>,
      default: false
    },
    useMapMargin: {
      type: Boolean as PropType<ClustererProps['useMapMargin']>,
      default: true
    },
    viewportMargin: {
      type: Number as PropType<ClustererProps['viewportMargin']>,
      default: 128
    },
    zoomMargin: {
      type: Number as PropType<ClustererProps['zoomMargin']>,
      default: 0
    }
  }
})
