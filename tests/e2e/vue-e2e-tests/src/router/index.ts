import { createRouter, createWebHistory } from 'vue-router'
import YMap from "@/pages/YMap";
import YRout from "@/pages/YRout";
import YPlacemark from "@/pages/YPlacemark";
import YPolygon from "@/pages/YPolygon";
import YPolyline from "@/pages/YPolyline";
import YRectangle from "@/pages/YRectangle";
import YCircle from "@/pages/YCircle";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/y-map',
      name: 'YMap',
      component: YMap
    },
    {
      path: '/y-rout',
      name: 'YRout',
      component: YRout
    },
    {
      path: '/y-placemark',
      name: 'YPlacemark',
      component: YPlacemark
    },
    {
      path: '/y-polygon',
      name: 'YPolygon',
      component: YPolygon
    },
    {
      path: '/y-polyline',
      name: 'YPolyline',
      component: YPolyline
    },
    {
      path: '/y-rectangle',
      name: 'YRectangle',
      component: YRectangle
    },
    {
      path: '/y-circle',
      name: 'YCircle',
      component: YCircle
    },
  ]
})

export default router
