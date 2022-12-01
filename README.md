# v-ymap
Vue components for work with yandex map. 

### Examples
```vue
<y-map :center="[11.111111,11.111111]" :zoom="10" />
```
```vue
<y-map :center="[11.111111,11.111111]" :zoom="10">
 <y-route :points="['City 17', 'City 20']"></y-route>
</y-map>
```


Install Project as dependency
```sh
npm i v-ymap
```
Building project
```bash
npm run build
```

## Components

### y-map
General component of map, other components using in v-ymap default slot.
| Name              | Option                  | Type     | required  | example       | y.docs |
| ---------------   | :---------------------: | :------: | :-------: | :-----------: | -----: |
| y-map             |                         |          |           |               | [Map](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Map.html) |
|                   | YMAPS_KEY               | String   | **false** |               |
|                   | YMAPS_LANG              | String   | **false** |               |
|                   | YMAPS_VERSION           | String   | **false** |               |
|                   | YMAPS_LOAD_BY_REQUIRE   | Boolean  | **false** | true          |
|                   | center                  | Number[] | **true**  | [55.55,55.55] |
|                   | zoom                    | Number   | **true**  | 10            |
|                   | behaviors               | Array    | **false** | ['default']   |
|                   | controls                | Array    | **false** | ['default']   |
|                   | margin                  | Number[] | **false** | [10,10,10,10] |
|                   | type                    | String   | **false** | 'yandex#map'  |
|                   | options                 | Object   | **false** | {}            |

### y-map-collection
Basic implementation of an object collection on the map.
| Name              | Option                  | Type     | required  | example       | y.docs |
| ---------------   | :---------------------: | :------: | :-------: | :-----------: | -----: |
| y-map-collection  |                         |          |           |               | [Collection](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Collection.html) |
|                   | options                 | Object   | **false** | {}            |

### y-map-clusterer
Clusterizes objects in the visible area of the map. If the object does not fall within the visible area of the map, it will not be added to the map.
| Name              | Option                  | Type     | required  | example       | y.docs |
| ---------------   | :---------------------: | :------: | :-------: | :-----------: | -----: |
| y-map-clusterer   |                         |          |           |               | [Clusterer](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Clusterer.html) |
|                   | gridSize                | Number   | **false** | 64            |
|                   | groupByCoordinates      | Boolean  | **false** | false         |
|                   | hasBalloon              | Boolean  | **false** | true          |
|                   | hasHint                 | Boolean  | **false** | true          |
|                   | margin                  | Number[] | **false** | [10,10,10,10] |
|                   | maxZoom                 | Number   | **false** | Infinity      |
|                   | minClusterSize          | Number   | **false** | 2             |
|                   | preset                  | String   | **false** |               |
|                   | showInAlphabeticalOrder | Boolean  | **false** | false         |
|                   | useMapMargin            | Boolean  | **false** | true          |
|                   | viewportMargin          | Number   | **false** | 128           |
|                   | zoomMargin              | Number   | **false** | 0             |

### y-map-circle
Circle. A geo object with the geometry
| Name              | Option                  | Type     | required  | example       | y.docs |
| ---------------   | :---------------------: | :------: | :-------: | :-----------: | -----: |
| y-map-circle      |                         |          |           |               | [Circle](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Circle.html) |
|                   | geometry                | Number[] | **true**  | [55.55,55.55] |
|                   | properties              | Object   | **false** | { "balloonContentBody": "some text" } |
|                   | options                 | Object   | **false** | {} |

