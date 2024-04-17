import {
  Button, Form, Image, Input, Space,
} from 'antd-mobile';
import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { DataContext } from '@/context';
import { Link, useNavigate } from 'react-router-dom';
import md5 from 'md5';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { STUDENT_REGISTER } from '../../graphql/user';
import { showFail, showSuccess } from '../../utils';
import style from './index.module.less';

interface IValue {
  password: string;
  account: string;
}
/**
* 注册
*/
const Register = () => {
  const [form] = Form.useForm();
  const [register, { loading }] = useMutation(STUDENT_REGISTER);
  const { locale, setLocale } = useContext(DataContext);
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

  const onRegisterHandler = async (values: IValue) => {
    const res = await register({
      variables: {
        password: md5(values.password),
        account: values.account,
      },
    });
    if (res.data.studentRegister.code === 200) {
      showSuccess(locale === 'en' ? 'Register successfully' : res.data.studentRegister.message);
      nav('/login');
      return;
    }
    const data = res.data.studentRegister;
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
        form={form}
        layout="horizontal"
        onFinish={onRegisterHandler}
        footer={(
          <Button loading={loading} block type="submit" color="primary" size="large">
            {t('register')}
          </Button>
        )}
      >
        <Form.Item
          rules={[{
            required: true,
            message: t('noAllowedAccountNull'),
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,10}$/,
            message: t('accountRule'),
          }]}
          label={t('account')}
          name="account"
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
        >
          <Input
            placeholder={t('inputPS')}
            clearable
            type="password"
          />
        </Form.Item>
        <Form.Item
          rules={[{
            required: true,
            message: t('noAllowedPSNull'),
          }, {
            pattern: /^(?![0-9]+$)(?![a-z]+$)[a-z0-9]{6,}$/,
            message: t('passwordRule'),
          }, {
            validator: (_, value) => {
              const password = form.getFieldValue('password');
              if (password === value) {
                return Promise.resolve();
              }
              return Promise.reject();
            },
            message: t('correspondingPS'),
          }]}
          label={t('confirmPS')}
          name="passwordConfirm"
        >
          <Input
            placeholder={t('inputConfirmPS')}
            clearable
            type="password"
          />
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center' }}>
        <Space justify="center">
          {t('haveAccount')}
          <Link to="/login">{t('login')}</Link>
        </Space>
      </div>
    </div>
  );
};

export default Register;
