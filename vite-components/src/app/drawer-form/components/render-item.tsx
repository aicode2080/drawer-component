import { memo } from 'react';
import { formListProps } from './type';
import FormItem from './form-item';
import { map } from 'lodash';

interface ItemContainerProps {
  formlist: formListProps[];
}

const ItemContainer = memo(({ formlist }: ItemContainerProps) => {
  const RenderItem = memo(() => {
    return map(formlist, (item) => {
      return <FormItem {...item} key={item?.name} />;
    });
  });
  return <RenderItem />;
});

export default ItemContainer;
