import type ymaps3 from "@yandex/ymaps3-types/imperative/YMapCoverage"
import type { Ref, PropType } from 'vue'
import type { YMapCoverageProps } from "@yandex/ymaps3-types/imperative/YMapCoverage"
import type { IMapGeoObjectsStateManager } from '@/map-geo-objects-state-manager'
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { injectMapGeoObjectState, injectMaps } from '@/provider'

export type ControlsProperties = YMapCoverageProps;

export type ControlsMethods = {
}

export type ControlsData = {
    geoObjectKey: Ref<number | undefined>
    maps: ReturnType<typeof injectMaps>
    stateManager: IMapGeoObjectsStateManager | undefined
} & ControlsMethods

async function getGeoObject(maps: Ref<typeof ymaps3>, options: ControlsProperties): Promise<ymaps3.YMapCoverage> {
    return new maps.value.YMapCoverage(options);
}

export  const YCoverage = defineComponent({
    name: 'y-coverage',
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
        onError: {
            type: Object as PropType<ControlsProperties['onError']>,
        }
    }
});