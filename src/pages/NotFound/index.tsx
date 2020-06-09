import React from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { Button, Icon, EmptyLine } from 'components';
import './style.less';

// params action pass reject
// params status success fail

const NotFound = props => {
  const history = useHistory();

  function handleBack() {
    history.push('/order');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return (
    <div className="p-notfound">
      <Icon className="p-notfound-icon" name="sad" />
      <h1>404</h1>
      <Button.Group>
        <Button type="info" onClick={handleBack}>
          {' '}
          返回首页{' '}
        </Button>
      </Button.Group>
    </div>
  );
};

export default NotFound;
// 操作成功：icon-smile e88a
// 操作失败：icon-sad e88d
