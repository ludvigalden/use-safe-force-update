import { useCallback, useEffect, useRef } from 'react';

import { useForceUpdate } from './useForceUpdate';

/**
 * React hook for force-updating a component only when mounted
 * (and queuing an update for when the component is mounted.)
 *
 * @returns {function(): void}
 * Function that attempts to force an update of the component. It also allows for queueing an update
 * for when the component *has* been mounted, which is simply done by calling the function
 * before the component has been mounted.
 * @example <caption>Force-updates the component immediately after being mounted./caption>
 * function Component() {
 *   const forceUpdate = useMountedForceUpdate();
 *
 *   React.useMemo(() => {
 *     forceUpdate();
 *   }, []);
 * }
 */
export function useMountedForceUpdate(): () => void {
  const forceUpdate = useForceUpdate();

  const lifecycle = useRef({ queuedUpdate: false, mounted: false, unmounted: false });

  useEffect(function () {
    lifecycle.current.mounted = true;

    if (lifecycle.current.queuedUpdate) {
      lifecycle.current.queuedUpdate = false;
      forceUpdate();
    }

    return function () {
      lifecycle.current.unmounted = true;
    };
  }, []);

  return useCallback(
    function mountedForceUpdate() {
      if (lifecycle.current.mounted) {
        if (!lifecycle.current.unmounted) {
          forceUpdate();
        }
      } else {
        lifecycle.current.queuedUpdate = true;
      }
    },
    [lifecycle, forceUpdate],
  );
}
