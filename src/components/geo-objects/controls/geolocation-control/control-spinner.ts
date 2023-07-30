import type { Ref } from 'vue'
import type { IMapGeoObjectsStateManager } from '@/map-geo-objects-state-manager'
import type { YMapControlSpinner } from "@yandex/ymaps3-types/packages/controls/YMapGeolocationControl/YMapControlSpinner"
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { injectMapGeoObjectState, injectMaps } from '@/provider'

export type ControlSpinnerProperties = {};

export type ControlSpinnerMethods = {}

export type ControlSpinnerData = {
    geoObjectKey: Ref<number | undefined>
    maps: ReturnType<typeof injectMaps>
    stateManager: IMapGeoObjectsStateManager | undefined
} & ControlSpinnerMethods

async function getGeoObject(options: ControlSpinnerProperties): Promise<YMapControlSpinner> {
    const { YMapControlSpinner } = await (ymaps3 as any).import('@yandex/ymaps3-controls@0.0.1');
    return new YMapControlSpinner(options);
}

export  const YControlSpinner = defineComponent({
    name: 'y-control-spinner',
    setup($props: ControlSpinnerProperties): ControlSpinnerData {
        const maps = injectMaps()
        const stateManager = injectMapGeoObjectState()
        const instance = getCurrentInstance()
        const geoObjectKey = ref(instance?.uid)
        onMounted(() => {
            if (instance?.uid && instance?.parent?.type?.name) {
                stateManager?.setGeoObject(
                    instance.uid,
                    instance.parent.type?.name,
                    getGeoObject($props)
                )
            }
        })
        watch($props, async (props) => {
            if (instance?.uid && instance?.parent?.type?.name) {
                stateManager?.setGeoObject(
                    instance.uid,
                    instance.parent.type?.name,
                    await getGeoObject(props)
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