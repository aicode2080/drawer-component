import type { Rule } from 'antd/es/form';
import { FormItemProps } from 'antd';
import React from 'react';
declare const FormTypes: [
  'number',
  'text',
  'inputSearch',
  'selectTree',
  'select',
  'rangePicker',
  'datePicker',
  'monthPicker',
  'weekPicker',
  'checkboxGroup',
  'radio',
  'switch',
  'custom',
  'checkBox',
  'radioGroup',
  'search',
  'upload',
];
export type FormType = (typeof FormTypes)[number];
type Key = string | number | bigint;

export interface formListProps extends FormItemProps {
  type: FormType;
  allowClear?: boolean;
  placeholder?: string;
  treeData?: Record<string | number, string | number>[];
  hideForm?: boolean;
  defaultValue?: string | number;
  name: string;
  label?: string;
  index?: Key | null | undefined;
  rules?: Rule[];
  onChange?: (checkedValue: any) => void;
  children?: React.ReactNode;
  element?: any;
  defaultChecked?: boolean;
  checked?: boolean;
  elementProps?: any;
  buttonType?: 'button' | 'add-icon' | '';
  fileList?: any; // upload fileList
  toSearch?: boolean;
  picker?: 'week' | 'month' | 'year';
}

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface queryParamProps {
  formList: formListProps;
  allValues: any;
  onQuerySubmit?: (validateFields?: any) => void;
  resetFields: () => void;
}
