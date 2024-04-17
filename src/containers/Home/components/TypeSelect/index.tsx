// import { useProductTypes } from '@/services/product';
import { Tabs } from 'antd-mobile';
import { DEFAULT_TYPE } from '@/utils/constants';
import { useTranslation } from 'react-i18next';
import style from './index.module.less';

interface IProps {
  onChange: (key: string) => void;
  locale: string;
}
const data = [
  {
    title: '音乐培训',
    key: 'music',
  },
  {
    title: '美术培训',
    key: 'art',
  },
  {
    title: '外语培训',
    key: 'foreign',
  },
  {
    title: '厨师培训',
    key: 'cook',
  },
  {
    title: '数学培训',
    key: 'math',
  },
];

const dataEN = [
  {
    title: 'music',
    key: 'music',
  },
  {
    title: 'art',
    key: 'art',
  },
  {
    title: 'foreign Language',
    key: 'foreign',
  },
  {
    title: 'chef',
    key: 'cook',
  },
  {
    title: 'maths',
    key: 'math',
  },
];

/**
* 分类选择器
*/
const TypeSelect = ({
  onChange,
  locale,
}: IProps) => {
  const { t } = useTranslation();
  // const { data, loading } = useProductTypes();
  // if (loading && data.length === 0) {
  //   return <SpinLoading />;
  // }
  console.log(dataEN);
  return (
    <Tabs
      className={style.tabs}
      onChange={onChange}
      defaultActiveKey={DEFAULT_TYPE}
    >
      <Tabs.Tab title={t('All')} key={DEFAULT_TYPE} />
      {locale === 'en' ? dataEN.map((item) => (
        <Tabs.Tab title={item.title} key={item.key} />
      )) : data.map((item) => (
        <Tabs.Tab title={item.title} key={item.key} />
      ))}
    </Tabs>
  );
};

export default TypeSelect;
