/**
 * Service Name Constants
 * 
 * Standardized service names for use in event metadata and service identification.
 */

export const ServiceNames = {
  USER_SERVICE: 'user-service',
  HRM_SERVICE: 'hrm-service',
  FILE_NOTIFICATION_SERVICE: 'file-notification-service',
  PAYMENT_SERVICE: 'payment-service',
  TRANSPORT_SERVICE: 'transport-service',
  AGGREGATOR_SERVICE: 'aggregator-service',
  GATEWAY_SERVICE: 'gateway-service',
} as const;

export type ServiceName = typeof ServiceNames[keyof typeof ServiceNames];