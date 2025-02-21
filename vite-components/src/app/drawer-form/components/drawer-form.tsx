import { memo, useCallback, useEffect, useState } from 'react';

import { Form, FormProps, Drawer, Modal, DrawerProps as AntDrawerProps, ModalProps, Button } from 'antd';
import FormContainer from './form-container';

import { map } from 'lodash';

// import FormItem from './form-item';
import { formListProps } from './type';
import { DrawerPanelProps } from 'antd/es/drawer/DrawerPanel';
import { getType } from '../../../utls/get-type';
import { drawerType } from './enum';

interface DrawerProps extends AntDrawerProps, Omit<DrawerPanelProps, 'prefixCls'> {
  prefixCls?: string;
}

interface DrawerFormProps {
  type?: 'edit' | 'add' | 'display';
  formlist: formListProps[];
  containerFormClassName?: string;
  drawerContainerClassName?: string;
  modalContainerClassName?: string;
  forms: FormProps;
  drawer?: DrawerProps; // DrawerPanelProps
  modal?: ModalProps;
  onsubmit?: (validateFields?: any) => void;
  onValuesChange?: (changedValues?: any, allValues?: any) => void;
}

const DrawerForm = memo(({ type = 'add', formlist, drawerContainerClassName, modalContainerClassName, forms, drawer, modal, onsubmit }: DrawerFormProps) => {
  const [form] = Form.useForm();
  console.log(20000);
  const resertFiled = async () => {
    return await form.resetFields();
  };
  if (type === drawerType.display) {
    formlist = formlist?.map((o) => ({ ...o, disabled: true }));
  }
  const onSubmitHandler = useCallback(async () => {
    form.submit();
    // await form
    //   .validateFields()
    //   ?.then((formData: any) => {
    //     console.log(formData);
    //     onsubmit && formQueryParams(formlist, formData, onsubmit, resertFiled);
    //   })
    //   .catch((o) => {
    //     console.log(o);
    //   });
    // console.log(form?.getFieldsValue());
  }, [form]);

  // const RenderItem = memo(() => {
  //   return map(formlist, (item) => {
  //     return <FormItem {...item} key={item?.name} />;
  //   });
  // });

  const RenderModal = useCallback(() => {
    debugger;
    console.log(drawer?.open, modal?.open);
    if (drawer) {
      const { open, onClose, prefixCls = '' } = drawer;
      const [drawerShow, setDrawerShow] = useState<boolean | undefined>(open);
      useEffect(() => {
        open != drawerShow && setDrawerShow(open);
      }, [open]);
      if (!open) {
        return;
      }
      return (
        <Drawer
          key={'drawer'}
          open={drawerShow}
          onClose={() => {}}
          footer={
            <div className="align-center flex justify-center">
              <button onClick={onSubmitHandler}>保存</button>
              <Button
                onClick={(e) => {
                  resertFiled();
                  if (onClose && getType(onClose) === 'function') {
                    return onClose(e);
                  } else {
                    return setDrawerShow(false);
                  }
                }}
              >
                取消
              </Button>
            </div>
          }
          className={drawerContainerClassName}
          destroyOnClose
          {...drawer}
        >
          <FormContainer
            formType={'drawer'}
            key={'drawerFormKey'}
            onFinish={(formData) => {
              debugger;
              onsubmit && onsubmit(formData);
            }}
            {...{ forms, formlist, useForm: form }}
          />
        </Drawer>
      );
    } else if (modal) {
      const { open } = modal;
      if (!open) {
        return;
      }
      return (
        <Modal key={'modal'} open={open} afterClose={() => resertFiled()} className={modalContainerClassName} destroyOnClose {...modal} onOk={onSubmitHandler}>
          <FormContainer formType={'drawer'} key={'modalFormKey'} onFinish={(formData) => onsubmit && onsubmit(formData)} {...{ forms, formlist, useForm: form }}>
            {/* <RenderItem /> */}
          </FormContainer>
        </Modal>
      );
    }
  }, [drawer?.open, modal?.open]);
  return (
    <Form.Provider
      onFormFinish={(name, { values, forms }) => {
        console.log(name, values, forms);
        // 弹窗再外层可以用此方法
      }}
    >
      {RenderModal()}
    </Form.Provider>
  );
  // const renderForm = useCallback(() => {
  //   return (
  //     <Form
  //       {...forms}
  //       className={`drawer-form-container ${containerFormClassName}`}
  //       form={form}
  //       name="drawerForm"
  //       onValuesChange={async (changedValues, allValues) => {
  //         if (onValuesChange && getType(onValuesChange) === 'function') {
  //           formQueryParams(formlist, allValues, onValuesChange, () => form.resetFields());
  //         }
  //         console.log(changedValues, allValues);
  //       }}
  //     >
  //       {RenderModal()}
  //     </Form>
  //   );
  // }, [forms]);
  // return <FormContainer {...{ forms, formlist, form }}>{RenderModal()}</FormContainer>;
  // renderForm();
});

export default DrawerForm;
DrawerForm.displayName = 'DrawerForm';
