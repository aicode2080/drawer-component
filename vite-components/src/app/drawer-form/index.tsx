import { memo, useState } from 'react';
import DrawerForm from './components/drawer-form';
import classes from './index.module.scss';
import { Select } from 'antd';

export default memo(function Drawer() {
  const [visible, setVisible] = useState(false);
  return (
    <div className={classes['drawer-form-container']}>
      <div style={{ color: '#000', cursor: 'pointer' }} onClick={() => setVisible(true)}>
        打开
      </div>
      <DrawerForm
        type="add"
        onsubmit={(v) => {}}
        // modal={{
        //   title: '新增',
        //   open: visible,
        //   onCancel: () => {
        //     setVisible(false);
        //   },
        // }}
        drawer={{
          title: '新增',
          open: visible,
          prefixCls: '',
          onClose: () => {
            setVisible(false);
          },
        }}
        modalContainerClassName={classes.FormContainer}
        formlist={[
          {
            type: 'text', // 输入框
            name: 'text',
            label: '文本输入',
            placeholder: '请输入文本输入',
            rules: [{ required: true, message: '请输入文本输入' }],
            // toSearch: true,
            onChange: (e) => {
              console.log(e.target.value);
            },
          },
          {
            type: 'number', // 数字
            name: 'number', // key
            label: '数字输入',
            placeholder: '请输入数字输入',
            rules: [{ required: true, message: '请输入数字输入' }],
            onChange: (e) => {
              console.log(e);
            },
          },
          {
            type: 'upload', // 上传
            name: 'upload',
            label: '点击上传',
            buttonType: 'button',
            fileList: [],
            placeholder: '请选择上传文件',
            rules: [{ required: true, message: '请选择上传文件' }],
            onChange: (e) => {
              console.log(e);
            },
          },
          {
            type: 'custom', // 输入框
            name: 'custom1',
            label: '发电集团',
            // placeholder: '请输入发电集团',
            element: Select,
            children: <>1111</>, // 优先级高
            elementProps: {},
            // rules: [{ required: true, message: '请输入机组名称' }],
            // onChange: (e) => {
            //   console.log(e.target.value);
            // },
          },
          {
            type: 'checkBox', // 输入框
            name: 'xuanze',
            label: '发电集团',
            children: <>发电集团</>,
            // defaultChecked: true,
            // checked: true,
            rules: [
              {
                validator: (_, value) => {
                  return value ? Promise.resolve() : Promise.reject(new Error('请选择'));
                },
              },
            ],
          },
          {
            type: 'datePicker', // 输入框
            name: 'startDate',
            label: '开始日期',
            rules: [
              {
                validator: (_, value) => {
                  return value ? Promise.resolve() : Promise.reject(new Error('请选择日期'));
                },
              },
            ],
          },
          {
            type: 'datePicker', // 输入框
            name: 'monthDate',
            label: '开始日期',
            picker: 'month',
            rules: [
              {
                validator: (_, value) => {
                  return value ? Promise.resolve() : Promise.reject(new Error('请选择日期'));
                },
              },
            ],
          },
          {
            type: 'datePicker', // 输入框
            name: 'weeker',
            label: '开始日期',
            picker: 'week',
            rules: [
              {
                validator: (_, value) => {
                  return value ? Promise.resolve() : Promise.reject(new Error('请选择日期'));
                },
              },
            ],
          },
          {
            type: 'rangePicker', // 输入框
            name: 'rangePicker',
            label: '时间',
            rules: [
              {
                validator: (_, value) => {
                  return value ? Promise.resolve() : Promise.reject(new Error('请选择日期'));
                },
              },
            ],
          },
          {
            type: 'switch', // 输入框
            name: 'qiehuan',
            label: '发电集团',
            children: <>发电极端</>,
            // defaultChecked: true,
            rules: [
              {
                validator: (_, value) => {
                  return value ? Promise.resolve() : Promise.reject(new Error('请选择'));
                },
              },
            ],
          },
          {
            type: 'select', // 选择框
            name: 'isXh',
            label: '是否参与现货',
            placeholder: '请选择是否参与现货',
            defaultValue: 0,
            treeData: [
              { name: '是', title: '是', value: 1 },
              { name: '否', title: '否', value: 0 },
            ],
            rules: [{ required: true, message: '请选择是否参与现货' }],
          },
        ]}
        forms={{
          initialValues: { xuanze: true },
          layout: 'horizontal',
        }}
      />
    </div>
  );
});
