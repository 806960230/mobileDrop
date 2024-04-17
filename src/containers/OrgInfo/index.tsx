import { useParams } from 'react-router-dom';
import { useOrganization } from '@/services/org';
import { Result } from 'antd-mobile';
import Hr from '@/components/Hr';
import { useTranslation } from 'react-i18next';
import style from './index.module.less';
import BaseInfo from './components/BaseInfo';
import DescInfo from './components/DescInfo';
import RecommendProducts from './components/RecommendProducts';

/**
* 门店详情页面
*/
const OrgInfo = () => {
  const { id } = useParams();
  const { data } = useOrganization(id || '');
  const { t } = useTranslation();
  if (!data) {
    return <Result status="warning" title={t('prompt')} description={t('noStore')} />;
  }
  return (
    <div className={style.container}>
      <BaseInfo data={data} />
      <Hr />
      <DescInfo data={data} />
      <Hr />
      <RecommendProducts orgId={id || ''} />
    </div>
  );
};

export default OrgInfo;
