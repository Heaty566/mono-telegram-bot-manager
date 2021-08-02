import { PaymentHeader, PaymentProvider } from '../interface';

/**
 * @deprecated Momo is not supporting email alert anymore
 */
export class MomoPaymentProvider extends PaymentProvider {
      private readonly PREFIX_SENDER_NAME_STRING = 'bạn nhận được tiền từ';
      private readonly SUFFIX_SENDER_NAME_STRING = 'chi tiết giao dich số tiền nhận';
      private readonly PREFIX_SEND_TIME_STRING = 'thời gian';
      private readonly SUFFIX_SEND_TIME_STRING = 'thông tin thêm';
      private readonly PREFIX_AMOUNT_STRING = 'chi tiết giao dich số tiền nhận được';
      private readonly SUFFIX_AMOUNT_STRING = 'mã giao dịch';
      private readonly PREFIX_ACTIVE_CODE_STRING = 'mã giao dịch';
      private readonly SUFFIX_ACTIVE_CODE_STRING = 'thời gian';
      private readonly HEADER_SENDER_HOST = 'sender';
      private readonly HEADER_RECEIVER = 'delivered-to';
      private readonly EMAIL_SUBJECT_VALIDATOR = 'Bạn vừa nhận được tiền từ';
      private readonly TRUST_SENDER_IP = [];
      private readonly TRUST_HEADER_FIELD = '';
      private readonly TRUST_SENDER_HOST = 'no-reply@momo.vn';

      constructor(isValidateTrustSender = false) {
            super(isValidateTrustSender);
      }

      isValid(headers: PaymentHeader[]) {
            try {
                  if (this.isValidateTrustSender) {
                        const getSenderIp = this.getValueFromHeader(headers, this.TRUST_HEADER_FIELD);
                        if (!this.TRUST_SENDER_IP.includes(getSenderIp)) {
                              return false;
                        }
                  }

                  const getSubject = this.getValueFromHeader(headers, 'subject');
                  if (!getSubject.includes(this.EMAIL_SUBJECT_VALIDATOR)) {
                        return false;
                  }
                  return true;
            } catch (error) {
                  return false;
            }
      }

      parsePaymentInfo(body: string, headers: PaymentHeader[]) {
            if (!this.isValid(headers)) return null;
            try {
                  const senderName = this.getStringBetween(body, this.PREFIX_SENDER_NAME_STRING, this.SUFFIX_SENDER_NAME_STRING);
                  const sendTime = this.getStringBetween(body, this.PREFIX_SEND_TIME_STRING, this.SUFFIX_SEND_TIME_STRING);
                  const amount = Number(this.getStringBetween(body, this.PREFIX_AMOUNT_STRING, this.SUFFIX_AMOUNT_STRING).replace('.', ''));
                  const activeCode = this.getStringBetween(body, this.PREFIX_ACTIVE_CODE_STRING, this.SUFFIX_ACTIVE_CODE_STRING);
                  const senderHost = this.getValueFromHeader(headers, this.HEADER_SENDER_HOST);
                  const receiver = this.getValueFromHeader(headers, this.HEADER_RECEIVER);
                  if (receiver !== this.TRUST_SENDER_HOST) {
                        return null;
                  }

                  return { senderName, activeCode, senderHost, sendTime, amount, receiver };
            } catch (error) {
                  return null;
            }
      }
}
