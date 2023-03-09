import { defineComponent, shallowRef } from "vue";
import { YMap, YPolygon } from "v-ymap";
import "v-ymap/style.css";

export default defineComponent({
    setup(){
        const map = shallowRef<typeof YMap | null>(null);
        const polygon = shallowRef<typeof YPolygon | null>(null);
        return {
            map,
            polygon
        }
    },
    render() {
        return (<div style={{width:'500px',height: '500px'}}>
            <YMap center={[55.75, 37.80]} zoom={10} ref="map">
                <YPolygon
                    ref="polygon"
                    geometry={[[[55.75, 37.80],[55.80, 37.90],[55.75, 38.00],[55.70, 38.00],[55.70, 37.80]]]}
                    properties={{
                        hintContent: "Многоугольник"
                    }}
                    options={{
                        fillColor: '#6699ff',
                        strokeWidth: 8,
                        opacity: 0.5
                    }}
                    />
            </YMap>
        </div>);
    }
})