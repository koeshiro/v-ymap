import { type Ref, defineComponent, getCurrentInstance, onMounted, ref, PropType, watch } from 'vue'
import { injectMapGeoObjectState, injectMaps } from '../../provider'
import { type IMapGeoObjectsStateManager } from 'src/map-geo-objects-state-manager'
import ymaps3, { YMapControlsProps } from "@yandex/ymaps3-types/imperative";

export type ControlsProperties = YMapControlsProps;

export type ControlsMethods = {
}

export type ControlsData = {
geoObjectKey: Ref<number | undefined>
maps: Ref<typeof ymaps3 | null>;
stateManager: IMapGeoObjectsStateManager | undefined
} & ControlsMethods

async function getGeoObject(maps: Ref<typeof ymaps3>, options: ControlsProperties): Promise<ymaps3.YMapControls> {
return new maps.value.YMapControls(options);
}

export  const YControls = defineComponent({
    name: 'y-controls',
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
        position: {
            type: Object as PropType<ControlsProperties['position']>,
        },
        orientation: {
            type: Object as PropType<ControlsProperties['orientation']>,
        }
    }
});