import {
  DotLoading,
  Grid,
  Image,
  List,
} from 'antd-mobile';
import { useGetStudent, useUserContext } from '@/hooks/userHooks';
import { useGoTo } from '@/hooks';
import { useContext } from 'react';
import { DataContext } from '@/context';
import { ROUTE_KEY } from '@/routes/menus';
import {
  BankcardOutline,
  CloseShieldOutline,
  FaceRecognitionOutline,
  GlobalOutline,
  UnorderedListOutline,
} from 'antd-mobile-icons';
import { useTranslation } from 'react-i18next';
import { AUTH_TOKEN } from '@/utils/constants';
import style from './index.module.less';

export type Func = (...args: any[]) => void;
export function debounce(fn: Func, wait: number): Func {
  let timeout: NodeJS.Timeout | null = null;
  // 返回一个新的函数
  return function (this: any, ...args: any[]) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

/**
* 我的信息页面
*/
const My = () => {
  const { loading } = useGetStudent();
  const { store } = useUserContext();
  const { setLocale } = useContext(DataContext);
  const { go } = useGoTo();
  const { t, i18n } = useTranslation();
  const changeLan = () => {
    let language;
    if (!localStorage.getItem('i18nextLng') || localStorage.getItem('i18nextLng') === 'en') {
      localStorage.setItem('i18nextLng', 'ch');
      language = 'ch';
    } else {
      localStorage.setItem('i18nextLng', 'en');
      language = 'en';
      setLocale(language);
    }
    i18n.changeLanguage(language);
    setLocale(language);
  };
  const exit = () => {
    localStorage.setItem(AUTH_TOKEN, '');
    window.location.reload();
  };

  const debouncedAction = debounce(changeLan, 250);
  if (loading) {
    return <DotLoading />;
  }
  return (
    <div className={style.container}>
      <Grid columns={10} className={style.card}>
        <Grid.Item span={4}>
          <Image
            className={style.avatar}
            src={store.avatar}
            alt={t('avatar')}
          />
        </Grid.Item>
        <Grid.Item span={6}>
          <div className={style.name}>
            {store.name}
          </div>
          <div
            className={style.edit}
            onClick={() => go(ROUTE_KEY.EDIT_INFO)}
          >
            {t('editInfo')}
          </div>
        </Grid.Item>
      </Grid>
      <List className={style.list}>
        <List.Item
          prefix={<FaceRecognitionOutline />}
          onClick={() => go(ROUTE_KEY.ORDER_COURSE)}
        >
          {t('reserve courses')}
        </List.Item>
        <List.Item
          prefix={<UnorderedListOutline />}
          onClick={() => go(ROUTE_KEY.MY_COURSE)}
        >
          {t('my schedules')}
        </List.Item>
        <List.Item
          prefix={<BankcardOutline />}
          onClick={() => go(ROUTE_KEY.MY_CARD)}
        >
          {t('my consumer cards')}
        </List.Item>
        <List.Item
          prefix={<GlobalOutline />}
          onClick={debouncedAction}
        >
          {t('changeLanguage')}
        </List.Item>
        <List.Item
          prefix={<CloseShieldOutline />}
          onClick={exit}
        >
          {t('exit')}
        </List.Item>
      </List>
    </div>
  );
};

export default My;
