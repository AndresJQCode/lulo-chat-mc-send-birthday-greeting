export interface Transaction {
  id: string;
  paymentId: string;
  value: number;
  date: Date;
  paymentLink?: string;
  status: string;
}
