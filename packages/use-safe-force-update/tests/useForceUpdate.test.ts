import { act, renderHook } from '@testing-library/react-hooks';
import { useCallback, useRef } from 'react';

import { useForceUpdate } from '../src/useForceUpdate';

describe('useForceUpdate', () => {
  it('forces update after mutating ref', () => {
    const { result } = renderHook(() => {
      const value = useRef({ number: 0 });
      const forceUpdate = useForceUpdate();

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
