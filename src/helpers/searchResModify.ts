import {LotFormProps} from '../components/types';

export const searchResultModify = (data: LotFormProps[]) => {
  const initial = {} as Props[];
  if (data.length) {
    data.map(item => {
      if (initial.hasOwnProperty(item.category.id)) {
        initial[item.category.id].count = initial[item.category.id].count + 1;
      } else {
        initial[item.category.id] = {
          title: item.category.categoryName,
          count: 1,
        };
      }
    });
  }
  const keys = Object.keys(initial);
  const resData = keys.map((key: string) => {
    return {
      id: key,
      title: initial[key].title,
      count: initial[key].count,
    };
  });
  return resData;
};
export type Props = {
  id: string;
  title: string;
  count: number;
};
