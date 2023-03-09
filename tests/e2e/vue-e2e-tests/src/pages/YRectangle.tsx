import { defineComponent, shallowRef } from "vue";
import { YMap, YRectangle } from "v-ymap";
import "v-ymap/style.css";

export default defineComponent({
    setup(){
        const map = shallowRef<typeof YMap | null>(null);
        const rectangle = shallowRef<typeof YRectangle | null>(null);
        return {
            map,
            rectangle
        }
    },
    render() {
        return (<div style={{width:'500px',height: '500px'}}>
            <YMap center={[55.665, 37.66]} zoom={10} ref="map">
                <YRectangle
                    ref="rectangle"
                    geometry={[[55.665, 37.66],[55.64, 37.53]]}
                    options={{ balloonCloseButton: false, strokeColor: "#000000", strokeWidth: 4, strokeOpacity: 0.5 }}
                />
            </YMap>
        </div>);
    }
})