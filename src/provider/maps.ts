import { type Ref, inject, provide } from 'vue'

export function provideMaps(map: Ref<any>) {
  provide('v-y-maps-instance', map)
}
export function injectMaps() {
  return inject<Ref<any>>('v-y-maps-instance')
}
