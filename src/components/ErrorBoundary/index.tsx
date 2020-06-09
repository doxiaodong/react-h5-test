import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Icon, EmptyLine } from 'components';
import './style.less';
interface IProps extends RouteComponentProps {}
export interface IStateProps {
  hasError: boolean;
}
export default class ErrorBoundary extends React.Component<IProps, IStateProps> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    // logErrorToMyService(error, errorInfo);
  }

  handleCopy = () => {
    const el = document.createElement('textarea');
    el.value = window.location.href;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  handleRetry = () => {
    this.props.history.go(0);
  };

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <div className="c-error">
          <Icon className="c-error-icon" status="error" name="sad" />

          <div className="c-error-title c-error-title-fail">
            当前网络有问题，请在链接 VPN，或者在内网环境下，使用Dchat打开使用
          </div>

          <Button.Group>
            <Button type="info" onClick={this.handleCopy}>
              {' '}
              复制链接{' '}
            </Button>
            <Button type="info" onClick={this.handleRetry}>
              {' '}
              重试{' '}
            </Button>
          </Button.Group>
        </div>
      );
    }

    return this.props.children;
  }
}
