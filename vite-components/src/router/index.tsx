import * as React from 'react';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';

type nameProps = {
  name: string;
  children: [];
};

const pages = import.meta.glob('../app/**/page.ts', {
  eager: true,
  import: 'default',
});
const commComponent = import.meta.glob('../app/**/index.tsx');
const routers: RouteObject & nameProps[] = Object.entries(pages)?.map(([path, meta]) => {
  const pagePath = path;
  path = path.replace('../app', '').replace('/page.ts', '');
  path = path || '/';
  const name = path.split('/').filter(Boolean).join('-') || 'index';
  const commPath = pagePath.replace('page.ts', 'index.tsx');
  const promiseLoad: any = commComponent[commPath];
  const Component = React.lazy(promiseLoad);
  const components = (
    <Suspense fallback={'加载中...'}>
      <Component />
    </Suspense>
  );
  console.log(commPath, commComponent, components);
  return {
    name,
    path,
    meta,
    children: [],
    element: components,
  };
});
console.log(routers);
// const newRoutes = routers.find((item) => item.name === "index");
// const filterRoutes = routers.filter((item) => item.name !== "index");
// filterRoutes.forEach((item: any) => {
// 	newRoutes?.children && newRoutes?.children.push(item);
// });

const router = createBrowserRouter(routers, {
  basename: '/', // 前端路由前缀
});

const RouteConfig = () => (
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

export default RouteConfig;
