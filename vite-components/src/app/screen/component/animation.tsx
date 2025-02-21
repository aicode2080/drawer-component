import { memo, forwardRef, useImperativeHandle, useRef } from 'react';
import classes from './index.module.scss';
import useResizeObserver from '@/app/hooks/useObserver';

export const AnimationComponent = memo(
  forwardRef(function AnimationComponent(props, ref) {
    const resizeRef = useRef<HTMLElement>(null);
    const refdom = useResizeObserver(resizeRef, (entry) => {
      console.log(entry);
    });
    useImperativeHandle(ref, () => {
      return {
        refreshList: () => {
          console.log('刷新列表');
        },
      };
    });
    return (
      <div style={{ color: '#000' }} ref={resizeRef}>
        动画css自定义属性
        <div className={classes.ball}></div>
      </div>
    );
  }),
);
