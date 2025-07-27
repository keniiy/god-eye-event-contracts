/**
 * User Service Event Types and Schemas
 * 
 * Events published by the User Service for user registration, authentication,
 * business onboarding, and verification workflows.
 */

/**
 * User Service Event Types
 */
export const UserServiceEventTypes = {
  // User Registration Events
  CUSTOMER_REGISTERED: 'customer.registered',
  BUSINESS_REGISTERED: 'business.registered',
  
  // Authentication Events
  CUSTOMER_LOGGED_IN: 'customer.logged_in',
  BUSINESS_LOGGED_IN: 'business.logged_in',
  
  // Verification Events
  EMAIL_VERIFIED: 'email.verified',
  PHONE_VERIFIED: 'phone.verified',
  
  // Profile Events
  PROFILE_UPDATED: 'profile.updated',
  PASSWORD_CHANGED: 'password.changed',
  
  // Business Verification Events
  BUSINESS_VERIFICATION_SUBMITTED: 'business.verification.submitted',
  BUSINESS_VERIFICATION_APPROVED: 'business.verification.approved',
  BUSINESS_VERIFICATION_REJECTED: 'business.verification.rejected',
  
  // Agent Events
  AGENT_INVITED: 'agent.invited',
  AGENT_ACCEPTED: 'agent.accepted',
  AGENT_REJECTED: 'agent.rejected',
} as const;

/**
 * Business Registration Event Schema
 * Published when a new business entity is registered
 */
export interface BusinessRegisteredEvent {
  eventId: string;
  timestamp: string;
  eventType: typeof UserServiceEventTypes.BUSINESS_REGISTERED;
  
  data: {
    businessId: string;
    businessName: string;
    businessType: 'hospital' | 'hmo' | 'diagnostic_center' | 'ambulance_provider';
    email: string;
    contactName?: string;
    phoneNumber?: string;
    
    // Owner information
    ownerId: string;
    ownerEmail: string;
    ownerName: string;
    
    // Registration metadata
    registeredAt: string;
    verificationStatus: 'pending' | 'verified' | 'rejected';
    onboardingStatus: 'not_started' | 'in_progress' | 'completed';
  };
  
  metadata: {
    correlationId: string;
    sourceService: 'user-service';
    version: '1.0';
    requiresNotification: boolean;
    notificationTemplates?: string[];
  };
}

/**
 * Customer Registration Event Schema
 * Published when a new customer/patient is registered
 */
export interface CustomerRegisteredEvent {
  eventId: string;
  timestamp: string;
  eventType: typeof UserServiceEventTypes.CUSTOMER_REGISTERED;
  
  data: {
    customerId: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    
    // Registration metadata
    registeredAt: string;
    verificationStatus: 'pending' | 'verified';
    accountStatus: 'active' | 'inactive' | 'suspended';
  };
  
  metadata: {
    correlationId: string;
    sourceService: 'user-service';
    version: '1.0';
    requiresNotification: boolean;
    notificationTemplates?: string[];
  };
}

/**
 * Business Verification Decision Event Schema
 * Published when admin approves/rejects business verification
 */
export interface BusinessVerificationDecisionEvent {
  eventId: string;
  timestamp: string;
  eventType: typeof UserServiceEventTypes.BUSINESS_VERIFICATION_APPROVED | typeof UserServiceEventTypes.BUSINESS_VERIFICATION_REJECTED;
  
  data: {
    businessId: string;
    businessName: string;
    businessType: string;
    email: string;
    
    // Decision details
    decision: 'approved' | 'rejected';
    decidedBy: string; // Admin ID
    decidedAt: string;
    reason?: string;
    notes?: string;
    
    // For approved businesses - HRM onboarding instructions
    hrmOnboardingRequired?: boolean;
    nextSteps?: string[];
  };
  
  metadata: {
    correlationId: string;
    sourceService: 'user-service';
    version: '1.0';
    requiresNotification: boolean;
    notificationTemplates?: string[];
  };
}

/**
 * User Service Event Union Type
 */
export type UserServiceEvent = 
  | BusinessRegisteredEvent
  | CustomerRegisteredEvent
  | BusinessVerificationDecisionEvent;

/**
 * Type for User Service event types
 */
export type UserServiceEventType = typeof UserServiceEventTypes[keyof typeof UserServiceEventTypes];