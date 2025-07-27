/**
 * User Service - Registration Events
 * 
 * Events related to user and business registration workflows
 */

import { BaseEvent, BusinessEntityIds, ContactInfo, Address, BusinessType, VerificationStatus } from '../../schemas/base-event';

/**
 * Registration Event Types
 */
export const RegistrationEvents = {
  CUSTOMER_REGISTERED: 'user.customer.registered',
  BUSINESS_REGISTERED: 'user.business.registered',
  AGENT_INVITED: 'user.agent.invited',
  AGENT_ACCEPTED: 'user.agent.accepted',
  AGENT_REJECTED: 'user.agent.rejected',
} as const;

/**
 * Customer Registration Event Data
 */
export interface CustomerRegistrationData extends BusinessEntityIds {
  customerId: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  contactInfo: ContactInfo;
  address?: Address;
  
  // Registration metadata
  registeredAt: string;
  registrationSource: 'web' | 'mobile' | 'admin' | 'agent';
  verificationStatus: VerificationStatus;
  accountStatus: 'active' | 'inactive' | 'suspended';
  
  // Medical information (optional)
  medicalInfo?: {
    bloodType?: string;
    allergies?: string[];
    chronicConditions?: string[];
    emergencyContact?: ContactInfo['emergencyContact'];
  };
  
  // Privacy preferences
  privacySettings?: {
    allowMarketing: boolean;
    allowDataSharing: boolean;
    communicationPreferences: ('email' | 'sms' | 'push')[];
  };
}

/**
 * Business Registration Event Data
 */
export interface BusinessRegistrationData extends BusinessEntityIds {
  businessId: string;
  businessName: string;
  businessType: BusinessType;
  email: string;
  
  // Business details
  registrationNumber?: string;
  licenseNumber?: string;
  hefamaaNumber?: string;
  taxId?: string;
  
  // Contact information
  contactInfo: ContactInfo;
  address: Address;
  website?: string;
  
  // Business metadata
  businessDescription?: string;
  establishedYear?: number;
  employeeCount?: number;
  operationalHours?: Record<string, string>; // day -> hours
  servicesOffered?: string[];
  
  // Owner information
  ownerId: string;
  ownerEmail: string;
  ownerName: string;
  
  // Registration metadata
  registeredAt: string;
  verificationStatus: VerificationStatus;
  onboardingStatus: 'not_started' | 'in_progress' | 'completed';
  
  // Business-specific fields
  specialtyAreas?: string[]; // For hospitals, diagnostic centers
  accreditations?: string[];
  insuranceAccepted?: string[]; // For HMOs
  
  // Integration requirements
  requiresHrmIntegration: boolean;
  requiresPaymentIntegration: boolean;
  
  // Social media and marketing
  socialMedia?: Record<string, string>;
  marketingConsent: boolean;
}

/**
 * Agent Invitation Event Data
 */
export interface AgentInvitationData extends BusinessEntityIds {
  invitationId: string;
  businessId: string;
  businessName: string;
  
  // Invitee information
  inviteeEmail: string;
  inviteeName?: string;
  roleTitle: string;
  permissions: string[];
  
  // Invitation metadata
  invitedBy: string; // User ID of the person sending invitation
  invitedAt: string;
  expiresAt: string;
  invitationToken: string;
  
  // Role-specific data
  roleDescription?: string;
  departmentAccess?: string[];
  specialPermissions?: Record<string, boolean>;
  
  // Notification preferences
  sendWelcomeEmail: boolean;
  customMessage?: string;
}

/**
 * Agent Response Event Data (Accept/Reject)
 */
export interface AgentResponseData extends BusinessEntityIds {
  invitationId: string;
  businessId: string;
  
  // Agent information
  agentId: string; // User ID of the agent
  agentEmail: string;
  agentName: string;
  
  // Response details
  response: 'accepted' | 'rejected';
  respondedAt: string;
  responseMessage?: string;
  
  // If accepted - additional setup info
  profileCompleted?: boolean;
  agreementsSigned?: string[];
  onboardingStarted?: boolean;
}

/**
 * Typed Registration Events
 */
export interface CustomerRegisteredEvent extends BaseEvent<CustomerRegistrationData> {
  eventType: typeof RegistrationEvents.CUSTOMER_REGISTERED;
}

export interface BusinessRegisteredEvent extends BaseEvent<BusinessRegistrationData> {
  eventType: typeof RegistrationEvents.BUSINESS_REGISTERED;
}

export interface AgentInvitedEvent extends BaseEvent<AgentInvitationData> {
  eventType: typeof RegistrationEvents.AGENT_INVITED;
}

export interface AgentAcceptedEvent extends BaseEvent<AgentResponseData> {
  eventType: typeof RegistrationEvents.AGENT_ACCEPTED;
}

export interface AgentRejectedEvent extends BaseEvent<AgentResponseData> {
  eventType: typeof RegistrationEvents.AGENT_REJECTED;
}

/**
 * Union type for all registration events
 */
export type RegistrationEvent = 
  | CustomerRegisteredEvent
  | BusinessRegisteredEvent
  | AgentInvitedEvent
  | AgentAcceptedEvent
  | AgentRejectedEvent;

/**
 * Type for registration event types
 */
export type RegistrationEventType = typeof RegistrationEvents[keyof typeof RegistrationEvents];