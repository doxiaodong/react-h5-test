import React from 'react';
import classNames from 'classnames';
import './style.less';
export default function Icon(props) {
  const { className, status, ...rest } = props;
  const iconCls = classNames(
    `iconfont icon-${props.name}`,
    status && `icon-status-${status}`,
    className,
  );

  return <span className={iconCls} {...rest} />;
}
