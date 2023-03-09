# v-ymap
Vue components for work with yandex map.

## Install Project as dependency

```bash
npm i v-ymap
```

## Using

```jsx
import { YMap } from 'v-ymap';
import 'v-ymap/style.css';

<YMap center={[11.111111,11.111111]} zoom={10} />
```

### Or

```jsx
import { YMap } from 'v-ymap';

<YMap center={[11.111111,11.111111]} zoom={10} class={'someSizesClass'} style={{height:'inherit',weight:'inherit'}}/>
```

### Examples

```jsx
<YMap center={[11.111111,11.111111]} zoom={10} />
```

```jsx
<YMap center={[11.111111,11.111111]} zoom={10}>
 <YRoute points={['City 17', 'City 10']}></YRoute>
</YMap>
```

## Work with project

### Building project

```bash
npm run build
```

### Test

```bash
npm run test:server
npm run test
```
