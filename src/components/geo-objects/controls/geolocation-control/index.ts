import type { Ref, PropType } from 'vue'
import type { YMapGeolocationControlProps, YMapGeolocationControl } from "@yandex/ymaps3-types/packages/controls/YMapGeolocationControl";
import type { IMapGeoObjectsStateManager } from '@/map-geo-objects-state-manager'
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { injectMapGeoObjectState, injectMaps } from '@/provider'

export type ControlsProperties = YMapGeolocationControlProps;

export type ControlsMethods = {
}

export type ControlsData = {
    geoObjectKey: Ref<number | undefined>
    maps: ReturnType<typeof injectMaps>
    stateManager: IMapGeoObjectsStateManager | undefined
} & ControlsMethods

async function getGeoObject(options: ControlsProperties): Promise<YMapGeolocationControl> {
    const { YMapZoomControl } = await (ymaps3 as any).import('@yandex/ymaps3-controls@0.0.1');
    return new YMapZoomControl(options);
}

export  const YGeolocationControl = defineComponent({
    name: 'y-geolocation-control',
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
    props: {
        onGeolocatePosition: {
            type: Object as PropType<ControlsProperties['onGeolocatePosition']>
        },
        source: {
            type: Object as PropType<ControlsProperties['source']>
        },
        easing: {
            type: Object as PropType<ControlsProperties['easing']>
        },
        duration: {
            type: Object as PropType<ControlsProperties['duration']>
        },
    }
});