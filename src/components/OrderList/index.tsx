import React, { forwardRef, ElementRef } from 'react';
import classnames from 'classnames';
import OrderItem, { IOrderItemProps } from './OrderItem';
import './style.less';

interface IListProps {
  dataSource: IOrderItemProps[];
  className?: string;
  showLoadMore?: boolean;
  style?: React.CSSProperties;
  onClick?: (any) => void;
}

const List = (props: IListProps) => {
  const wrapperClass = classnames('c-orderList', props.className);

  if (props.dataSource.length === 0) {
    return <div className="c-orderList-empty">暂无数据</div>;
  }

  return (
    <div className={wrapperClass} style={props.style}>
      {props.showLoadMore && <div className="c-orderList-down-text"> 下拉刷新加载更多 </div>}
      {props.dataSource.map((item, idx) => {
        return <OrderItem onClick={props.onClick} key={`orderItem-${idx}`} {...item} />;
      })}
    </div>
  );
};

List.defaultProps = {
  dataSource: [],
};

export default List;
