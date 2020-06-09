import React from 'react';
import classnames from 'classnames';
import './style.less';
export interface IOrderItemProps {
  title: string | React.ReactNode;
  subTitle: string | React.ReactNode;
  extra: string | React.ReactNode;
  subExtra: string | React.ReactNode;
  dataItem: any;
  onClick?: (any) => void;
  status?: 'success' | 'info' | 'error' | 'warning';
  className?: string;
  style?: React.CSSProperties;
}

const OrderItem = (props: IOrderItemProps) => {
  // console.info(props.status);
  const wrapperClass = classnames('c-orderItem', props.status && `c-orderItem-${props.status}`);

  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.dataItem);
    }
  };

  return (
    <div onClick={handleClick} className={wrapperClass}>
      <div className="c-orderItem-title">
        <div className="c-orderItem-title-main">{props.title}</div>
        <div className="c-orderItem-title-sub">{props.subTitle}</div>
      </div>
      <div className="c-orderItem-extra">
        <div className="c-orderItem-extra-main">{props.extra}</div>
        <div className="c-orderItem-extra-sub">{props.subExtra}</div>
      </div>
    </div>
  );
};

export default OrderItem;
