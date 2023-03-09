import { defineComponent, shallowRef, } from "vue";
import { YMap, YRoute } from "v-ymap";
import "v-ymap/style.css";


const points = shallowRef(['Москва, пр. Мира','Москва, ул. Мясницкая']);

export default defineComponent({
    setup() {
        return {
            updatePoints() {
                points.value = ['Москва, пр. Мира', 'Москва, Красная площадь'];
            }
        }
    },
    render() {
        return (<div style={{width:'500px', height: '500px'}}>
            <YMap center={[55.665, 37.66]} zoom={10} YMAPS_KEY={import.meta.env.YMAPS_KEY}>
                <YRoute key="1" points={points.value}/>
                <YRoute key="2" points={['Москва, пр. Мира','Москва, ул. Ленина']}/>
            </YMap>
            <button onClick={this.updatePoints}> update </button>
        </div>);
    }
});
