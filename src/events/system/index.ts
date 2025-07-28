/**
 * System Events - Main Export
 * 
 * Events for system monitoring, service health checks, and infrastructure events.
 */

/**
 * System Event Types (only what we actually use)
 */
export const SystemEventTypes = {
  SERVICE_WELCOME: 'service.welcome',
  SERVICE_ACKNOWLEDGMENT: 'service.acknowledgment', 
  SERVICE_HEARTBEAT: 'service.heartbeat',
} as const;

/**
 * System Event Type Union
 */
export type SystemEventType = typeof SystemEventTypes[keyof typeof SystemEventTypes];