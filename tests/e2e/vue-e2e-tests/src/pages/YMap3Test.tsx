import {defineComponent} from "vue";
import { YMap } from "v-ymap";
import "v-ymap/style.css";

export default defineComponent({
    render() {
        return (<div style={{width:'500px',height: '500px'}}>
            <script src="https://api-maps.yandex.ru/3.0/?apikey=62e93f85-7e09-43f2-b921-735b5406609e&lang=ru_RU"></script>
        </div>);
    }
});

