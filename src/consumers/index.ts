/**
 * Redis Consumer Groups - Standardized Processing Groups
 * 
 * Consumer groups organize event consumers by their processing purpose,
 * enabling load balancing and ensuring each event is processed only once per group.
 * 
 * @packageDocumentation
 */

import { ServiceNames, type ServiceName } from '../services';
import { EventStreams } from '../streams';

/**
 * Primary Consumer Groups for Event Processing
 * 
 * NAMING CONVENTION: {purpose}-processors
 * - Clear processing purpose
 * - Enables multiple consumers per group for load balancing
 * - Ensures single processing per group (Redis guarantee)
 */
export const ConsumerGroups = {
  /**
   * HRM Business Logic Processors
   * 
   * Purpose: Process events that require HRM business logic
   * Consumes: USER_SERVICE_EVENTS, BUSINESS_VERIFICATION_EVENTS
   * Examples: Create hospital profiles, update resource availability
   */
  HRM_PROCESSORS: 'hrm-business-processors',

  /**
   * Email Notification Processors
   * 
   * Purpose: Send email notifications
   * Consumes: USER_SERVICE_EVENTS, HRM_SERVICE_EVENTS, PAYMENT_SERVICE_EVENTS
   * Examples: Welcome emails, verification emails, payment confirmations
   */
  EMAIL_PROCESSORS: 'email-notification-processors',

  /**
   * SMS Notification Processors
   * 
   * Purpose: Send SMS notifications
   * Consumes: USER_SERVICE_EVENTS, HRM_SERVICE_EVENTS, TRANSPORT_SERVICE_EVENTS
   * Examples: OTP codes, emergency alerts, appointment reminders
   */
  SMS_PROCESSORS: 'sms-notification-processors',

  /**
   * Analytics and Reporting Processors
   * 
   * Purpose: Process events for analytics, metrics, and reporting
   * Consumes: ALL_STREAMS (comprehensive data collection)
   * Examples: User behavior tracking, business metrics, performance monitoring
   */
  ANALYTICS_PROCESSORS: 'analytics-processors',

  /**
   * Audit Trail Processors
   * 
   * Purpose: Create audit logs for compliance and security
   * Consumes: ALL_STREAMS (comprehensive audit trail)
   * Examples: Security logs, data access logs, regulatory compliance
   */
  AUDIT_PROCESSORS: 'audit-trail-processors',

  /**
   * Payment Processing Processors
   * 
   * Purpose: Handle payment-related business logic
   * Consumes: PAYMENT_SERVICE_EVENTS, USER_SERVICE_EVENTS
   * Examples: Invoice generation, payment confirmations, refund processing
   */
  PAYMENT_PROCESSORS: 'payment-processors',

  /**
   * Transport and Logistics Processors
   * 
   * Purpose: Handle ambulance and transport logistics
   * Consumes: TRANSPORT_SERVICE_EVENTS, HRM_SERVICE_EVENTS
   * Examples: Dispatch optimization, route planning, emergency response
   */
  TRANSPORT_PROCESSORS: 'transport-processors',

  /**
   * System Health Monitoring Processors
   * 
   * Purpose: Monitor system health and performance
   * Consumes: SERVICE_HEALTH_EVENTS, AUDIT_EVENTS
   * Examples: Alert generation, performance monitoring, health checks
   */
  HEALTH_PROCESSORS: 'health-monitoring-processors',

  /**
   * Integration Processors
   * 
   * Purpose: Handle third-party integrations and data synchronization
   * Consumes: Multiple streams based on integration needs
   * Examples: External API calls, data synchronization, webhook processing
   */
  INTEGRATION_PROCESSORS: 'integration-processors',

  /**
   * File Processing Processors
   * 
   * Purpose: Process file uploads, transformations, and storage
   * Consumes: NOTIFICATION_SERVICE_EVENTS (file events)
   * Examples: Image processing, document parsing, virus scanning
   */
  FILE_PROCESSORS: 'file-processors',
} as const;

/**
 * Consumer Group Routing - Maps processing purposes to appropriate streams
 */
