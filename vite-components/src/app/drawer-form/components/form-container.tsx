import { memo, useEffect } from 'react';
import { Form, FormProps, type FormInstance, Button } from 'antd';
// import { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import { Callbacks } from 'rc-field-form/lib/interface';
import { formQueryParams } from './queryParams';
import { formListProps } from './type';
import ItemContainer from './render-item';
import { map, mapKeys } from 'lodash';

interface FormsProps extends FormProps {}

interface FormContainerProps<Values = any> {
  containerFormClassName?: string;
  forms: FormsProps;
  onsubmit?: (validateFields?: any) => void;
  onValuesChange?: (changedValues?: any, allValues?: any) => void;
  children?: React.ReactNode;
  formlist: formListProps[];
  useForm: FormInstance<Values>;
  onFinish?: Callbacks<Values>['onFinish'];
  showSearchButton?: boolean;
  formType: 'drawer' | 'search';
  showResert?: boolean;
}

const FormContainer = memo(({ containerFormClassName, forms, onValuesChange, onFinish, formlist, useForm, showSearchButton = true, formType, showResert = false }: FormContainerProps) => {
  const [form] = Form.useForm(useForm);
  useEffect(() => {
    function submit(event: KeyboardEvent) {
      if (event?.code === 'Enter' || event?.which == 13) {
        form.submit();
      }
    }
    document.removeEventListener('keydown', submit, false);
    document.addEventListener('keydown', submit, true);
    () => document.removeEventListener('keydown', submit, false);
  }, []);
  return (
    <Form
      {...forms}
      className={`drawer-form-container ${containerFormClassName} gap-2`}
      form={form}
      name="drawerForm"
      key={'formKey'}
      onFinish={(formData) => onFinish && formQueryParams(formlist, formData, onFinish)}
      onValuesChange={async (changedValues, allValues) => {
        if (formType == 'search') {
          await form
            ?.validateFields()
            ?.then((values) => {
              // 清空
              const formEmpty = () => {
                const list = form.getFieldsValue();
                if (Object.keys(list).length > 0) {
                  for (let i = 0; i < Object.keys(list).length; i++) {
                    form.setFieldsValue({ [Object.keys(list)[i]]: null });
                  }
                }
              };
              // 某查询值改变就触发查询
              mapKeys(changedValues, (value, key) => map(formlist, (x) => x?.toSearch && x.name == key && onValuesChange && formQueryParams(formlist, allValues, onValuesChange, formEmpty)));
              !showSearchButton && onValuesChange && formQueryParams(formlist, allValues, onValuesChange, formEmpty);
            })
            .catch(({ values, errorFields, outOfDate }) => console.warn('FAILED', values, errorFields, outOfDate));
          console.log(changedValues, allValues, '===change form item of value');
        }
      }}
    >
      <ItemContainer {...{ formlist }} />
      {formType == 'search' && (
        <Form.Item colon={false}>
          {showSearchButton ? (
            <Button type="primary" onClick={() => form.submit()} htmlType="submit" ghost>
              查询
            </Button>
          ) : null}
          {showResert && (
            <Button className="ml-2" onClick={() => form.resetFields()}>
              重置
            </Button>
          )}
        </Form.Item>
      )}
    </Form>
  );
});

export default FormContainer;
