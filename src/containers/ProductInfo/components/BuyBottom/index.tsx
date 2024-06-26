import { IProduct } from '@/utils/types';
import { Grid } from 'antd-mobile';
import { PhoneFill } from 'antd-mobile-icons';
import { useGoTo } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { ROUTE_KEY } from '@/routes/menus';
import style from './index.module.less';

interface IProps {
  data: IProduct
}
/**
*  购买课程工具bar
*/
const BuyBottom = ({
  data,
}: IProps) => {
  const { go } = useGoTo();
  const { t } = useTranslation();
  const goBuy = () => {
    go(ROUTE_KEY.BUY, {
      id: data.id,
    });
  };
  return (
    <Grid columns={10} className={style.container}>
      <Grid.Item span={4}>
        <span className={style.preferentialPrice}>
          ￥
          {data.preferentialPrice}
        </span>
        <span className={style.originalPrice}>
          ￥
          {data.originalPrice}
        </span>
      </Grid.Item>
      <Grid.Item span={2}>
        <a href={`tel:${data.org.tel}`}>
          <PhoneFill className={style.tel} />
        </a>
      </Grid.Item>
      <Grid.Item
        span={4}
        className={style.buyButton}
        onClick={goBuy}
      >
        {t('buyNow')}
      </Grid.Item>
    </Grid>
  );
};

export default BuyBottom;
