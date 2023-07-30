import type ymaps3 from "@yandex/ymaps3-types"
import type { Ref, PropType } from 'vue'
import type { IMapGeoObjectsStateManager } from '@/map-geo-objects-state-manager'
import type { YMapFeatureProps } from "@yandex/ymaps3-types/imperative/YMapFeature"
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { injectMapGeoObjectState, injectMaps } from '@/provider'


export type ControlsProperties = YMapFeatureProps;

export type ControlsMethods = {
}

export type ControlsData = {
    geoObjectKey: Ref<number | undefined>
    maps: ReturnType<typeof injectMaps>
    stateManager: IMapGeoObjectsStateManager | undefined
} & ControlsMethods

async function getGeoObject(maps: Ref<typeof ymaps3>, options: ControlsProperties): Promise<ymaps3.YMapFeature> {
    return new maps.value.YMapFeature(options);
}

export  const YFeature = defineComponent({
    name: 'y-feature',
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
            type: String as PropType<ControlsProperties['id']>,
        },
        geometry: {
            type: Object as PropType<ControlsProperties['geometry']>,
            required: true,
        },
        source: {
            type: Object as PropType<ControlsProperties['source']>,
        },
        style: {
            type: Object as PropType<ControlsProperties['style']>,
        },
        properties: {
            type: Object as PropType<ControlsProperties['properties']>,
        },
        /** Feature can be draggable */
        draggable: {
            type: Boolean as PropType<ControlsProperties['draggable']>,
        },
        /** Will map center follows marker on drag if marker near the edge of the map */
        mapFollowsOnDrag: {
            type: [Object, Boolean] as PropType<ControlsProperties['mapFollowsOnDrag']>,
        },
        /** Fires on drag start */
        onDragStart: {
            type: Function as PropType<ControlsProperties['onDragStart']>,
        },
        onDragEnd: {
            type: Function as PropType<ControlsProperties['onDragEnd']>,
        },
        onDragMove: {
            type: Function as PropType<ControlsProperties['onDragMove']>,
        },
        blockEvents: {
            type: Boolean as PropType<ControlsProperties['blockEvents']>,
        },
        blockBehaviors: {
            type: Boolean as PropType<ControlsProperties['blockBehaviors']>,
        },
        onDoubleClick: {
            type: Function as PropType<ControlsProperties['onDoubleClick']>,
        },
        onClick: {
            type: Function as PropType<ControlsProperties['onClick']>,
        },
        onFastClick: {
            type: Function as PropType<ControlsProperties['onFastClick']>,
        },
    }
});