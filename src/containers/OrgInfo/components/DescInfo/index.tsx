import { IOrganization } from '@/utils/types';
import { Image } from 'antd-mobile';
import { useTranslation } from 'react-i18next';
import style from './index.module.less';

interface IProps {
  data: IOrganization
}
/**
* 内容描述信息
*/
const DescInfo = ({
  data,
}: IProps) => {
  const { t } = useTranslation();
  return (
    <div className={style.container}>
      {data.description}
      <div className={style.imgs}>
        {data.orgOtherImg && data.orgOtherImg.map((item) => (
          <Image src={item.url} alt={t('otherPic')} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default DescInfo;
