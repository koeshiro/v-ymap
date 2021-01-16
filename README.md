# v-ymap

vue plugin for yandex map

Building project
```bash
npm run build
```
Examples
```bash
npm run test:server
```
for start test server with examples from ***./examples*** folder.

## Components

| Name              | Option                  | Type     | required  | example       | y.docs |
| ---------------   | :---------------------: | :------: | :-------: | :-----------: | -----: |
| v-ymap            |                         |          |           |               | [Map](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Map.html) |
|                   | center                  | Number[] | **true**  | [55.55,55.55] |
|                   | zoom                    | Number   | **true**  | 10            |
|                   | behaviors               | Array    | **false** | ['default']   |
|                   | controls                | Array    | **false** | ['default']   |
|                   | margin                  | Number[] | **false** | [10,10,10,10] |
|                   | type                    | String   | **false** | 'yandex#map'  |
|                   | options                 | Object   | **false** | {}            |
| v-ymap-collection |                         |          |           |               | [Collection](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Collection.html) |
|                   | options                 | Object   | **false** | {}            |
| v-ymap-clusterer  |                         |          |           |               | [Clusterer](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Clusterer.html) |
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
| v-ymap-circle     |                         |          |           |               | [Circle](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Circle.html) |
|                   | geometry                | Number[] | **true**  | [55.55,55.55] |
|                   | properties              | Object   | **false** | { "balloonContentBody": "some text" } |
|                   | options                 | Object   | **false** | {} |
| v-ymap-placemark  |                         |          |           |               | [Placemark](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Placemark.html) |
|                   | geometry                | Number[] | **true**  | [55.55,55.55] |
|                   | properties              | Object   | **false** | { "balloonContentBody": "some text" } |
|                   | options                 | Object   | **false** | {} |
| v-ymap-polygon    |                         |          |           |               | [Polygon](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Polygon.html) |
|                   | geometry                | Number[] | **true**  | [[[55.75, 37.80],[55.80, 37.90],[55.75, 38.00],[55.70, 38.00],[55.70, 37.80]]] |
|                   | properties              | Object   | **false** | { "balloonContentBody": "some text" } |
|                   | options                 | Object   | **false** | {} |
| v-ymap-polyline   |                         |          |           |               | [Polyline](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Polyline.html) |
|                   | geometry                | Number[] | **true**  | [[55.80, 37.50],[55.80, 37.40],[55.70, 37.50],[55.70, 37.40]] |
|                   | properties              | Object   | **false** | { "balloonContentBody": "some text" } |
|                   | options                 | Object   | **false** | {} |
| v-ymap-rectangle  |                         |          |           |               | [Rectangle](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Rectangle.html) |
|                   | geometry                | Number[] | **true**  | [[55.665, 37.66],[55.64, 37.53]] |
|                   | properties              | Object   | **false** | { "balloonContentBody": "some text" } |
|                   | options                 | Object   | **false** | {} |
| v-ymap-route      |                         |          |           |               | [route](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/route.html) |
|                   | points                  | Array    | **true**  | ['Москва, пр. Мира','Москва, ул. Мясницкая'] |
|                   | params                  | Object   | **false** | {} |
