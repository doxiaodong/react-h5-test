import React from 'react';
import classNames from 'classnames';
import Code from './code';
import './style.less';

export interface IDescriptionItem {
  title?: string;
  content?: string;
  mainTitle?: string;
  type?: 'code' | 'html';
}

export interface IDescriptionsProps {
  prefixCls?: string;
  className?: string;
  bordered?: boolean;
  style?: React.CSSProperties;
  title?: string;
  showColon?: boolean;
  titleWidth?: number | string;
  itemTitleStyle?: React.CSSProperties;
  itemContentStyle?: React.CSSProperties;
  dataSource: IDescriptionItem[];
  titleSource?: {
    from: string;
    title: string;
  };
}

const Descriptions: React.FC<IDescriptionsProps> = props => {
  const prefixCls = 'c-desc';
  const {
    itemTitleStyle = {},
    itemContentStyle = {},
    className,
    bordered = false,
    style,
    showColon = false,
  } = props;
  const descClassName = classNames(prefixCls, bordered && `${prefixCls}-bordered`, className);
  const wrapperStyle = {
    ...style,
  };
  const defaultTitleWidth = 100;
  const titleStyle = {
    width: props.titleWidth ? props.titleWidth : defaultTitleWidth,
  };

  const itemTitleClassName = classNames(
    `${prefixCls}-item-title`,
    showColon && `${prefixCls}-item-title-colon`,
  );

  const localItemTitleStyle = {
    width: props.titleWidth ? props.titleWidth : defaultTitleWidth,
    ...itemTitleStyle,
  };

  return (
    <div className={descClassName} style={wrapperStyle}>
      {props.dataSource && props.dataSource.length === 0 && '- -'}
      {props.titleSource && (
        <div className={`${prefixCls}-from-title`}>
          <h4>{props.titleSource.title}</h4>
          <div>
            {' '}
            来自 <b>{props.titleSource.from}</b>
          </div>
        </div>
      )}
      {props.title && (
        <h3 style={titleStyle} className={`${prefixCls}-title`}>
          {props.title}
        </h3>
      )}
      {props.dataSource &&
        props.dataSource.map((dataItem, dataItemIdx) => {
          const contentCls = classNames(
            `${prefixCls}-item-content`,
            dataItem.type === 'code' && `${prefixCls}-item-code`,
          );
          let content = dataItem.content ? (dataItem.content as any) : ('- -' as any);
          if (dataItem.type === 'code') {
            // content = <pre>{JSON.stringify(JSON.parse(dataItem.content as string), null, 2)}</pre>;
            content = <Code prefixCls={prefixCls} content={dataItem.content} />;
          }

          if (dataItem.type === 'html') {
            content = (
              <div
                style={{
                  textAlign: 'left',
                  ...itemContentStyle,
                }}
                className={contentCls}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            );
          }

          return dataItem.mainTitle ? (
            <div key={`${prefixCls}-${dataItemIdx}`} className={`${prefixCls}-item`}>
              <div style={localItemTitleStyle} className={`${prefixCls}-item-main-title`}>
                {dataItem.mainTitle}
              </div>
            </div>
          ) : (
            <div key={`${prefixCls}-${dataItemIdx}`} className={`${prefixCls}-item`}>
              <div style={localItemTitleStyle} className={itemTitleClassName}>
                {dataItem.title ? dataItem.title : '- -'}
              </div>

              <div style={itemContentStyle} className={contentCls}>
                {content}
              </div>
            </div>
          );
        })}
    </div>
  );
};

Descriptions.defaultProps = {
  dataSource: [],
};

export default Descriptions;
