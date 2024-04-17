import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
const OFFSET = 90;

export const useDownLoad = ({
  hasMore = false,
  loadMore = () => { },
}) => {

  const [tips, setTips] = useState('');
  const { t } = useTranslation();
  useEffect(() => {
    window.onscroll = _.debounce(async () => {
      const { clientHeight, scrollTop } = document.documentElement;
      const { scrollHeight } = document.body;
      if (hasMore && (scrollTop + clientHeight >= scrollHeight - OFFSET)) {
        setTips(t('loading'));
        await loadMore();
        setTips(t('loaded'));
        setTimeout(() => {
          setTips('');
        }, 1000);
      }
    }, 500);

    return () => {
      window.onscroll = null;
    };
  }, [hasMore]);

  return { tips };
};
