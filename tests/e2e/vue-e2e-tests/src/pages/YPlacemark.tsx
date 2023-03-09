import { defineComponent, shallowRef } from "vue";
import { YMap, YPlacemark } from "v-ymap";
import "v-ymap/style.css";

export default defineComponent({
    setup(){
        const map = shallowRef<typeof YMap | null>(null);
        const placemark = shallowRef<typeof YPlacemark | null>(null);
        return {
            map,
            placemark
        }
    },
    render() {
        return (<div style={{width:'500px',height: '500px'}}>
            <YMap center={[55.727751,52.433731]} zoom={10} ref="map">
                <YPlacemark ref="placemark" geometry={[55.727751,52.433731]}/>
            </YMap>
        </div>);
    }
})