import { FormType } from '.';
import { formListProps } from './type';

export /**
 * 根据类型不同，配置不同参数
 *
 * @param {FormType} type 组件类型
 * @return {*}
 */
const formItemParams = (type: FormType, { defaultChecked, defaultValue }: formListProps) => {
  if (['checkBox', 'radio', 'switch'].includes(type)) {
    return {
      valuePropName: 'checked',
      defaultChecked,
    };
  } else {
    return {
      defaultValue,
    };
  }
};
