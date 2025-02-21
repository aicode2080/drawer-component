import * as React from 'react';
import { memo } from 'react';
import { formListProps, Option as OptionProps } from './type';
import { Input, InputNumber, DatePicker, Radio, Checkbox, Select, Form, Switch, Upload, Button } from 'antd';
import * as _ from 'lodash';

import { formItemParams } from './hooks';
import { getType } from '../../../utls/get-type';

const { Option } = Select;
const { Search } = Input;

interface FormItemProps extends formListProps {
  autoFocus?: boolean;
  hidden?: boolean;
  required?: boolean;
  options?: string[] | number[] | OptionProps[];
  onChange?: (checkedValue: any) => void;
}

class CustomUI extends React.Component<any, any> {
  triggerChange = (value: any) => {
    const { onChange, record } = this.props;
    if (onChange) {
      onChange(value);
      this.props.searchChange(value, record);
    }
  };

  render() {
    const { elementProps, value, children } = this.props;
    const Element = this.props.element;
    console.log(getType(Element), getType(this.props.children), this.props.children);
    if (children) {
      return children;
    }
    return <Element {...elementProps} onChange={this.triggerChange} value={value} />;
  }
}
const FormItem = memo((props: FormItemProps) => {
  const { type, hideForm, defaultValue, label, name, rules, placeholder, treeData, onChange, options, autoFocus, hidden, required, buttonType } = props;

  const renderItem = (prop: any) => {
    switch (type) {
      case 'number':
        return <InputNumber {...prop} />;
      case 'text':
        return <Input {...prop} />;
      case 'upload':
        return <Upload {...prop} children={buttonType === 'button' ? <Button> {label ?? '点击上传'}</Button> : ''} />;
      case 'checkBox':
        return <Checkbox {...prop} autoFocus={autoFocus} />;
      case 'radio':
        return <Radio {...prop} />;
      case 'switch':
        return <Switch {...prop} />;
      case 'radioGroup':
        return <Radio.Group {...prop} />;
      case 'checkboxGroup':
        return <Checkbox.Group onChange={onChange} options={options} />;
      case 'search':
        return <Search {...prop} />;
      case 'datePicker':
        return <DatePicker {...prop} />;
      case 'rangePicker':
        return <DatePicker.RangePicker {...prop} />;
      case 'select':
        return (
          <Select dropdownStyle={{ maxHeight: 400, minWidth: 100 }} style={{ minWidth: 100 }} placeholder={placeholder} allowClear>
            {treeData?.map((items: any) => {
              return (
                <Option key={`${items.value}${items.title}`} value={items.value}>
                  {items.title}
                </Option>
              );
            })}
          </Select>
        );
        break;
      case 'custom':
        // 自定义组件
        return <CustomUI {...prop} />;
        break;
      default:
        // 自定义组件
        return <CustomUI {...prop} />;
        break;
    }
  };

  return (
    <Form.Item
      colon={true}
      rules={rules}
      label={!!label ? label : ''}
      style={{ display: hideForm ? 'none' : '' }}
      key={name}
      name={name}
      initialValue={defaultValue}
      hidden={hidden}
      required={required}
      {...formItemParams(type, props)}
    >
      {renderItem(props)}
    </Form.Item>
  );
});

export default FormItem;
