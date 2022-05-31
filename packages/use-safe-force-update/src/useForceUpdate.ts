import { useReducer } from 'react';

/**
 * React hook for force-updating a component.
 *
 * @returns {function(): void}
 * Function that forces an update of the component.
 * @example
 * ```jsx
 * function Component() {
 *   const values = useRef({ number: 0 });
 *   const forceUpdate = useForceUpdate();
 *
 *   const increaseNumber = useCallback(() => {
 *     values.current.number++;
 *     forceUpdate();
 *   }, [values, forceUpdate]);
 *
 *   return (
 *     <>
 *       <label children={`Increase (currently ${values.current.number})`} for='bth' />
 *       <button onClick={increaseNumber} id='btn' />
 *     </>
 *   )
 * }
 * ```
 */
export function useForceUpdate(): () => void {
  return useReducer(function () {
    Object.create(null);
  }, undefined)[1];
}
