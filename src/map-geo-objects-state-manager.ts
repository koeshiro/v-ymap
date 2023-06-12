import { type ShallowRef, triggerRef, type Ref, shallowRef } from 'vue'

export type GeoObjectState = {
  uid: number
  geoObject: any
  parentType: string
}

export interface IMapGeoObjectsStateManager {
  setGeoObject(uid: number, parentType: string, geoObject: any): void
  getGeoObject(uid: number): any
  getGeoObjects(): GeoObjectState[]
  getGeoObjectsRef(): ShallowRef<GeoObjectState[]>
}

export class MapGeoObjectsStateManager implements IMapGeoObjectsStateManager {
  state: ShallowRef<GeoObjectState[]> = shallowRef([])

  setGeoObject(uid: number, parentType: string, geoObject: any): void {
    let pushed = false
    const newState = []
    for (const item of this.state.value) {
      if (item.uid === uid && item.parentType === parentType) {
        newState.push({ uid, parentType, geoObject })
        pushed = true
      } else {
        newState.push(item)
      }
    }
    if (!pushed) {
      newState.push({ uid, parentType, geoObject })
    }
    this.state.value = newState
    triggerRef(this.state)
  }

  getGeoObject(uid: number): any {
    const item = this.state.value.find((item) => item.uid === uid)
    return item ? item.geoObject : null
  }

  getGeoObjects(): GeoObjectState[] {
    return this.state.value
  }

  getGeoObjectsRef(): Ref<GeoObjectState[]> {
    return this.state
  }
}
