import React, { useState } from 'react';
import classNames from 'classnames';

const Code = props => {
  const [codeExpand, setCodeExpand] = useState(false);
  const itemTitleClassName = classNames(
    `${props.prefixCls}-item-code-wrapper`,
    !codeExpand && `${props.prefixCls}-item-code-hide`,
  );

  const kvLine = String(Object.entries(JSON.parse(props.content as string))[0]);

  return (
    <div className={itemTitleClassName}>
      <pre>
        {codeExpand && JSON.stringify(JSON.parse(props.content as string), null, 2)}
        {!codeExpand && kvLine && kvLine.slice(0, 20)}
        {!codeExpand && <a onClick={() => setCodeExpand(true)}>点击展开</a>}
      </pre>
    </div>
  );
};

export default Code;
