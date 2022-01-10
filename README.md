### `useSafeForceUpdate()`

[![Stable Release](https://img.shields.io/npm/v/use-safe-force-update.svg)](https://npm.im/use-safe-force-update)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://npm.im/use-safe-force-update)
[![gzip size](http://img.badgesize.io/https://unpkg.com/use-safe-force-update@latest/dist/use-safe-force-update.umd.production.min.js?compression=gzip)](https://unpkg.com/use-safe-force-update@latest/dist/use-safe-force-update.umd.production.min.js)
[![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

---

There are cases where you need to force updates while being unsure whether the component is mounted. For making things simpler, I present you `useSafeForceUpdate`:

```typescript
const forceUpdate = useSafeForceUpdate()

React.useMemo(() => {
  setTimeout(() => {
    forceUpdate() // React will not ever complain about this!
  }, [Math.random() * 1000])
}, [])
```

## Authors

- Ludvig Aldén [@ludvigalden](https://github.com/ludvigalden)

---

[MIT License.](https://github.com/ludvigalden/use-safe-force-update/blob/master/LICENSE)
