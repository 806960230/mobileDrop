import { TCourse } from '@/utils/types';
import { Card } from 'antd-mobile';
import Hr from '@/components/Hr';
import { useTranslation } from 'react-i18next';
import style from './index.module.less';

interface IProps {
  data: TCourse[]
}

/**
*  课程信息
*/
const CourseInfo = ({
  data,
}: IProps) => {
  const { t } = useTranslation();
  return (
    <div className={style.container}>
      {data?.map((item) => (
        <Card title={item.cardName} key={item.id} className={style.courseCard}>
          <div className={style.contentItem}>
            {item.desc}
          </div>
          <Hr />
          <div className={style.contentItem}>
            <div className={style.label}>{t('reserveInfo')}</div>
            {item.reserveInfo}
          </div>
          <Hr />
          <div className={style.contentItem}>
            <div className={style.label}>{t('refundInfo')}</div>
            {item.refundInfo}
          </div>
          <Hr />
          <div className={style.contentItem}>
            <div className={style.label}>{t('otherInfo')}</div>
            {item.otherInfo}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CourseInfo;
