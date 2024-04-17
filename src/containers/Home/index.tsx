import { SearchBar } from 'antd-mobile';
import { useState, useEffect, useContext } from 'react';
import { DataContext } from '@/context';
import { useTranslation } from 'react-i18next';
import TypeSelect from './components/TypeSelect';
import ProductList from './components/ProductList';
import style from './index.module.less';

/**
* 精选课程
*/
const Home = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const { t } = useTranslation();
  const { locale } = useContext(DataContext);
  useEffect(() => {
  }, [locale]);
  const onSearchHandler = (val: string) => {
    setName(val);
  };

  const onTypeChangeHandler = (key: string) => {
    setType(key);
  };

  return (
    <div className={style.container}>
      <SearchBar
        placeholder={t('trySearch')}
        onSearch={onSearchHandler}
      />
      <TypeSelect onChange={onTypeChangeHandler} locale={locale || 'en'} />
      <ProductList name={name} type={type} />
    </div>
  );
};

export default Home;
