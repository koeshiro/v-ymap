import type ymaps3 from "@yandex/ymaps3-types"
import type { Ref, PropType } from 'vue'
import type { YMapLayerProps } from "@yandex/ymaps3-types/imperative/YMapLayer"
import type { IMapGeoObjectsStateManager } from '@/map-geo-objects-state-manager'
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { injectMapGeoObjectState, injectMaps } from '@/provider'

export type ControlsProperties = YMapLayerProps;

export type ControlsMethods = {
}

export type ControlsData = {
    geoObjectKey: Ref<number | undefined>
    maps: ReturnType<typeof injectMaps>
    stateManager: IMapGeoObjectsStateManager | undefined
} & ControlsMethods

async function getGeoObject(maps: Ref<typeof ymaps3>, options: ControlsProperties): Promise<ymaps3.YMapLayer> {
    return new maps.value.YMapLayer(options);
}

export  const YLayer = defineComponent({
    name: 'y-layer',
    setup($props: ControlsProperties): ControlsData {
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
        id: {
            type: Object as PropType<ControlsProperties['id']>,
        },
        source: {
            type: Object as PropType<ControlsProperties['source']>,
            required: true,
        },
        type: {
            type: Object as PropType<ControlsProperties['type']>,
            required: true,
        },
        zIndex: {
            type: Object as PropType<ControlsProperties['zIndex']>,
        },
        options: {
            type: Object as PropType<ControlsProperties['options']>,
        },
    }
});