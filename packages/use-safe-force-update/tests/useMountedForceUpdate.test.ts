import { act, renderHook } from '@testing-library/react-hooks';
import { useCallback, useRef } from 'react';

import { useMountedForceUpdate } from '../src/useMountedForceUpdate';

describe('useMountedForceUpdate', () => {
  // TODO: test queuing force update and warnings for React 17

  it('forces update after mutating ref', () => {
    const { result } = renderHook(() => {
      const value = useRef({ number: 0 });
      const forceUpdate = useMountedForceUpdate();

      return {
        number: value.current.number,
        increment: useCallback(() => {
          value.current.number++;
          forceUpdate();
        }, [value, forceUpdate]),
      };
    });

    expect(result.current.number).toBe(0);
    act(result.current.increment);
    expect(result.current.number).toBe(1);
  });
});
