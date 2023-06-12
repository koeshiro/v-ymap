import { inject, provide } from 'vue'

export function provideMap(map: any) {
  provide('v-y-map-instance', map)
}
export function injectMap() {
  return inject<any>('v-y-map-instance')
}
