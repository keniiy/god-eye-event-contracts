/**
 * Redis Consumer Groups - Standardized Processing Groups
 * 
 * Consumer groups organize event consumers by their processing purpose,
 * enabling load balancing and ensuring each event is processed only once per group.
 * 
 * @packageDocumentation
 */

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
 * Type definitions for type safety
 */
export type ConsumerGroupName = typeof ConsumerGroups[keyof typeof ConsumerGroups];