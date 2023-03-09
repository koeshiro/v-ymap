import {defineComponent} from "vue";
import { YMap } from "v-ymap";
import "v-ymap/style.css";

export default defineComponent({
    render() {
        return (<div style={{width:'500px',height: '500px'}}>
            <YMap center={[55.727751,52.433731]} zoom={10}></YMap>
        </div>);
    }
});

