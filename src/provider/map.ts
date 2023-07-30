import { type Ref, inject, provide } from 'vue'
import ymaps3 from "@yandex/ymaps3-types/imperative";

export function provideMap(map: Ref<ymaps3.YMap | null>) {
  provide('v-y-map-instance', map)
}
export function injectMap() {
  return inject<Ref<ymaps3.YMap | null>>('v-y-map-instance')
}
