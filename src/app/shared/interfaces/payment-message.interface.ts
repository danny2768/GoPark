export interface PaymentMessageEvent {
  status: string;
  spotId: string;
  paymentId?: string;
}
