/**
 * Consumer Group Stream Mappings
 *
 * Maps processing purposes to appropriate streams for each consumer group
 */

import { ConsumerGroups, type ConsumerGroupName } from "../consumers";
import { EventStreams } from "../streams";

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
  [ConsumerGroups.FILE_PROCESSORS]: [EventStreams.NOTIFICATION_SERVICE_EVENTS],
} as const;

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
export function getConsumerGroupStreams(
  consumerGroup: ConsumerGroupName
): readonly string[] {
  return ConsumerGroupStreams[consumerGroup] || [];
}
