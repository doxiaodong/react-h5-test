import React from 'react';
import classnames from 'classnames';
import Group from './group';
import './style.less';
type IButton<P> = React.FunctionComponent<P> & {
  Group: any; //whatever type it actually is
};

interface ButtonProps {
  type?: 'success' | 'info' | 'error' | 'warning';
  style?: React.CSSProperties;
  bordered?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button: IButton<ButtonProps> = props => {
  const wrapperCls = {
    'c-btn': true,
    'c-btn-border': props.bordered,
  };
  if (props.type) {
    wrapperCls[`c-btn-${props.type}`] = true;
  }
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <div onClick={handleClick} className={classnames(wrapperCls)} style={props.style}>
      {props.children}
    </div>
  );
};

Button.Group = Group;
export default Button;
