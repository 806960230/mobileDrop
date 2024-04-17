import { useMutation } from '@apollo/client';
import {
  Button, Form, Input, ImageUploader, Image,
} from 'antd-mobile';
import classNames from 'classnames';
import { useUploadOSS } from '@/hooks/useUploadOSS';
import { COMMIT_STUDENT_INFO } from '@/graphql/user';
import { DataContext } from '@/context';
import { useTranslation } from 'react-i18next';
import { IStudent } from '@/utils/types';
import { showFail, showSuccess } from '@/utils';
import { useContext, useEffect } from 'react';
import { useUserContext } from '@/hooks/userHooks';
import style from './index.module.less';

/**
 * 编辑个人信息
 */
const EditInfo = () => {
  const uploadHandler = useUploadOSS();
  const { locale } = useContext(DataContext);
  const [commit] = useMutation(COMMIT_STUDENT_INFO);
  const [form] = Form.useForm();
  const { store } = useUserContext();
  const { t } = useTranslation();
  useEffect(() => {
    if (!store.tel) return;
    form.setFieldsValue({
      tel: store.tel,
      name: store.name,
      desc: store.desc,
      avatar: [{
        url: store.avatar,
      }],
    });
  }, [store]);

  const onClickHandler = async (v: IStudent & { avatar: [{ url: string }] }) => {
    const res = await commit(
      {
        variables: {
          params: {
            ...v,
            avatar: v.avatar[0]?.url,
          },
        },
      },
    );
    if (res.data.commitStudentInfo.code === 200) {
      showSuccess(locale === 'en' ? 'Update successfully' : res.data.commitStudentInfo.message);
      return;
    }
    showFail(locale === 'en' ? 'Update failed' : res.data.commitStudentInfo.message);
  };

  return (
    <div className={style.container}>
      <div className={style.logo}>
        {/* <Image src="https://water-drop-gan.oss-cn-hongkong.aliyuncs.com/images/font2.png" className={style.font} /> */}
        <Image src="https://water-drop-gan.oss-cn-hongkong.aliyuncs.com/images/read2.png" className={style.themePic} />
      </div>
      <Form
        form={form}
        className={classNames(style.form, style.formPadding)}
        onFinish={onClickHandler}
        footer={(
          <Button block type="submit" color="primary" size="large">
            {t('submit')}
          </Button>
        )}
      >
        <Form.Header>{t('submitInfo')}</Form.Header>
        <Form.Item
          name="name"
          label={t('nickName')}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tel"
          label={t('phoneNum')}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="avatar"
          label={t('avatar')}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <ImageUploader
            maxCount={1}
            upload={uploadHandler}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditInfo;
