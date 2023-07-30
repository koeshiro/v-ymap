import type ymaps3 from "@yandex/ymaps3-types"
import type { Ref, PropType } from 'vue'
import type { YMapDefaultSchemeLayerProps } from "@yandex/ymaps3-types/imperative/YMapDefaultSchemeLayer"
import type { IMapGeoObjectsStateManager } from '@/map-geo-objects-state-manager'
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { injectMapGeoObjectState, injectMaps } from '@/provider'


export type ControlsProperties = YMapDefaultSchemeLayerProps;

export type ControlsMethods = {
}

export type ControlsData = {
    geoObjectKey: Ref<number | undefined>
    maps: ReturnType<typeof injectMaps>
    stateManager: IMapGeoObjectsStateManager | undefined
} & ControlsMethods

async function getGeoObject(maps: Ref<typeof ymaps3>, options: ControlsProperties): Promise<ymaps3.YMapDefaultSchemeLayer> {
    return new maps.value.YMapDefaultSchemeLayer(options);
}

export  const YDefaultSchemeLayer = defineComponent({
    name: 'y-default-scheme-layer',
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
        visible: {
            type: Boolean as PropType<ControlsProperties['visible']>,
        },
        customization: {
            type: Object as PropType<ControlsProperties['customization']>,
        },
        hotspotsEnabled: {
            type: Boolean as PropType<ControlsProperties['hotspotsEnabled']>,
        },
        theme: {
            type: String as PropType<ControlsProperties['theme']>,
        },
    }
});