import { TabBar } from 'antd-mobile';
import { useContext, useEffect } from 'react';
import { routes, routesEn } from '@/routes/menus';
import { useGoTo, useMatchedRoute } from '@/hooks';
import { DataContext } from '@/context';
import SvgWrapper from '../SvgWrapper';
import style from './index.module.less';

/**
*  底部菜单组件
*/
const Bottom = () => {
  const route = useMatchedRoute();
  const { go } = useGoTo();
  const { locale } = useContext(DataContext);
  // 菜单选择之后调用，然后跳转不同的路由
  const onTabChangeHandler = (key: string) => {
    go(key);
  };

  useEffect(() => {
  }, [locale]);
  // 只有有菜单标记的页面需要底部的菜单选择器
  if (!route?.isMenu) {
    return null;
  }

  const iconRender = (is: boolean, icon?: string) => (
    <SvgWrapper
      src={icon}
      color={is ? '#ff8000' : '#999999'}
    />
  );

  return (
    <div className={style.container}>
      <TabBar onChange={onTabChangeHandler} activeKey={route?.key}>
        {locale === 'en' ? routesEn.filter((it) => it.isMenu).map(
          (item) => (
            <TabBar.Item
              key={item.key}
              icon={(is) => iconRender(is, item.icon)}
              title={item.name}
            />
          ),
        ) : routes.filter((it) => it.isMenu).map(
          (item) => (
            <TabBar.Item
              key={item.key}
              icon={(is) => iconRender(is, item.icon)}
              title={item.name}
            />
          ),
        )}
        {/* {
          routes.filter((it) => it.isMenu).map(
            (item) => (
              <TabBar.Item
                key={item.key}
                icon={(is) => iconRender(is, item.icon)}
                title={item.name}
              />
            ),
          )
        } */}
      </TabBar>
    </div>
  );
};

export default Bottom;
