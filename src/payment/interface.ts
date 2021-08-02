export interface PaymentInformation {
      senderName: string;
      activeCode: string;
      senderHost: string;
      sendTime: string;
      amount: number;
      receiver: string;
}
export interface PaymentHeader {
      value: string;
      name: string;
}

export abstract class PaymentProvider {
      constructor(protected readonly isValidateTrustSender: boolean) {}
      protected abstract isValid(headers: PaymentHeader[]): boolean;
      abstract parsePaymentInfo(body: string, headers: PaymentHeader[]): PaymentInformation;

      protected getStringBetween(str: string, prefix: string, suffix: string): string {
            return str.toLowerCase().split(prefix)[1].split(suffix)[0].trim();
      }

      protected getValueFromHeader(headers: PaymentHeader[], field: string) {
            return headers.filter((item) => item.name.toLowerCase() === field)[0].value;
      }
}
