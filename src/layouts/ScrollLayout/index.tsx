import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useMemo,
  ElementRef,
} from 'react';
import BScroll from 'better-scroll';
import classnames from 'classnames';
// import { useDebounceFn } from '@umijs/hooks';
import { Loading } from 'components';
import { debounce } from 'utils/tool';

import './style.less';

interface IScrollProps {
  direction?: 'vertical' | 'horizental';
  click?: boolean;
  refresh?: boolean;
  onScroll?: any;
  ref?: any;
  pullUpLoading?: boolean;
  pullDownLoading?: boolean;
  pullUp?: () => void;
  pullDown?: () => void;
  bounceTop?: boolean;
  bounceBottom?: boolean;
  children?: React.ReactNode;
}

const defaultProps: IScrollProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  pullUpLoading: false,
  pullDownLoading: false,
  bounceTop: true,
  bounceBottom: true,
};

const Scroll: React.SFC<IScrollProps> = forwardRef((props: IScrollProps, ref: ElementRef<any>) => {
  const [bScroll, setBScroll] = useState<any>();

  const scrollContaninerRef = useRef<any>();

  const {
    direction,
    click,
    refresh,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom,
    pullUp,
    pullDown,
    onScroll,
  } = props;

  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 50);
  }, [pullUp]);

  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 50);
  }, [pullDown]);

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', onScroll);
    return () => {
      bScroll.off('scroll', onScroll);
    };
  }, [onScroll, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullUp) return;
    const handlePullUp = () => {
      //判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    };
    bScroll.on('scrollEnd', handlePullUp);
    return () => {
      bScroll.off('scrollEnd', handlePullUp);
    };
  }, [pullUp, pullUpDebounce, bScroll]);

  useEffect(() => {
    if (!bScroll || !pullDown) return;
    const handlePullDown = pos => {
      //判断用户的下拉动作
      if (pos.y > 30) {
        pullDownDebounce();
      }
    };
    bScroll.on('touchEnd', handlePullDown);
    return () => {
      bScroll.off('touchEnd', handlePullDown);
    };
  }, [pullDown, pullDownDebounce, bScroll]);

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    },
  }));

  const PullUpdisplayStyle = pullUpLoading ? { display: '' } : { display: 'none' };
  const PullDowndisplayStyle = pullDownLoading ? { display: '' } : { display: 'none' };

  const containerCls = classnames({
    'l-scroll': true,
    'l-scroll-up': pullUpLoading,
    'l-scroll-down': pullDownLoading,
  });

  return (
    <div className={containerCls} ref={scrollContaninerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <div style={PullUpdisplayStyle} className="l-scroll-loading-up">
        <Loading />
      </div>
      {/* 顶部下拉刷新动画 */}
      <div style={PullDowndisplayStyle} className="l-scroll-loading-down">
        <Loading />
      </div>
    </div>
  );
});

Scroll.defaultProps = defaultProps;

export default Scroll;
