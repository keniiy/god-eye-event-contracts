/**
 * Redis Stream Names - Phase 1: Service-Based Architecture
 * 
 * IMPORTANT: These stream names are the single source of truth for all 8Medical services.
 * All publishers and consumers MUST import these constants to ensure consistency.
 * 
 * @example
 * ```typescript
 * import { EventStreams } from '@8medical/event-contracts';
 * 
 * // Publisher
 * await eventPublisher.publish(EventStreams.USER_SERVICE_EVENTS, eventData);
 * 
 * // Consumer
 * consumer.subscribe(EventStreams.USER_SERVICE_EVENTS, handler);
 * ```
 * 
 * @packageDocumentation
 */

/**
 * Primary Event Streams - Service-Based Organization
 * 
 * NAMING CONVENTION: {service-name}-events
 * - Consistent kebab-case naming
 * - Clear service ownership
 * - Easy to understand and remember
 */
export const EventStreams = {
  /**
   * User Service Events
   * 
   * Contains: User registration, authentication, business verification, agent invitations
   * Published by: User Service
   * Consumed by: HRM Service, File+Notification Service, Analytics Service
   */
  USER_SERVICE_EVENTS: 'user-service-events',

  /**
   * HRM Service Events
   * 
   * Contains: Hospital profile management, resource updates, bed assignments, patient admissions
   * Published by: HRM Service  
   * Consumed by: User Service, File+Notification Service, Analytics Service
   */
  HRM_SERVICE_EVENTS: 'hrm-service-events',

  /**
   * File+Notification Service Events
   * 
   * Contains: Email delivery, SMS delivery, file uploads, notification status updates
   * Published by: File+Notification Service
   * Consumed by: User Service, HRM Service, Analytics Service
   */
  NOTIFICATION_SERVICE_EVENTS: 'notification-service-events',

  /**
   * Payment Service Events
   * 
   * Contains: Payment processing, transaction updates, billing events, refunds
   * Published by: Payment Service
   * Consumed by: User Service, HRM Service, File+Notification Service, Analytics Service
   */
  PAYMENT_SERVICE_EVENTS: 'payment-service-events',

  /**
   * Transport Service Events
   * 
   * Contains: Ambulance dispatch, route optimization, transport status updates
   * Published by: Transport Service  
   * Consumed by: HRM Service, File+Notification Service, Analytics Service
   */
  TRANSPORT_SERVICE_EVENTS: 'transport-service-events',

  /**
   * Business Verification Events (Cross-service)
   * 
   * Contains: Business verification workflows, document submissions, approval/rejection
   * Published by: User Service (primarily)
   * Consumed by: HRM Service, File+Notification Service, Admin Portal
   */
  BUSINESS_VERIFICATION_EVENTS: 'business-verification-events',

  // System-level event streams
  /**
   * Service Management Events
   * 
   * Contains: Service health checks, startup/shutdown events, heartbeats
   * Published by: All Services
   * Consumed by: Monitoring Service, Analytics Service
   */
  SERVICE_HEALTH_EVENTS: 'service-health-events',

  /**
   * Audit Trail Events
   * 
   * Contains: Security events, data access logs, administrative actions
   * Published by: All Services
   * Consumed by: Audit Service, Compliance Service
   */
  AUDIT_EVENTS: 'audit-events',
} as const;

/**
 * Stream Routing Helper - Groups streams by publishing service
 * 
 * Useful for service teams to see which streams they own and consume
 */
export const StreamsByService = {
  USER_SERVICE: [
    EventStreams.USER_SERVICE_EVENTS,
    EventStreams.BUSINESS_VERIFICATION_EVENTS,
  ],
  HRM_SERVICE: [
    EventStreams.HRM_SERVICE_EVENTS,
  ],
  FILE_NOTIFICATION_SERVICE: [
    EventStreams.NOTIFICATION_SERVICE_EVENTS,
  ],
  PAYMENT_SERVICE: [
    EventStreams.PAYMENT_SERVICE_EVENTS,
  ],
  TRANSPORT_SERVICE: [
    EventStreams.TRANSPORT_SERVICE_EVENTS,
  ],
  SYSTEM: [
    EventStreams.SERVICE_HEALTH_EVENTS,
    EventStreams.AUDIT_EVENTS,
  ],
} as const;

/**
 * Future Migration Path - Domain-Based Streams (Phase 2)
 * 
 * When ready to scale, these domain-based streams provide better business alignment.
 * Migration can happen gradually by routing events to both stream types.
 */
export const FutureDomainStreams = {
  /**
   * User Domain Events - All user-related activities
   * 
   * Will contain: Registration, authentication, profile management, preferences
   * Future migration target for: USER_SERVICE_EVENTS + user-related events from other services
   */
  USER_DOMAIN_EVENTS: 'user-domain-events',

  /**
   * Healthcare Domain Events - All healthcare operations
   * 
   * Will contain: Hospital management, patient care, medical resources, clinical workflows
   * Future migration target for: HRM_SERVICE_EVENTS + healthcare events from other services
   */
  HEALTHCARE_DOMAIN_EVENTS: 'healthcare-domain-events',

  /**
   * Financial Domain Events - All financial transactions
   * 
   * Will contain: Payments, billing, refunds, financial reporting
   * Future migration target for: PAYMENT_SERVICE_EVENTS + financial events from other services
   */
  FINANCIAL_DOMAIN_EVENTS: 'financial-domain-events',

  /**
   * Communication Domain Events - All communication activities
   * 
   * Will contain: Emails, SMS, push notifications, file sharing
   * Future migration target for: NOTIFICATION_SERVICE_EVENTS + communication events from other services
   */
  COMMUNICATION_DOMAIN_EVENTS: 'communication-domain-events',

  /**
   * Logistics Domain Events - All logistics and transport operations
   * 
   * Will contain: Ambulance dispatch, routing, scheduling, fleet management
   * Future migration target for: TRANSPORT_SERVICE_EVENTS + logistics events from other services
   */
  LOGISTICS_DOMAIN_EVENTS: 'logistics-domain-events',
} as const;

/**
 * Type definitions for compile-time safety
 */
export type EventStreamName = typeof EventStreams[keyof typeof EventStreams];
export type DomainStreamName = typeof FutureDomainStreams[keyof typeof FutureDomainStreams];
export type ServiceStreamGroup = keyof typeof StreamsByService;

/**
 * Utility function to get streams owned by a specific service
 * 
 * @param service - The service name
 * @returns Array of stream names owned by the service
 * 
 * @example
 * ```typescript
 * const userStreams = getStreamsByService('USER_SERVICE');
 * // Returns: [EventStreams.USER_SERVICE_EVENTS, EventStreams.BUSINESS_VERIFICATION_EVENTS]
 * ```
 */
export function getStreamsByService(service: ServiceStreamGroup): readonly string[] {
  return StreamsByService[service];
}

/**
 * Utility function to validate stream names
 * 
 * @param streamName - Stream name to validate
 * @returns True if the stream name is valid
 * 
 * @example
 * ```typescript
 * const isValid = isValidStream(EventStreams.USER_SERVICE_EVENTS); // true
 * const isInvalid = isValidStream('random-stream'); // false (example with invalid stream)
 * ```
 */
export function isValidStream(streamName: string): streamName is EventStreamName {
  return Object.values(EventStreams).includes(streamName as EventStreamName);
}