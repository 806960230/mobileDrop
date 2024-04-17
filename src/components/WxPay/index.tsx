import {
  NumberKeyboard, PasscodeInput, Popup, Toast,
} from 'antd-mobile';
import { useTranslation } from 'react-i18next';
import { useMockOrder } from '@/services/order';
import style from './index.module.less';

interface IProps {
  onClose: () => void;
  amount: number;
  visible: boolean;
  productId: string;
  quantity: number;
  onFinish: (result: boolean) => void;
}
/**
* 微信支付窗
*/
const WxPay = ({
  onClose,
  visible,
  amount,
  productId,
  quantity,
  onFinish,
}: IProps) => {
  const { get } = useMockOrder();
  const { t } = useTranslation();
  const onChangeHandler = async (value: string) => {
    if (value.length > 5) {
      const res = await get(
        productId,
        quantity,
        amount,
      );
      if (res.code === 10031) {
        Toast.show({
          content: res.message,
        });
        onFinish(false);
        return;
      }
      Toast.show({
        content: res.message,
      });
      onFinish(true);
    }
  };

  return (
    <Popup
      visible={visible}
      showCloseButton
      onMaskClick={() => {
        onClose();
      }}
      onClose={onClose}
      bodyStyle={{
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }}
    >
      <div className={style.container}>
        <div className={style.title}>{t('inputPayPS')}</div>
        <div className={style.desc}>{t('loveServer')}</div>
        <div className={style.amount}>
          ¥
          {amount}
        </div>
        <PasscodeInput
          seperated
          onChange={onChangeHandler}
          keyboard={<NumberKeyboard />}
        />
      </div>
    </Popup>
  );
};
export default WxPay;
