import {
  DotLoading, Popup, Result, Space, Steps,
} from 'antd-mobile';
import { useCanSubscribeCourses } from '@/services/schedule';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CourseList from './components/CourseList';
import style from './index.module.less';
import SubscribePopup from './components/SubscribePopup';

const { Step } = Steps;

/**
* 预约课程
*/
const OrderCourse = () => {
  const [curCourse, setCurCourse] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { data, loading } = useCanSubscribeCourses();
  const { t } = useTranslation();
  if (loading) {
    return (
      <Space justify="center">
        <DotLoading color="primary" />
      </Space>
    );
  }
  if (!data || data.length === 0) {
    return (
      <Result
        status="warning"
        title={t('noCourses')}
      />
    );
  }

  const onSubscribeHandler = (id: string) => {
    setCurCourse(id);
    setShowPopup(true);
  };

  const onCloseHandler = () => {
    setCurCourse('');
    setShowPopup(false);
  };
  return (
    <div className={style.container}>
      <Steps
        direction="vertical"
      >
        {data?.map((item) => (
          <Step
            title={item.name}
            key={item.id}
            description={item.courses ? (
              <CourseList
                onSubscribe={onSubscribeHandler}
                dataSource={item.courses}
              />
            ) : null}
            icon={(
              <img
                className={style.logo}
                src={item.logo}
                alt={t('storeLogo')}
              />
            )}
          />
        ))}
      </Steps>
      <Popup
        visible={showPopup}
        position="bottom"
        onMaskClick={onCloseHandler}
        onClose={onCloseHandler}
      >
        {curCourse
         && <SubscribePopup onClose={onCloseHandler} courseId={curCourse} />}
      </Popup>
    </div>
  );
};

export default OrderCourse;
