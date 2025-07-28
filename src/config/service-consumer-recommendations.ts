/**
 * Service Consumer Group Recommendations
 * 
 * Guides each service on which consumer groups they should typically use
 */

import { ServiceNames, type ServiceName } from '../services';
import { ConsumerGroups, type ConsumerGroupName } from '../consumers';

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