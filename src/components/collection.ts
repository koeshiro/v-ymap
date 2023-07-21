import { type Ref, defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { injectMapGeoObjectState, injectMaps } from '../provider'
import { type IMapGeoObjectsStateManager } from 'src/map-geo-objects-state-manager'
import ymaps3 from "@yandex/ymaps3-types/imperative";

export type CollectionProperties = {
  options: any
}

export type CollectionMethods = {
}

export type CollectionData = {
  geoObjectKey: Ref<number | undefined>
  maps: Ref<typeof ymaps3 | null>;
  stateManager: IMapGeoObjectsStateManager | undefined
} & CollectionMethods

async function getGeoObject(maps: Ref<typeof ymaps3>, options: CollectionProperties): Promise<ymaps3.YMapCollection> {
  return new maps.value.YMapCollection(options);
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
    watch($props, async (props) => {
      if (instance?.uid && instance?.parent?.type?.name) {
        stateManager?.setGeoObject(
          instance.uid,
          instance.parent.type?.name,
          await getGeoObject(maps, props)
        )
      }
    })
    return {
      geoObjectKey,
      maps,
      stateManager,
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
