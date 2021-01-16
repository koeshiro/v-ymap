# v-ymap
========
vue plugin for yandex map
-------------------------

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
=============
| Name              | Option     | Type     | required  | example       | y.docs |
| ---------------   | :--------: | :------: | :-------: | :-----------: | -----: |
| v-ymap            |            |          |           |               | [Map](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Map.html) |
|                   | center     | Number[] | **true**  | [55.55,55.55] |
|                   | zoom       | Number   | **true**  | 10            |
|                   | behaviors  | Array    | **false** | ['default']   |
|                   | controls   | Array    | **false** | ['default']   |
|                   | margin     | Number[] | **false** | [10,10,10,10] |
|                   | type       | String   | **false** | 'yandex#map'  |
|                   | options    | Object   | **false** | {}            |
| v-ymap-collection |            |          |           |               | [Collection](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Collection.html) |
|                   | options    | Object   | **false** | {}            |

| v-ymap-circle     |            |          |           |               | [Circle](https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/Circle.html) |
|                   | geometry   | Number[] | **true**  | [55.55,55.55] |
|                   | properties | Object   | **false** | { "balloonContentBody": "some text" } |
|                   | options    | Object   | **false** | {} |

