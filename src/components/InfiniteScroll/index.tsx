import { useTranslation } from 'react-i18next';
import { useDownLoad } from './hooks';
import style from './index.module.less';

interface IProps {
  hasMore: boolean; // 是否有更多的数据
  loadMore: () => Promise<unknown>;
}

/**
* 无限滚动组件
*/
const InfiniteScroll = ({
  hasMore,
  loadMore,
}: IProps) => {
  const { t } = useTranslation();
  const { tips } = useDownLoad({
    hasMore,
    loadMore,
  });
  return (
    <div className={style.container}>
      {hasMore ? tips : t('noMore')}
    </div>
  );
};

export default InfiniteScroll;
