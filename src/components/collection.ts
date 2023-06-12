import { type Ref, defineComponent, getCurrentInstance, onMounted, ref, shallowRef } from 'vue'
import { injectMapGeoObjectState, injectMaps } from '../provider'
import { type IMapGeoObjectsStateManager } from 'src/map-geo-objects-state-manager'

export type CollectionProperties = {
  options: any
}

export type CollectionMethods = {
  each: (callback: Function, context?: any) => any
  filter: (filterFunction: Function) => any[]
  get: (index: number) => any
  getAll: () => any[]
  getIterator: () => Iterator<any>
  getLength: () => number
  getMap: () => any
  getParent: () => any
  indexOf: (childToFind: any) => number
  onRemoveFromMap: (oldMap: Function) => void
  setParent: (parent: any) => any
}

export type CollectionData = {
  geoObjectKey: Ref<number | undefined>
  maps: any
  stateManager: IMapGeoObjectsStateManager | undefined
} & CollectionMethods

async function getGeoObject(maps: any, options: CollectionProperties): Promise<any> {
  return new maps.value.Collection(options)
}

export const YCollection = defineComponent({
  name: 'y-collection',
  setup($props: CollectionProperties): CollectionData {
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
      each(callback: Function, context?: any): any {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).each(callback, context)
      },
      filter(filterFunction: Function): any[] {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).filter(filterFunction)
      },
      get(index: number): any {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).get(index)
      },
      getAll(): any[] {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).getAll()
      },
      getIterator(): Iterator<any> {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).getIterator()
      },
      getLength(): number {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).getLength()
      },
      getMap(): any {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).getMap()
      },
      getParent(): any {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).getParent()
      },
      indexOf(childToFind: any): number {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).indexOf(childToFind)
      },
      onRemoveFromMap(oldMap: Function): void {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).onRemoveFromMap(oldMap)
      },
      setParent(parent: any): any {
        return stateManager?.getGeoObject(geoObjectKey.value ?? -1).setParent(parent)
      }
    }
  },
  props: {
    options: {
      type: Object as CollectionProperties['options'],
      default() {
        return {}
      }
    }
  }
})
