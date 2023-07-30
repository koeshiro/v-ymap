import { type Ref, inject, provide } from 'vue'
import ymaps3 from "@yandex/ymaps3-types/imperative";

export function provideMaps(map: Ref<typeof ymaps3 | null>) {
  provide('v-y-maps-instance', map)
}
export function injectMaps() {
  return inject<Ref<typeof ymaps3 | null>>('v-y-maps-instance')
}
