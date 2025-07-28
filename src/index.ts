/**
 * @8medical/event-contracts - Main Export
 * 
 * Standardized event schemas and stream definitions for 8Medical microservices
 * 
 * @packageDocumentation
 */

// =============================================================================
// CORE EXPORTS - Most commonly used
// =============================================================================

/**
 * Event Streams - The primary export most services need
 * 
 * @example
 * ```typescript
 * import { EventStreams } from '@8medical/event-contracts';
 * 
 * // Publisher
 * await publisher.publish(EventStreams.USER_SERVICE_EVENTS, eventData);
 * 
 * // Consumer  
 * consumer.subscribe(EventStreams.USER_SERVICE_EVENTS, handler);
 * ```
 */
export { 
  EventStreams, 
  StreamsByService, 
  FutureDomainStreams,
  getStreamsByService,
  isValidStream,
  type EventStreamName,
  type DomainStreamName,
  type ServiceStreamGroup,
} from './streams';

/**
 * Consumer Groups for event processing organization
 * 
 * @example
 * ```typescript
 * import { ConsumerGroups } from '@8medical/event-contracts';
 * 
 * consumer.createGroup(ConsumerGroups.EMAIL_PROCESSORS);
 * ```
 */
export {
  ConsumerGroups,
  type ConsumerGroupName,
} from './consumers';

export {
  ConsumerGroupStreams,
  getConsumerGroupStreams,
  ServiceConsumerRecommendations,
  getServiceConsumerGroups,
} from './config';

/**
 * Service Names for consistent metadata and identification
 * 
 * @example
 * ```typescript
 * import { ServiceNames } from '@8medical/event-contracts';
 * 
 * const metadata = {
 *   source: ServiceNames.USER_SERVICE,
 *   version: '1.0.0'
 * };
 * ```
 */
export {
  ServiceNames,
  type ServiceName,
} from './services';

// =============================================================================
// SCHEMA EXPORTS - For type-safe event handling
// =============================================================================

/**
 * Base event interfaces and common types
 * 
 * @example
 * ```typescript
 * import { BaseEvent, EventMetadata } from '@8medical/event-contracts';
 * 
 * interface MyEvent extends BaseEvent<MyEventData> {
 *   eventType: 'my.custom.event';
 * }
 * ```
 */
export {
  type BaseEvent,
  type EventEnvelope,
  type EventMetadata,
  type BusinessEntityIds,
  type EventErrorInfo,
  type Address,
  type ContactInfo,
  type BusinessType,
  type UserType,
  type EntityStatus,
  type VerificationStatus,
  type EventData,
  type EventHandler,
  type EventBatch,
} from './schemas/base-event';

// =============================================================================
// SERVICE-SPECIFIC EVENT EXPORTS
// =============================================================================

/**
 * User Service Events - Registration, authentication, verification
 * 
 * @example
 * ```typescript
 * import { 
 *   UserServiceEvents, 
 *   BusinessRegisteredEvent,
 *   CustomerRegisteredEvent 
 * } from '@kenniy/godeye-event-contracts';
 * 
 * // Event type constants
 * const eventType = UserServiceEvents.BUSINESS_REGISTERED;
 * 
 * // Typed event handling
 * function handleBusinessRegistration(event: BusinessRegisteredEvent) {
 *   console.log(`New business: ${event.data.businessName}`);
 * }
 * ```
 */
export * from './events/user-service';

/**
 * HRM Service Events - Hospital resource management, bed allocation
 * 
 * @example
 * ```typescript
 * import { 
 *   HrmServiceEvents, 
 *   HrmServiceEventType 
 * } from '@kenniy/godeye-event-contracts';
 * 
 * // Event type constants
 * const eventType = HrmServiceEvents.HOSPITAL_REGISTERED;
 * ```
 */
export * from './events/hrm-service';

/**
 * System Events - Service monitoring, health checks, infrastructure
 * 
 * @example
 * ```typescript
 * import { 
 *   SystemEventTypes, 
 *   ServiceWelcomeEvent,
 *   ServiceHeartbeatEvent 
 * } from '@kenniy/godeye-event-contracts';
 * 
 * // Event type constants
 * const eventType = SystemEventTypes.SERVICE_WELCOME;
 * 
 * // Typed event handling
 * function handleServiceWelcome(event: ServiceWelcomeEvent) {
 *   console.log(`Service started: ${event.data.serviceName}`);
 * }
 * ```
 */
export * from './events/system';

// =============================================================================
// FUTURE SERVICE EXPORTS (will be added in Phase 1.1+)
// =============================================================================

/**
 * File+Notification Service Events - Email delivery, SMS, file processing
 * 
 * @example
 * ```typescript
 * import { 
 *   NotificationServiceEventTypes, 
 *   EmailNotificationEvent 
 * } from '@kenniy/godeye-event-contracts';
 * 
 * // Event type constants
 * const eventType = NotificationServiceEventTypes.EMAIL_SENT;
 * ```
 */
export * from './events/file-notification-service';

// TODO: Add Payment Service events
// export { PaymentServiceEvents, ... } from './events/payments';

// TODO: Add Transport Service events
// export { TransportServiceEvents, ... } from './events/transport';

// TODO: Add System events
// export { SystemEvents, ... } from './events/system';

// =============================================================================
// UTILITY EXPORTS
// =============================================================================

/**
 * Package metadata and utilities
 */
export const PackageInfo = {
  name: '@8medical/event-contracts',
  version: '1.0.0',
  description: 'Shared event schemas and stream definitions for 8Medical microservices',
  phase: 'Phase 1: Service-Based Streams',
  repository: 'https://github.com/8medical/event-contracts',
} as const;


// =============================================================================
// RE-EXPORTS - For convenience (no duplicates)
// =============================================================================

// Note: Types are already exported above with their respective modules
// This section is for additional utilities only