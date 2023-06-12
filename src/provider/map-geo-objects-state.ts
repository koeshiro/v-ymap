import { inject, provide } from 'vue'
import type { IMapGeoObjectsStateManager } from '../map-geo-objects-state-manager'

export function provideMapGeoObjectState(stateManager: IMapGeoObjectsStateManager) {
  provide('v-y-map-geo-objects-state', stateManager)
}
export function injectMapGeoObjectState() {
  return inject<IMapGeoObjectsStateManager>('v-y-map-geo-objects-state')
}
