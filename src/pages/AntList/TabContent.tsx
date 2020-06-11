import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { PullToRefresh } from 'antd-mobile';
import useAsyncRetry from 'hooks/useAsyncRetry';
import { OrderList } from 'components';
import Api from 'utils/api';
import Http, { getCookieByName } from 'utils/http';

interface ITabContentProps {
  url: string;
}

const statusMap = {
  init: 'info',
  approving: 'info',
  rejected: 'error',
  approved: 'success',
  building: 'info',
  deploying: 'info',
  done: 'success',
};

const TabContent = (props: ITabContentProps) => {
  const history = useHistory();
  const listRef = useRef<any>(null);
  const state = useAsyncRetry(async () => {
    // const response = await Http.get(Api.orderList);
    const response = await Http.get(props.url);
    const items = (response as any) || [];

    function renderSubTitle(item) {
      return <span>审批人：{item.approver}</span>;
    }

    return items.map(item => {
      return {
        dataItem: item,
        title: item.title,
        subTitle: renderSubTitle(item),
        // status: statusMap[item.status] || 'info',
        status: item.status,
        extra: (
          <span>
            来自 <b style={{ color: '#ee764e' }}>{item.from_msg}</b>
          </span>
        ),
        subExtra: item.updated,
      };
    });
  }, [Api.orderList]);

  const wrapperStyle = {
    height: `calc(100vh - ${46.5}px)`,
  };

  const handleListClick = dataItem => {
    const pathname = `/order/${dataItem.id}`;

    // history.push({
    //   pathname,
    //   search: queryString.stringify({
    //     from: dataItem.from,
    //   }),
    // });
  };
  // console.info('TabContent==>', Api.orderList, state);
  return (
    <div>
      <PullToRefresh
        getScrollContainer={() => undefined}
        distanceToRefresh={50}
        damping={100}
        indicator={{}}
        direction={'down'}
        refreshing={state.loading}
        onRefresh={state.retry}
        style={wrapperStyle}
      >
        <OrderList onClick={handleListClick} dataSource={state.value || []} />
      </PullToRefresh>
    </div>
  );
};

export default TabContent;
