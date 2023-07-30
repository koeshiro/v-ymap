import type { Ref, PropType } from 'vue'
import type { YMapZoomControl, YMapZoomControlProps } from "@yandex/ymaps3-types/packages/controls";
import type { IMapGeoObjectsStateManager } from '@/map-geo-objects-state-manager'
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { injectMapGeoObjectState, injectMaps } from '@/provider'

export type ZoomControlsProperties = YMapZoomControlProps;

export type ZoomControlsMethods = {
}

export type ZoomControlsData = {
    geoObjectKey: Ref<number | undefined>
    maps: ReturnType<typeof injectMaps>
    stateManager: IMapGeoObjectsStateManager | undefined
} & ZoomControlsMethods

async function getGeoObject(options: ZoomControlsProperties): Promise<YMapZoomControl> {
    const { YMapZoomControl } = await (ymaps3 as any).import('@yandex/ymaps3-controls@0.0.1');
    return new YMapZoomControl(options);
}


export const YZoomControls = defineComponent({
    name: 'y-controls',
    setup($props: ZoomControlsProperties): ZoomControlsData {
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
                    await getGeoObject( $props)
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
                    await getGeoObject( props)
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
        easing: {
            type: Object as PropType<ZoomControlsProperties['easing']>,
        },
        duration: {
            type: Object as PropType<ZoomControlsProperties['duration']>,
        }
    }
})