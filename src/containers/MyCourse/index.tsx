import {
  Button,
  Card,
  DotLoading, Grid, Image, Modal, Result, Space, Steps, Tag, Toast,
} from 'antd-mobile';
import { useCancelSubscribeCourse, useScheduleRecords } from '@/services/schedule';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { DAY_FORMAT, SCHEDULE_STATUS } from '@/utils/constants';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';
import style from './index.module.less';

const { Step } = Steps;

/**
* 我的课程表
*/
const MyCourse = () => {
  const { data, loading, refetch } = useScheduleRecords();
  const { cancel, loading: cancelLoading } = useCancelSubscribeCourse();
  const { t } = useTranslation();
  const { go } = useGoTo();
  if (!data || data.length === 0) {
    return (
      <Result
        status="warning"
        title={t('noSchedules')}
      />
    );
  }
  if (loading) {
    return <DotLoading />;
  }
  // 取消预约的课程，必须是未开始的课程才能取消
  const cancelSubscribeHandler = async (id: string) => {
    const result = await Modal.confirm({
      content: t('sureCancel'),
    });
    if (result) {
      const res = await cancel(id);
      if (res?.code === 200) {
        Toast.show({
          content: res.message,
        });
        refetch();
        return;
      }
      Toast.show({
        content: res?.message,
      });
    }
  };
  return (
    <div className={style.container}>
      <Steps
        direction="vertical"
      >
        {data?.map((item) => (
          <Step
            key={item.id}
            icon={(
              <img
                src={item.org?.logo}
                alt="logo"
                className={style.logo}
                onClick={() => go(ROUTE_KEY.ORG_INFO, {
                  id: item.org.id,
                })}
              />
            )}
            title={(
              <Space justify="between" block>
                <span>
                  {dayjs(item.schedule.schoolDay).format(DAY_FORMAT)}
                &nbsp;
                  {item.schedule.startTime}
                  -
                  {item.schedule.endTime}
                </span>
                <Tag
                  color={SCHEDULE_STATUS[item.status][1]}
                >
                  {SCHEDULE_STATUS[item.status][2]}
                </Tag>
              </Space>
            )}
            description={(
              <Card>
                <Grid
                  columns={13}
                  gap={10}
                >
                  <Grid.Item span={4}>
                    <Image
                      src={item.course.coverUrl}
                      className={style.coverUrl}
                    />
                  </Grid.Item>
                  <Grid.Item span={6}>
                    <div className={style.name}>
                      {item.course.name}
                    </div>
                    <div className={style.teacher}>
                      {t('teacher')}
                      :
                      {item.schedule.teacher?.name}
                    </div>
                  </Grid.Item>
                  <Grid.Item span={3}>
                    {SCHEDULE_STATUS.NO_DO[0] === item.status
                     && (
                     <Button
                       fill="none"
                       color="primary"
                       loading={cancelLoading}
                       onClick={() => cancelSubscribeHandler(item.id)}
                     >
                       {t('cancel')}
                     </Button>
                     )}
                  </Grid.Item>
                </Grid>
              </Card>
            )}
          />
        ))}
      </Steps>
    </div>
  );
};

export default MyCourse;
