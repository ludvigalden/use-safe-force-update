[![Stable Release](https://img.shields.io/npm/v/use-safe-force-update.svg)](https://npm.im/use-safe-force-update)
[![Types Included](https://badgen.net/npm/types/use-safe-force-update)](https://npm.im/use-safe-force-update)
[![GZip Size](https://badgen.net/bundlephobia/minzip/use-cleared-mempo)](https://npm.im/use-safe-force-update)
[![Treeshaking](https://badgen.net/bundlephobia/tree-shaking/use-safe-force-update)](https://npm.im/use-safe-force-update)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://npm.im/use-safe-force-update)
[![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE)

---

<a name="useForceUpdate"></a>

## useForceUpdate() ⇒ <code>function</code>
<p>React hook for force-updating a component.</p>

**Kind**: global function  
**Returns**: <code>function</code> - <p>Function that forces an update of the component.</p>  
**Example**  
```jsx
function Component() {
  const values = useRef({ number: 0 });
  const forceUpdate = useForceUpdate();

  const increaseNumber = useCallback(() => {
    values.current.number++;
    forceUpdate();
  }, [values, forceUpdate]);

  return (
    <>
      <label children={`Increase (currently ${values.current.number})`} for='bth' />
      <button onClick={increaseNumber} id='btn' />
    </>
  )
}
```
<a name="useMountedForceUpdate"></a>

## useMountedForceUpdate() ⇒ <code>function</code>
<p>React hook for force-updating a component only when mounted
(and queuing an update for when the component is mounted.)</p>

**Kind**: global function  
**Returns**: <code>function</code> - <p>Function that attempts to force an update of the component. It also allows for queueing an update
for when the component <em>has</em> been mounted, which is simply done by calling the function
before the component has been mounted.</p>  
**Example**  
```js
<caption>Force-updates the component immediately after being mounted./caption>
function Component() {
  const forceUpdate = useMountedForceUpdate();

  React.useMemo(() => {
    forceUpdate();
  }, []);
}
```
<a name="useSafeForceUpdate"></a>

## useSafeForceUpdate() ⇒ <code>function</code>
<p>React hook for force-updating a component only when it is mounted.
<em><strong>Note:</strong> For React 18+ users, this will not be any different from <code>useForceUpdate</code>, since
there is no warning about <code>setState</code> on unmounted components.</em></p>

**Kind**: global function  
**Returns**: <code>function</code> - <p>Function that attempts to force an update of the component.</p>  
**Example** *(Forces an update after 1-10 seconds, which React will never complain about.)*  
```js
function Component() {
  const forceUpdate = useSafeForceUpdate();

  React.useMemo(() => {
    setTimeout(() => {
      forceUpdate() // React will not ever complain about this!
    }, [1000 + Math.random() * 9000])
  }, [])
}
```

## Authors

- Ludvig Aldén [@ludvigalden](https://github.com/ludvigalden)

---

[MIT License.](https://github.com/ludvigalden/use-safe-force-update/blob/main/LICENSE)