### y-map-balloon
Balloon. A geo object with the geometry
| Name              | Option                  | Type            | required  | example         | y.docs |
| ---------------   | :---------------------: | :-------------: | :-------: | :-------------: | -----: |
| y-map-balloon     |                         |                 |           |                 |        |
|                   | autoPan                 | Boolean         | **false** | true            | [Ballon](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Balloon.html) |
|                   | autoPanCheckZoomRange   | Boolean         | **false** | false           |
|                   | autoPanDuration         | Number          | **false** | 500             |
|                   | autoPanMargin           | Number|Number[] | **false** | 34              |
|                   | autoPanUseMapMargin     | Boolean         | **false** | true            |
|                   | closeButton             | Boolean         | **false** |                 |
|                   | closeTimeout            | Number          | **false** | 700             |
|                   | contentLayout           | Function|String | **false** |                 |
|                   | interactivityModel      | String          | **false** |                 |
|                   | layout                  | Function|String | **false** | islands#balloon |
|                   | maxHeight               | Number          | **false** |                 |
|                   | maxWidth                | Number          | **false** |                 |
|                   | minHeight               | Number          | **false** |                 |
|                   | offset                  | Number[]        | **false** |                 |
|                   | openTimeout             | Number          | **false** | 150             |
|                   | pane                    | String          | **false** | 'balloon'       |
|                   | panelContentLayout      | Function|String | **false** | null            |
|                   | panelMaxHeightRatio     | Number          | **false** |                 |
|                   | panelMaxMapArea         | Number          | **false** |                 |
|                   | shadow                  | Boolean         | **false** | true            |
|                   | shadowLayout            | Function|String | **false** |                 |
|                   | shadowOffset            | Number[]        | **false** |                 |
|                   | zIndex                  | String          | **false** |                 |

### y-map-placemark
Placemark. A geo object with the geometry
| Name              | Option                  | Type     | required  | example       | y.docs |
| ---------------   | :---------------------: | :------: | :-------: | :-----------: | -----: |
| y-map-placemark   |                         |          |           |               | [Placemark](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Placemark.html) |
|                   | geometry                | Number[] | **true**  | [55.55,55.55] |
|                   | properties              | Object   | **false** | { "balloonContentBody": "some text" } |
|                   | options                 | Object   | **false** | {} |

### y-map-polygon
Polygon. A geo object with the geometry
| Name              | Option                  | Type     | required  | example       | y.docs |
| ---------------   | :---------------------: | :------: | :-------: | :-----------: | -----: |
| y-map-polygon     |                         |          |           |               | [Polygon](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Polygon.html) |
|                   | geometry                | Number[] | **true**  | [[[55.75, 37.80],[55.80, 37.90],[55.75, 38.00],[55.70, 38.00],[55.70, 37.80]]] |
|                   | properties              | Object   | **false** | { "balloonContentBody": "some text" } |
|                   | options                 | Object   | **false** | {} |

### y-map-polyline
Polyline. A geo object with the geometry
| Name              | Option                  | Type     | required  | example       | y.docs |
| ---------------   | :---------------------: | :------: | :-------: | :-----------: | -----: |
| y-map-polyline    |                         |          |           |               | [Polyline](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Polyline.html) |
|                   | geometry                | Number[] | **true**  | [[55.80, 37.50],[55.80, 37.40],[55.70, 37.50],[55.70, 37.40]] |
|                   | properties              | Object   | **false** | { "balloonContentBody": "some text" } |
|                   | options                 | Object   | **false** | {} |

### y-map-rectangle
Rectangle. A geo object with the geometry
| Name              | Option                  | Type     | required  | example       | y.docs |
| ---------------   | :---------------------: | :------: | :-------: | :-----------: | -----: |
| y-map-rectangle   |                         |          |           |               | [Rectangle](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/Rectangle.html) |
|                   | geometry                | Number[] | **true**  | [[55.665, 37.66],[55.64, 37.53]] |
|                   | properties              | Object   | **false** | { "balloonContentBody": "some text" } |
|                   | options                 | Object   | **false** | {} |

### y-map-route
Plots a route through the specified points.
| Name              | Option                  | Type     | required  | example       | y.docs |
| ---------------   | :---------------------: | :------: | :-------: | :-----------: | -----: |
| y-map-route       |                         |          |           |               | [route](https://yandex.com/dev/maps/jsapi/doc/2.1/ref/reference/route.html) |
|                   | points                  | Array    | **true**  | ['Москва, пр. Мира','Москва, ул. Мясницкая'] |
|                   | params                  | Object   | **false** | {} |
