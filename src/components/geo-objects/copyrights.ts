import type ymaps3 from "@yandex/ymaps3-types/imperative/YMapCopyrights"
import type { Ref, PropType } from 'vue'
import type { YMapCopyrightsProps } from "@yandex/ymaps3-types/imperative/YMapCopyrights"
import type { IMapGeoObjectsStateManager } from '@/map-geo-objects-state-manager'
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { injectMapGeoObjectState, injectMaps } from '@/provider'

export type ControlsProperties = YMapCopyrightsProps;

export type ControlsMethods = {
}

export type ControlsData = {
    geoObjectKey: Ref<number | undefined>
    maps: ReturnType<typeof injectMaps>
    stateManager: IMapGeoObjectsStateManager | undefined
} & ControlsMethods

async function getGeoObject(maps: Ref<typeof ymaps3>, options: ControlsProperties): Promise<ymaps3.YMapCopyrights> {
    return new maps.value.YMapCopyrights(options);
}

export  const YCopyrights = defineComponent({
    name: 'y-copyrights',
    setup($props: ControlsProperties): ControlsData {
        const maps = injectMaps()
        const stateManager = injectMapGeoObjectState()
        const instance = getCurrentInstance()
        const geoObjectKey = ref(instance?.uid)
        onMounted(() => {
            if (instance?.uid && instance?.parent?.type?.name) {
                stateManager?.setGeoObject(
                    instance.uid,
                    instance.parent.type?.name,
                    getGeoObject(maps as any, $props)
                )
            }
        })
        watch($props, async (props) => {
            if (instance?.uid && instance?.parent?.type?.name) {
                stateManager?.setGeoObject(
                    instance.uid,
                    instance.parent.type?.name,
                    await getGeoObject(maps as any, props)
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
        position: {
            type: Object as PropType<ControlsProperties['position']>,
        }
    }
});