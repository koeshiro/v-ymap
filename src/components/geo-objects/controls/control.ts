import type ymaps3 from "@yandex/ymaps3-types/imperative";
import type { Ref } from 'vue'
import type { YMapControlProps } from "@yandex/ymaps3-types/imperative/YMapControl/YMapControl"
import type { IMapGeoObjectsStateManager } from '@/map-geo-objects-state-manager'
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { injectMapGeoObjectState, injectMaps } from '@/provider'

export type ControlSpinnerProperties = YMapControlProps;

export type ControlSpinnerMethods = {}

export type ControlSpinnerData = {
    geoObjectKey: Ref<number | undefined>
    maps: ReturnType<typeof injectMaps>
    stateManager: IMapGeoObjectsStateManager | undefined
} & ControlSpinnerMethods

async function getGeoObject(maps: Ref<typeof ymaps3>, options: ControlSpinnerProperties): Promise<ymaps3.YMapControl> {
    return new maps.value.YMapControl(options);
}

export  const YControlButton = defineComponent({
    name: 'y-control-button',
    setup($props: ControlSpinnerProperties): ControlSpinnerData {
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
    props: {}
});