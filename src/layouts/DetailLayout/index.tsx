import React, { useState, useCallback, Children, isValidElement, cloneElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';
import { Icon, EmptyLine } from 'components';
import { NavBar } from 'antd-mobile';
import './style.less';

interface IDetailLayoutProps {
  title: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const DetailLayout = (props: IDetailLayoutProps) => {
  const history = useHistory();
  const [showStatus, setShowStatus] = useState(true);

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const childrenWithProps = Children.map(props.children, child => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
      return cloneElement(child, { goBack: setShowStatus });
    }

    return child;
  });

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={history.goBack}
    >
      <div className="l-detail-layout" style={props.style}>
        {/* <NavBar mode="light" icon={<Icon name="back" />} onLeftClick={handleBack}>
          我的审批
        </NavBar> */}
        {childrenWithProps}
        <EmptyLine height={80} />
      </div>
    </CSSTransition>
  );
};

export default DetailLayout;
