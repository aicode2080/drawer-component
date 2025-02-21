import * as React from 'react';
import { memo } from 'react';
import { Table, Popconfirm, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table/interface';

import { tableProps } from './type';
import { pageSizeOptions } from './const';
import { TableRowSelection } from 'antd/lib/table/interface';

type pageProps = {
  page: number;
  pageSize: number;
};
/**
 * data 表格数据
 * total 总数
 * pagination 参数
 * @interface subProps
 */
interface subProps<RecordType = any> {
  rowKey?: string; // 选择索引
  data: tableProps[]; // 表格数据
  total?: number; // 总页数
  pagination: pageProps | false; // 页码数据
  loading?: boolean; // 页面加载效果
  setSearchParams?: ({ page, pageSize }: pageProps) => void;
  deleteHandler?: (id: string) => void; //删除操作 可回调id
  editHandler?: (record: any) => void; //编辑操作 可回调record
  detailHandler?: (record: any) => void; //查看详情操作 可回调record
  xWidth?: number; // 定一个x轴滚动宽度
  yHeight?: number | string; // 定一个一个y轴滚动条高度
  maxColumn?: number; // 设置每列固定宽度，如果不设置默认宽度为100
  wrapperClass?: string; // table外层class设置特殊样式
  column: ColumnsType<RecordType>;
  showOption?: boolean; // 是否显示操作项 默认展示； false 可自行重写操作项
  rowSelection?: TableRowSelection<RecordType>; // 左侧批量选择项
}

const TableContainer = memo(
  ({
    data = [],
    total,
    pagination,
    setSearchParams,
    detailHandler,
    deleteHandler,
    editHandler,
    loading,
    xWidth,
    maxColumn,
    wrapperClass,
    column,
    showOption = true,
    yHeight,
    rowSelection,
    rowKey,
  }: subProps) => {
    let columns: ColumnsType<any> = [];
    if (showOption) {
      columns = [
        {
          title: '操作',
          align: 'center',
          dataIndex: 'opreate',
          width: '130px',
          fixed: 'right',
          render: (value: any, record: any, index: number) => (
            <div className="groupButton">
              {editHandler && (
                <a title="修改" className="m-r-10" role="button" onClick={() => editHandler(record)}>
                  <i title="修改" className="iconfont icon icon-k-i-edit1" />
                </a>
              )}
              {detailHandler && <span onClick={() => detailHandler(record)} className="icon iconfont icon-chaxun m-r-10" />}
              {deleteHandler && (
                <Popconfirm placement="top" getPopupContainer={() => document.body} title="确认删除吗？" onConfirm={() => deleteHandler(record.id)}>
                  <a title="删除">
                    <i className="iconfont icon icon-k-i-delete " />
                  </a>
                </Popconfirm>
              )}
            </div>
          ),
        },
      ];
      if (column?.length > 0) {
        columns.unshift(...column);
      }
    } else {
      columns = column;
    }
    return (
      <Table
        loading={loading}
        className={`components-table-container ${wrapperClass}`}
        bordered
        columns={columns}
        dataSource={data}
        rowKey={rowKey}
        rowSelection={rowSelection}
        scroll={data?.length <= 1 ? {} : { y: yHeight || 'calc(100vh - 200px)', x: columns?.length > (maxColumn || 5) ? xWidth ?? (columns?.length || 1) * 100 : undefined }}
        pagination={
          pagination && {
            showSizeChanger: true,
            hideOnSinglePage: !Number(total),
            current: pagination?.page,
            pageSize: pagination?.pageSize,
            showQuickJumper: true,
            total: total,
            pageSizeOptions,
            showTotal: () => `共 ${total} 条`,
            onChange: (page, pageSize) => setSearchParams && setSearchParams({ ...pagination, page: pageSize != pagination?.pageSize ? 1 : page, pageSize }),
          }
        }
      />
    );
  },
);

export default TableContainer;
TableContainer.displayName = 'Table';
