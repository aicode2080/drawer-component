import { memo, forwardRef, useImperativeHandle, useRef, useCallback, useReducer } from 'react';
import { AnimationComponent } from './component/animation';
import { LocalFrage } from './component/localForage';
import reducer from './redux/slice';
import { get } from '@/utls';

export default memo(
  forwardRef(function Screen(props, ref) {
    const screenRef = useRef<any>();
    const [state, dispatch] = useReducer(reducer, { age: 30 });
    const obj = { a: [{ b: { c: 1 } }] };
    console.log(get(obj, 'a[0].b.c'));
    const refreshHandle = useCallback(() => {
      screenRef.current.refreshList();
    }, []);
    return (
      <div>
        <button onClick={refreshHandle}>点击</button>
        <AnimationComponent ref={screenRef}></AnimationComponent>
        <LocalFrage />
      </div>
    );
  }),
);
