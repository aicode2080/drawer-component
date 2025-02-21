import * as dayjs from 'dayjs';
import * as _ from 'lodash';
import { formListProps } from '.';
import { DATA_FORMAT } from './const';

// 处理查询结果值
export function formQueryParams(formList: formListProps[], allValues: any, onQuerySubmit?: (changeValue?: any) => void, callBack?: () => void) {
  _.map(formList, (x: any) => {
    _.mapKeys(allValues, (value, key) => {
      if (key == x.name) {
        // 复选框
        if (x.type === 'checkBox') {
          allValues[key] = value ? '1' : '0';
        }
        // 复选框组
        if (x.type === 'checkboxGroup') {
          allValues[key] = _.join(value, ',');
        }

        // 开关
        if (x.type === 'switch') {
          allValues[key] = value ? '1' : '0';
        }

        // 日期 | 月 | 周
        if ((x.type === 'datePicker' || x.type === 'monthPicker' || x.type === 'weekPicker') && value) {
          allValues[key] = dayjs(value).format(!x.showTime ? x.format || 'YYYY-MM-DD HH:mm:ss' : `${x.format} HH:mm`);
        }
        // 起止时间
        if (x.type === 'rangePicker' && value) {
          const _format = !x.showTime ? x.format ?? DATA_FORMAT : `${x.format ?? DATA_FORMAT} HH:mm`;
          allValues[key] = value.length == 0 ? null : `${dayjs(value[0]).format(_format)},${dayjs(value[1]).format(_format)}`;
        }
      }
    });

    //去除value的前后空格
    allValues[x.name] && _.isString(allValues[x.name]) ? (allValues[x.name] = trim(allValues[x.name])) : '';
  });
  onQuerySubmit && onQuerySubmit(allValues);
  callBack && callBack();
}

const trim = (value: string) => {
  return value.replace(/(^\s*)|(\s*$)/g, '');
};
