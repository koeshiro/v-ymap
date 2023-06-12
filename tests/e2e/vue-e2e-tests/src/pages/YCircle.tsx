import { defineComponent, shallowRef } from "vue";
import { YMap, YCircle } from "v-ymap";
import "v-ymap/style.css";

export default defineComponent({
    setup(){
        const map = shallowRef<typeof YMap | null>(null);
        const circle = shallowRef<typeof YCircle | null>(null);
        return {
            map,
            circle
        }
    },
    render() {
        return (<div style={{width:'500px',height: '500px'}}>
            <YMap center={[55.76, 37.64]} zoom={10} ref="map">
                <YCircle
                    ref="circle"
                    geometry={[[55.76, 37.64], 10000]}
                    options={{ balloonCloseButton: false, strokeColor: "#000000", strokeWidth: 4, strokeOpacity: 0.5 }}
                />
            </YMap>
        </div>);
    }
})