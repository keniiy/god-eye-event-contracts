/**
 * User Service Events - Main Export
 * 
 * Consolidates all user service event types and schemas for easy importing
 */

// Export all registration events
export * from './registration';

// Export authentication events (when created)
// export * from './authentication';

// Export verification events (when created)  
// export * from './verification';

// Re-export registration events for convenience
export { RegistrationEvents } from './registration';

/**
 * All User Service Event Types (consolidated)
 */
export const UserServiceEvents = {
  // Registration Events
  CUSTOMER_REGISTERED: 'user.customer.registered',
  BUSINESS_REGISTERED: 'user.business.registered',
  ADMIN_CREATED: 'user.admin.created',
  AGENT_INVITED: 'user.agent.invited',
  AGENT_ACCEPTED: 'user.agent.accepted',
  AGENT_REJECTED: 'user.agent.rejected',
  AGENT_ACTIVATED: 'user.agent.activated',
  
  // Authentication Events (coming in Phase 1.1)
  CUSTOMER_LOGGED_IN: 'user.customer.logged_in',
  CUSTOMER_LOGGED_OUT: 'user.customer.logged_out',
  BUSINESS_LOGGED_IN: 'user.business.logged_in',
  BUSINESS_LOGGED_OUT: 'user.business.logged_out',
  ADMIN_LOGGED_IN: 'user.admin.logged_in',
  ADMIN_LOGGED_OUT: 'user.admin.logged_out',
  PASSWORD_RESET_REQUESTED: 'user.password.reset_requested',
  PASSWORD_CHANGED: 'user.password.changed',
  
  // Verification Events (coming in Phase 1.1)
  EMAIL_VERIFIED: 'user.email.verified',
  PHONE_VERIFIED: 'user.phone.verified',
  BUSINESS_VERIFIED: 'user.business.verified',
  BUSINESS_REJECTED: 'user.business.rejected',
  BUSINESS_VERIFICATION: 'user.business.verification',
  
  // Internal Event Emitter events (for @OnEvent decorators)  
  BUSINESS_VERIFICATION_APPROVED_INTERNAL: 'business.verification.approved',
  BUSINESS_VERIFICATION_REJECTED_INTERNAL: 'business.verification.rejected',
  BUSINESS_DOCUMENTS_SUBMITTED_INTERNAL: 'business.documents.submitted',
  
  // Profile Events (coming in Phase 1.1)
  PROFILE_UPDATED: 'user.profile.updated',
  PREFERENCES_UPDATED: 'user.preferences.updated',
  
  // Hospital Approval Events
  HOSPITAL_READY_FOR_APPROVAL: 'user.hospital.ready_for_approval',
  HOSPITAL_APPROVAL_DECISION: 'user.hospital.approval_decision',
} as const;

/**
 * User Service Event Type Union
 */
export type UserServiceEventType = typeof UserServiceEvents[keyof typeof UserServiceEvents];