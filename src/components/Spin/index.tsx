import React from 'react';
import Loader from 'react-loader-spinner';
import './style.less';

export default function Spin() {
  return (
    <div className="c-spin">
      <div className="c-spin-content">
        <Loader
          type="Oval"
          color="#ee764e"
          height={40}
          width={40}
          timeout={10000} //3 secs
        />
        <div className="c-spin-text">加载中...</div>
      </div>
    </div>
  );
}
