import { memo } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

export default memo(function Home() {
  const loadData = useLoaderData();
  console.log(loadData, '路由数据');

  return (
    <>
      <h1>首页</h1>
      <Link to={'form-search'}>搜索组件</Link>
      <br />
      <Link to={'drawer-form'}>新增编辑弹窗组件</Link>
    </>
  );
});
