var e={load:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"//api-maps.yandex.ru/2.1/?lang=en_RU",t=function(){var t=e.match(/[\\?&]ns=([^&#]*)/);return null===t?"":decodeURIComponent(t[1].replace(/\+/g," "))};return this.promise||(this.promise=new Promise((function(t,a){var r=document.createElement("script");r.onload=t,r.onerror=a,r.type="text/javascript",r.src=e,document.body.appendChild(r)})).then((function(){var e=t();return e&&"ymaps"!==e&&(0,eval)("var ymaps = ".concat(e,";")),new Promise((function(e){return ymaps.ready(e)}))}))),this.promise}};let t=null;var a={name:"v-ymap",render(e){return e("div",{class:"yandex-maps_container"},[e("div",{class:"yandex-maps",ref:"map"},[e("div",{class:"yandex-maps_slots"},[this.$slots.default])])])},props:{YMAPS_KEY:{type:String,default:""},YMAPS_LANG:{type:String,default:"ru_RU"},YMAPS_VERSION:{type:String,default:"2.1"},center:{type:Array,required:!0,validator:e=>2===e.length&&!Number.isNaN(e[0])&&!Number.isNaN(e[1])},zoom:{type:Number,required:!0},behaviors:{type:Array,default:()=>["default"]},controls:{type:Array,default:()=>["default"]},margin:{type:Array,default:()=>[],validator(e){for(let t of e)if(Number.isNaN(t))return!1;return!0}},type:{type:String,default:"yandex#map",validator:e=>["yandex#map","yandex#satellite","yandex#hybrid"].includes(e)},options:{type:Object,default:()=>({})}},data:()=>({maps:null,map:null}),async mounted(){this.maps=await async function(a){if(null===t){let r={YMAPS_VERSION:"2.1",...a};t=await e.load(`https://api-maps.yandex.ru/${r.YMAPS_VERSION}/?${"YMAPS_KEY"in r&&r.YMAPS_KEY.length>0?`apiKey=${r.YMAPS_KEY}&`:""}${"YMAPS_LANG"in r?`lang=${r.YMAPS_LANG}`:""}`)}return t}({YMAPS_KEY:this.YMAPS_KEY,YMAPS_LANG:this.YMAPS_LANG,YMAPS_VERSION:this.YMAPS_VERSION}),this.map=new this.maps.Map(this.$refs.map,{center:this.center,zoom:this.zoom,behaviors:this.behaviors,controls:this.controls,margin:this.margin,type:this.type},{...this.options}),this.setGeoObjects(await this.getGeoObjects(this.maps));for(let e of this.$children)e.$on("updated",(async e=>{this.setGeoObjects(await this.getGeoObjects(this.maps))}))},methods:{getGeoObjects(e){let t=[];for(let a of this.$children)t.push(a.getGeoObject(e));return Promise.all(t)},setGeoObjects(e){this.map.geoObjects.removeAll();for(let t of e)this.map.geoObjects.add(t)}}};export default a;
