// 类型，常量
export type page = {
  page: number;
  pageSize: number;
  total?: number;
  isFinish?: string;
  title?: string;
};

export type paramsProps = {
  setName: string;
  isHeating: number | string;
  refresh?: string | number;
};

export type tableProps = {
  id?: string;
};
