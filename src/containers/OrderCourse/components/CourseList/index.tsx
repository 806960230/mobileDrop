import { Button, Image, List } from 'antd-mobile';
import { ICourse, ITeacher } from '@/utils/types';
import { useTranslation } from 'react-i18next';
import style from './index.module.less';

interface IProps {
  dataSource: ICourse[];
  onSubscribe: (id: string) => void;
}

/**
* 课程列表
*/
const CourseList = ({
  dataSource,
  onSubscribe,
}: IProps) => {
  const { t } = useTranslation();
  return (
    <div className={style.container}>
      <List>
        {dataSource.map((item) => (
          <List.Item
            key={item.id}
            prefix={
              (
                <Image
                  src={item.coverUrl}
                  alt={t('ImageCourse')}
                  className={style.coverUrl}
                />
              )
            }
            extra={
              (
                <Button
                  fill="none"
                  color="primary"
                  onClick={() => onSubscribe(item.id)}
                >
                  {t('reserve')}
                </Button>
              )
            }
            description={
              item.teachers?.map((it: ITeacher) => it.name).join('，')
              }
          >
            {item.name}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default CourseList;
