import { useContext, useState } from 'react';
import md5 from 'md5';
import {
  Button, Form, Image, Input, Space,
} from 'antd-mobile';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { DataContext } from '@/context';
import { AUTH_TOKEN } from '@/utils/constants';
import { useUserContext } from '@/hooks/userHooks';
import { STUDENT_LOGIN } from '../../graphql/user';
import { showFail, showSuccess } from '../../utils';
import style from './index.module.less';

interface IValue {
  password: string;
  account: string;
}

/**
* 登录页面
*/
const Login = () => {
  const [visible, setVisible] = useState(false);
  const { store } = useUserContext();
  const { locale, setLocale } = useContext(DataContext);
  const [login, { loading }] = useMutation(STUDENT_LOGIN);
  const { t, i18n } = useTranslation();
  const nav = useNavigate();

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

  const debouncedAction = debounce(changeLan, 250);

  const loginHandler = async (values: IValue) => {
    const res = await login({
      variables: {
        password: md5(values.password),
        account: values.account,
      },
    });

    if (res.data.studentLogin.code === 200) {
      showSuccess(locale === 'en' ? 'Login successfully' : res.data.studentLogin.message);
      store.refetchHandler();
      localStorage.setItem(AUTH_TOKEN, res.data.studentLogin.data);
      nav('/');
      return;
    }
    const data = res.data.studentLogin;
    showFail(data);
  };
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <Image src="https://water-drop-gan.oss-cn-hongkong.aliyuncs.com/images/newfont.png" className={style.font} />
        <Image src="https://water-drop-gan.oss-cn-hongkong.aliyuncs.com/images/read2.png" className={style.themePic} />
        <Button onClick={debouncedAction} color="warning">{t('changeLanguage')}</Button>
      </div>
      <Form
        layout="horizontal"
        onFinish={loginHandler}
        footer={(
          <Button loading={loading} block type="submit" color="primary" size="large">
            {t('login')}
          </Button>
        )}
      >
        <Form.Item
          label={t('account')}
          name="account"
          rules={[{
            required: true,
            message: t('noAllowedAccountNull'),
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,10}$/,
            message: t('accountRule'),
          }]}
        >
          <Input placeholder={t('inputAccount')} clearable />
        </Form.Item>
        <Form.Item
          label={t('password')}
          name="password"
          rules={[{
            required: true,
            message: t('noAllowedPSNull'),
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
            message: t('passwordRule'),
          }]}
          extra={(
            <div className={style.eye}>
              {!visible ? (
                <EyeInvisibleOutline onClick={() => setVisible(true)} />
              ) : (
                <EyeOutline onClick={() => setVisible(false)} />
              )}
            </div>
          )}
        >
          <Input
            placeholder={t('inputPS')}
            clearable
            type={visible ? 'text' : 'password'}
          />
        </Form.Item>
      </Form>
      <div className={style.test} style={{ textAlign: 'center' }}>
        {t('testAccount')}
      </div>
      <div style={{ textAlign: 'center' }}>
        <Space>
          {t('noAccount')}
          <Link to="/register">{t('register')}</Link>
        </Space>
      </div>
    </div>
  );
};

export default Login;
