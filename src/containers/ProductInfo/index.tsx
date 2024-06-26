import { useParams } from 'react-router-dom';
import { useProductInfo } from '@/services/product';
import { TCourse } from '@/utils/types';
import { useMemo } from 'react';
import Hr from '@/components/Hr';
import { Result } from 'antd-mobile';
import { useTranslation } from 'react-i18next';
import BaseInfo from './components/BaseInfo';
import CourseInfo from './components/CourseInfo';
import BuyBottom from './components/BuyBottom';
import style from './index.module.less';

/**
* 商品详情
*/
const ProductInfo = () => {
  const { id } = useParams();
  const { data } = useProductInfo(id || '');
  const { t } = useTranslation();
  const courses = useMemo(() => {
    const cs: Record<string, TCourse> = {};
    data?.cards?.forEach((item) => {
      cs[item.course.id] = {
        ...item.course,
        cardName: cs[item.course.id] ? (`${cs[item.course.id].cardName} / ${item.name}`) : item.name,
      };
    });
    return Object.values(cs);
  }, [data?.cards]);

  if (!data) {
    return (
      <Result
        status="warning"
        title={t('prompt')}
        description={t('noProduct')}
      />
    );
  }
  return (
    <div className={style.container}>
      <BaseInfo data={data} />
      <Hr />
      <CourseInfo data={courses} />
      <BuyBottom data={data} />
    </div>
  );
};

export default ProductInfo;
