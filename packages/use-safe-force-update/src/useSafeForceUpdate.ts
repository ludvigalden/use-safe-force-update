import { useCallback, useEffect, useRef } from 'react';

import { useForceUpdate } from './useForceUpdate';

/**
 * React hook for force-updating a component only when it is mounted.
 * _**Note:** For React 18+ users, this will not be any different from `useForceUpdate`, since
 * there is no warning about `setState` on unmounted components._
 *
 * @returns {function(): void}
 * Function that attempts to force an update of the component.
 * @example <caption>Forces an update after 1-10 seconds, which React will never complain about.</caption>
 * function Component() {
 *   const forceUpdate = useSafeForceUpdate();
 *
 *   React.useMemo(() => {
 *     setTimeout(() => {
 *       forceUpdate() // React will not ever complain about this!
 *     }, [1000 + Math.random() * 9000])
 *   }, [])
 * }
 */
export function useSafeForceUpdate(): () => void {
  const forceUpdate = useForceUpdate();

  const lifecycle = useRef({ mounted: false, unmounted: false });

  useEffect(function () {
    lifecycle.current.mounted = true;

    return function () {
      lifecycle.current.unmounted = true;
    };
  }, []);

  return useCallback(
    function safeForceUpdate() {
      if (lifecycle.current.mounted && !lifecycle.current.unmounted) {
        forceUpdate();
      }
    },
    [lifecycle, forceUpdate],
  );
}
