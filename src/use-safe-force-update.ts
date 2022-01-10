import React from "react";

export function useUnsafeForceUpdate(): () => void {
    return React.useReducer(() => Object.create(null), undefined)[1] as any;
}

/**
 * A safe form of force updating a component. The basic quality is to not perform any updates when the component
 * is not unmounted. In addition, it also allows for queueing a update for when the component *has* been mounted,
 * which is simply done by calling the function before the component has been mounted.
 */
export function useMountedForceUpdate(): () => void {
    const unsafeForceUpdate = useUnsafeForceUpdate();
    const lifecycle = React.useRef({ queuedUpdate: false, mounted: false, unmounted: false });
    React.useEffect(() => {
        lifecycle.current.mounted = true;
        if (lifecycle.current.queuedUpdate) {
            lifecycle.current.queuedUpdate = false;
            unsafeForceUpdate();
        }
        return () => {
            lifecycle.current.unmounted = true;
        };
    }, []);
    return function mountedForceUpdate() {
        if (lifecycle.current.mounted) {
            if (!lifecycle.current.unmounted) {
                unsafeForceUpdate();
            }
        } else {
            lifecycle.current.queuedUpdate = true;
        }
    };
}

export { useMountedForceUpdate as useSafeForceUpdate }