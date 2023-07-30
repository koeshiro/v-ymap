import type ymaps3 from "@yandex/ymaps3-types"
import type { Ref, PropType } from 'vue'
import type { IMapGeoObjectsStateManager } from '@/map-geo-objects-state-manager'
import type { YMapTileDataSourceProps, YMapTileDataSource } from "@yandex/ymaps3-types/imperative/YMapTileDataSource";
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { injectMapGeoObjectState, injectMaps } from '@/provider'

export type ControlsProperties = YMapTileDataSourceProps;

export type ControlsMethods = {
}

export type ControlsData = {
    geoObjectKey: Ref<number | undefined>
    maps: ReturnType<typeof injectMaps>
    stateManager: IMapGeoObjectsStateManager | undefined
} & ControlsMethods

async function getGeoObject(maps: Ref<typeof ymaps3>, options: ControlsProperties): Promise<YMapTileDataSource> {
    return new maps.value.YMapTileDataSource(options);
}

export  const YTileDataSource = defineComponent({
    name: 'y-tile-data-source',
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
            required: true,
        },
        zoomRange: {
            type: Object as PropType<ControlsProperties['zoomRange']>,
        },
        clampMapZoom: {
            type: Boolean as PropType<ControlsProperties['clampMapZoom']>,
        },
        raster: {
            type: Object as PropType<ControlsProperties['raster']>,
        },
        copyrights: {
            type: Array as PropType<ControlsProperties['copyrights']>,
        },
    }
});