import React from 'react';
import './style.less';
interface ButtonGroupsProps {
  children?: React.ReactNode;
}
const ButtonGroups = (props: ButtonGroupsProps) => {
  return <div className="c-btn-group"> {props.children} </div>;
};

export default ButtonGroups;
