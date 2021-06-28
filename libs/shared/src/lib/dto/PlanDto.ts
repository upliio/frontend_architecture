export interface PlanDto {
  id: String;
  price: number;
  name: string;
  description: String;
  max_kb: number;
  max_files: number;
  details: string[];

  subscription: {
    expireAt: Date
    lastPayment: Date
    nextPayment: Date
    paypalApproveUrl: string
    paypalSubscriptionId: string
    plan: PlanDto
    status: 'APPROVAL_PENDIN' | 'APPROVED' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED'
  }
}
