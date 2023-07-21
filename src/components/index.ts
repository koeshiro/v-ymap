import ymaps3, { YMapProps, ReadonlyLngLat, LngLatBounds, ZoomRange, BehaviorType, Config, YMapLocationRequest, MapMode, ZoomRounding, Margin } from "@yandex/ymaps3-types/imperative";
import { Projection, PixelCoordinates } from "@yandex/ymaps3-types";
import {
  defineComponent,
  type PropType,
  ref,
  shallowRef,
  h,
  onMounted,
  watch,
  nextTick,
  type Ref
} from 'vue'
import { type MapLoaderOptions, YMapsLoad } from '../ymaps-load'
import { provideMap, provideMaps, provideMapGeoObjectState } from '../provider'
import '../index.css'
import {
  type GeoObjectState,
  type IMapGeoObjectsStateManager,
  MapGeoObjectsStateManager
} from '../map-geo-objects-state-manager'
import { ComponentsWithChildren, VYMap } from '@/constants'

export type MapTypes = 'yandex#map' | 'yandex#satellite' | 'yandex#hybrid'

export type MapProperties = MapLoaderOptions & YMapProps;

export type MapMethods = Pick<
  ymaps3.YMap, 
  "container"
  | "center"
  | "zoom"
  | "tilt"
  | "azimuth"
  | "bounds"
  | "zoomRange"
  | "projection"
  | "size"
  | "behaviors"
  | "config"
  | "setLocation"
  | "setMode"
  | "setZoomRange"
  | "setBehaviors"
  | "setZoomRounding"
  | "setMargin"
  | "setConfig"
>;

export type MapData = {
  maps: Ref<typeof ymaps3 | null>;
  map: Ref<ymaps3.YMap | null>;
  dmap: Ref<HTMLDivElement | null>
  stateManager: IMapGeoObjectsStateManager
}

export type MapSetup = MapData & MapMethods

function processGeoObjects(stateManager: IMapGeoObjectsStateManager, map: Ref<ymaps3.YMap>): void {
  map.value.children.forEach(child => map.value.removeChild(child));

  const defaultParentGeoObjectState = map.value;
  let currentParentGeoObjectState: GeoObjectState | null = null
  let currentParentGeoObject: ymaps3.YMap | ymaps3.YMapEntity<any> | ymaps3.YMapGroupEntity<any> = defaultParentGeoObjectState;

  stateManager.getGeoObjects().forEach((getGeoObject: GeoObjectState) => {
    if (ComponentsWithChildren.includes(getGeoObject.parentType)) {
      currentParentGeoObjectState = getGeoObject
      currentParentGeoObject = getGeoObject.geoObject
    } else if (getGeoObject.parentType === VYMap) {
      currentParentGeoObjectState = null
      currentParentGeoObject = defaultParentGeoObjectState
    }
    if ('addChild' in currentParentGeoObject) {
      currentParentGeoObject.addChild(getGeoObject.geoObject)
    }
  })
}

