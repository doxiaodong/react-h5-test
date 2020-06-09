import React from 'react';
import Loader from 'react-loader-spinner';
import './style.less';

export default function Loading() {
  return (
    <div className="c-loading">
      <div className="c-loading-content">
        <Loader
          type="Oval"
          color="#ee764e"
          height={10}
          width={10}
          timeout={30000} //3 secs
        />
        <div className="c-loading-text">加载中...</div>
      </div>
    </div>
  );
}
