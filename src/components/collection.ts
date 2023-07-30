import type { Ref } from 'vue'
import type { IMapGeoObjectsStateManager } from '@/map-geo-objects-state-manager'
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { injectMapGeoObjectState, injectMaps } from '@/provider'
import ymaps3 from "@yandex/ymaps3-types/imperative";

export type CollectionProperties = {
  options: any
}

export type CollectionMethods = {
}

export type CollectionData = {
  geoObjectKey: Ref<number | undefined>
  maps: ReturnType<typeof injectMaps>
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
    onMounted(async () => {
      if (
          instance?.uid
          && instance?.parent?.type?.name
          && maps
          && maps.value
      ) {
          stateManager?.setGeoObject(
              instance.uid,
              instance.parent.type?.name,
              await getGeoObject(maps as Ref<typeof ymaps3>, $props)
          )
      }
  })
  watch($props, async (props) => {
      if (
          instance?.uid
          && instance?.parent?.type?.name
          && maps
          && maps.value
      ) {
          stateManager?.setGeoObject(
              instance.uid,
              instance.parent.type?.name,
              await getGeoObject(maps as Ref<typeof ymaps3>, props)
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
