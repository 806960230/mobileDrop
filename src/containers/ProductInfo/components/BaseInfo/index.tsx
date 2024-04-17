import { IProduct } from '@/utils/types';
import { Grid, Image } from 'antd-mobile';
import Hr from '@/components/Hr';
import { useTranslation } from 'react-i18next';
import style from './index.module.less';

interface IProps {
  data: IProduct
}

/**
*  基础信息
*/
const BaseInfo = ({
  data,
}: IProps) => {
  const { t } = useTranslation();
  return (
    <div className={style.container}>
      <div className={style.headerContainer}>
        <Image
          src={data.bannerUrl}
          alt=""
          className={style.image}
        />
        <div className={style.title}>{data.name}</div>
        <div className={style.desc}>{data.desc}</div>
      </div>
      <Hr />
      <Grid columns={3} gap={8} className={style.sale}>
        <Grid.Item>
          {t('remainingStock')}
          {data.curStock}
        </Grid.Item>
        <Grid.Item>
          {t('limitPurchase')}
          {data.limitBuyNumber}
        </Grid.Item>
        <Grid.Item>
          {t('sold')}
          :
          {data.buyNumber || 0}
        </Grid.Item>
      </Grid>
    </div>
  );
};

export default BaseInfo;
