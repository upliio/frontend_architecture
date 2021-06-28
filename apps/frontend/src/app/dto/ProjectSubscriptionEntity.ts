import {PlanDto} from '@upli/shared';

export interface ProjectSubscriptionEntity {
  expireAt: Date
  lastPayment: Date
  nextPayment: Date
  paypalApproveUrl: string
  paypalSubscriptionId: string
  plan: PlanDto
  status: 'APPROVAL_PENDIN' | 'APPROVED' | 'ACTIVE' | 'SUSPENDED' | 'CANCELLED' | 'EXPIRED'
}