export const YMap = defineComponent({
  name: VYMap,
  render() {
    return h('div', { class: 'yandex-maps_container' }, [
      h(
        'div',
        {
          class: 'yandex-maps',
          ref: 'dmap'
        },
        h(
          'div',
          {
            class: 'yandex-maps_slots'
          },
          this.map && this.$slots.default ? this.$slots.default() : []
        )
      )
    ])
  },
  props: {
    YMAPS_KEY: {
      type: String,
      default: ''
    },
    YMAPS_LANG: {
      type: String,
      default: 'ru_RU'
    },
    YMAPS_VERSION: {
      type: String,
      default: '2.1'
    },
    YMAPS_LOAD_BY_REQUIRE: {
      type: Boolean,
      default: true
    },
    /** Map container css class name */
    className: {
      type: String as PropType<MapProperties['className']>,
    },
    /** Initial location or request to change location with duration */
    location: {
      type: Object as PropType<MapProperties['location']>,
    },
    /** Initial camera or request to change camera with duration */
    camera: {
      type: Object as PropType<MapProperties['camera']>,
    },
    /** Map mode, 'auto' (default. Show raster tiles while vector tiles are loading), 'raster' or 'vector' (without raster preloading). */
    mode: {
      type: Object as PropType<MapProperties['mode']>,
    },
    /** Active behaviors */
    behaviors: {
      type: Object as PropType<MapProperties['behaviors']>,
    },
    /** Sets the map view area so that the user cannot move outside of this area. */
    restrictMapArea: {
      type: Object as PropType<MapProperties['restrictMapArea']>,
      default() {
        return false;
      }
    },
    /** Restrict min and max map zoom */
    zoomRange: {
      type: Object as PropType<MapProperties['zoomRange']>,
    },
    /** Zoom strategy describes if map center is bound to the zoom point or not */
    zoomStrategy: {
      type: Object as PropType<MapProperties['zoomStrategy']>,
    },
    /** Set rounding for zoom. If `auto` is selected, zoom will be `snap` for `raster` and `smooth` for `vector` `MapMode`. Default is `auto`.*/
    zoomRounding: {
      type: Object as PropType<MapProperties['zoomRounding']>,
    },
    /** Map margins */
    margin: {
      type: Object as PropType<MapProperties['margin']>,
    },
    /** Other configs */
    config: {
      type: Object as PropType<MapProperties['config']>,
    },
    /** Strategy for fetching hotspots, for whole viewport or for tiles that pointer is hovering at */
    hotspotsStrategy: {
      type: Object as PropType<MapProperties['hotspotsStrategy']>,
    },
    /**
     * Whether to show map copyrights.
     * > The option is ignored if `config.meta.copyrights.allowRemove` has a falsy value
     * @internal
     */
    copyrights: {
      type: Object as PropType<MapProperties['copyrights']>,
    },
    /** Position of copyright on the page. Default is 'bottom right' */
    copyrightsPosition: {
      type: Object as PropType<MapProperties['copyrightsPosition']>,
    },
    /**
     * Projection used in map
     */
    projection: {
      type: Object as PropType<MapProperties['projection']>,
    },
    /**
     * Whether to repeat the world in X and Y
     */
    worldOptions: {
      type: Object as PropType<MapProperties['worldOptions']>,
    },
  },
  expose: [
    'dmap',
    'map',
    'dmap',
    'stateManager',
    "container",
    "center",
    "zoom",
    "tilt",
    "azimuth",
    "bounds",
    "zoomRange",
    "projection",
    "size",
    "behaviors",
    "config",
    "setLocation",
    "setMode",
    "setZoomRange",
    "setBehaviors",
    "setZoomRounding",
    "setMargin",
    "setConfig"
  ],
  setup($props: MapProperties, context): MapSetup {
    const maps = shallowRef<MapSetup['maps']>(null)
    const map = shallowRef<MapSetup['map']>(null)
    const dmap = ref<HTMLDivElement | null>(null)
    const stateManager = new MapGeoObjectsStateManager()
    const state = stateManager.getGeoObjectsRef()
    onMounted(async () => {
      maps.value = await YMapsLoad({
        YMAPS_KEY: $props.YMAPS_KEY,
        YMAPS_LANG: $props.YMAPS_LANG,
        YMAPS_VERSION: $props.YMAPS_VERSION,
        YMAPS_LOAD_BY_REQUIRE: $props.YMAPS_LOAD_BY_REQUIRE
      })
      map.value = new maps.value.YMap(
        dmap.value,
        $props,
      )
      nextTick(() => {
        processGeoObjects(stateManager, map)
      })
    })
    watch(state, () => {
      nextTick(() => {
        processGeoObjects(stateManager, map)
      })
    })
    watch(
      () => context.slots,
      () => {
        nextTick(() => {
          processGeoObjects(stateManager, map)
        })
      }
    )
    provideMapGeoObjectState(stateManager)
    provideMaps(maps)
    provideMap(map)
    return {
      maps,
      map,
      dmap,
      stateManager,
      get container(): HTMLElement {
        return map.value.container;
      },
      get center(): ReadonlyLngLat {
        return map.value.center;
      },
      get zoom(): number {
        return map.value.zoom;
      },
      get tilt(): number {
        return map.value.tilt;
      },
      get azimuth(): number{
        return map.value.azimuth;
      },
      get bounds(): LngLatBounds{
        return map.value.bounds;
      },
      get zoomRange(): Readonly<ZoomRange>{
        return map.value.zoomRange;
      },
      get projection(): Projection{
        return map.value.projection;
      },
      get size(): PixelCoordinates{
        return map.value.size;
      },
      get behaviors(): Readonly<BehaviorType[]>{
        return map.value.behaviors;
      },
      get config(): Readonly<Config>{
        return map.value.config;
      },
      setLocation(location: YMapLocationRequest): void{
        return map.value.setLocation(location);
      },
      setMode(mode: MapMode): void{
        return map.value.setMode(mode);
      },
      setZoomRange(zoomRange: ZoomRange): void{
        return map.value.setZoomRange(zoomRange);
      },
      setBehaviors(behaviors: BehaviorType[]): void{
        return map.value.setBehaviors(behaviors);
      },
      setZoomRounding(zoomRounding: ZoomRounding): void{
        return map.value.setZoomRounding(zoomRounding);
      },
      setMargin(margin: Margin): void{
        return map.value.setMargin(margin);
      },
      setConfig(config: Config): void{
        return map.value.setConfig(config);
      },
    }
  }
})
