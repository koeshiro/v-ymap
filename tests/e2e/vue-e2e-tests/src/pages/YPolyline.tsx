import { defineComponent, shallowRef } from "vue";
import { YMap, YPolyline } from "v-ymap";
import "v-ymap/style.css";

export default defineComponent({
    setup(){
        const map = shallowRef<typeof YMap | null>(null);
        const polyline = shallowRef<typeof YPolyline | null>(null);
        return {
            map,
            polyline
        }
    },
    render() {
        return (<div style={{width:'500px',height: '500px'}}>
            <YMap center={[55.80, 37.50]} zoom={10} ref="map">
                <YPolyline
                    ref="polyline"
                    geometry={[[55.80, 37.50], [55.80, 37.40], [55.70, 37.50], [55.70, 37.40], [55.80, 37.50]]}
                    options={{ balloonCloseButton: false, strokeColor: "#000000", strokeWidth: 4, strokeOpacity: 0.5 }}
                />
            </YMap>
        </div>);
    }
})