export const ConsumerGroupStreams = {
  [ConsumerGroups.HRM_PROCESSORS]: [
    EventStreams.USER_SERVICE_EVENTS,
    EventStreams.BUSINESS_VERIFICATION_EVENTS,
  ],
  [ConsumerGroups.EMAIL_PROCESSORS]: [
    EventStreams.USER_SERVICE_EVENTS,
    EventStreams.HRM_SERVICE_EVENTS,
    EventStreams.PAYMENT_SERVICE_EVENTS,
    EventStreams.TRANSPORT_SERVICE_EVENTS,
  ],
  [ConsumerGroups.SMS_PROCESSORS]: [
    EventStreams.USER_SERVICE_EVENTS,
    EventStreams.HRM_SERVICE_EVENTS,
    EventStreams.TRANSPORT_SERVICE_EVENTS,
  ],
  [ConsumerGroups.ANALYTICS_PROCESSORS]: [
    EventStreams.USER_SERVICE_EVENTS,
    EventStreams.HRM_SERVICE_EVENTS,
    EventStreams.NOTIFICATION_SERVICE_EVENTS,
    EventStreams.PAYMENT_SERVICE_EVENTS,
    EventStreams.TRANSPORT_SERVICE_EVENTS,
    EventStreams.BUSINESS_VERIFICATION_EVENTS,
    EventStreams.SERVICE_HEALTH_EVENTS,
  ],
  [ConsumerGroups.AUDIT_PROCESSORS]: [
    EventStreams.USER_SERVICE_EVENTS,
    EventStreams.HRM_SERVICE_EVENTS,
    EventStreams.NOTIFICATION_SERVICE_EVENTS,
    EventStreams.PAYMENT_SERVICE_EVENTS,
    EventStreams.TRANSPORT_SERVICE_EVENTS,
    EventStreams.BUSINESS_VERIFICATION_EVENTS,
    EventStreams.AUDIT_EVENTS,
  ],
  [ConsumerGroups.PAYMENT_PROCESSORS]: [
    EventStreams.PAYMENT_SERVICE_EVENTS,
    EventStreams.USER_SERVICE_EVENTS,
  ],
  [ConsumerGroups.TRANSPORT_PROCESSORS]: [
    EventStreams.TRANSPORT_SERVICE_EVENTS,
    EventStreams.HRM_SERVICE_EVENTS,
  ],
  [ConsumerGroups.HEALTH_PROCESSORS]: [
    EventStreams.SERVICE_HEALTH_EVENTS,
    EventStreams.AUDIT_EVENTS,
  ],
  [ConsumerGroups.INTEGRATION_PROCESSORS]: [
    // Configured per integration needs
  ],
  [ConsumerGroups.FILE_PROCESSORS]: [
    EventStreams.NOTIFICATION_SERVICE_EVENTS,
  ],
} as const;

/**
 * Service-Specific Consumer Group Recommendations
 * 
 * Guides each service on which consumer groups they should typically use
 */
export const ServiceConsumerRecommendations = {
  [ServiceNames.USER_SERVICE]: [
    ConsumerGroups.ANALYTICS_PROCESSORS,
    ConsumerGroups.AUDIT_PROCESSORS,
  ],
  [ServiceNames.HRM_SERVICE]: [
    ConsumerGroups.HRM_PROCESSORS,
    ConsumerGroups.ANALYTICS_PROCESSORS,
    ConsumerGroups.AUDIT_PROCESSORS,
  ],
  [ServiceNames.FILE_NOTIFICATION_SERVICE]: [
    ConsumerGroups.EMAIL_PROCESSORS,
    ConsumerGroups.SMS_PROCESSORS,
    ConsumerGroups.FILE_PROCESSORS,
    ConsumerGroups.ANALYTICS_PROCESSORS,
  ],
  [ServiceNames.PAYMENT_SERVICE]: [
    ConsumerGroups.PAYMENT_PROCESSORS,
    ConsumerGroups.ANALYTICS_PROCESSORS,
    ConsumerGroups.AUDIT_PROCESSORS,
  ],
  [ServiceNames.TRANSPORT_SERVICE]: [
    ConsumerGroups.TRANSPORT_PROCESSORS,
    ConsumerGroups.ANALYTICS_PROCESSORS,
  ],
  [ServiceNames.AGGREGATOR_SERVICE]: [
    ConsumerGroups.ANALYTICS_PROCESSORS,
  ],
  [ServiceNames.GATEWAY_SERVICE]: [
    ConsumerGroups.AUDIT_PROCESSORS,
  ],
} as const;

/**
 * Type definitions for type safety
 */
export type ConsumerGroupName = typeof ConsumerGroups[keyof typeof ConsumerGroups];

/**
 * Utility function to get recommended consumer groups for a service
 * 
 * @param serviceName - The service name
 * @returns Array of recommended consumer groups
 * 
 * @example
 * ```typescript
 * const hrmGroups = getServiceConsumerGroups(ServiceNames.HRM_SERVICE);
 * // Returns: [ConsumerGroups.HRM_PROCESSORS, ConsumerGroups.ANALYTICS_PROCESSORS, ConsumerGroups.AUDIT_PROCESSORS]
 * ```
 */
export function getServiceConsumerGroups(serviceName: ServiceName): readonly ConsumerGroupName[] {
  return ServiceConsumerRecommendations[serviceName] || [];
}

/**
 * Utility function to get streams for a consumer group
 * 
 * @param consumerGroup - The consumer group name
 * @returns Array of stream names the group should consume
 * 
 * @example
 * ```typescript
 * const streams = getConsumerGroupStreams(ConsumerGroups.EMAIL_PROCESSORS);
 * // Returns: [EventStreams.USER_SERVICE_EVENTS, EventStreams.HRM_SERVICE_EVENTS, ...]
 * ```
 */
export function getConsumerGroupStreams(consumerGroup: ConsumerGroupName): readonly string[] {
  return ConsumerGroupStreams[consumerGroup] || [];
}