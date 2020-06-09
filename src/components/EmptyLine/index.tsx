import React from 'react';
import classNames from 'classnames';
import './style.less';

export interface IEmptyLineProps {
  className?: string;
  style?: React.CSSProperties;
  height?: number;
}

const EmptyLine = ({ height = 20, className, style }: IEmptyLineProps) => {
  const emptyLineClassName = classNames('c-empty-line', className);
  const emptyLineStyle = {
    height,
    ...style,
  };
  return <div className={emptyLineClassName} style={emptyLineStyle} />;
};

export default EmptyLine;
