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
  EVENT_NOT_SPECIFIED: 'system.event.not_specified',
} as const;

/**
 * Service Welcome Event Schema
 * Published when a service starts up
 */
export interface ServiceWelcomeEvent {
  eventId: string;
  timestamp: string;
  eventType: typeof SystemEventTypes.SERVICE_WELCOME;
  
  data: {
    serviceName: string;
    version: string;
    environment: string;
    port?: number;
    healthCheckUrl?: string;
    capabilities?: string[];
  };
  
  metadata: {
    correlationId: string;
    sourceService: string;
    version: '1.0';
  };
}

/**
 * Service Acknowledgment Event Schema
 * Published in response to welcome events
 */
export interface ServiceAcknowledgmentEvent {
  eventId: string;
  timestamp: string;
  eventType: typeof SystemEventTypes.SERVICE_ACKNOWLEDGMENT;
  
  data: {
    acknowledgedService: string;
    acknowledgedBy: string;
    message?: string;
  };
  
  metadata: {
    correlationId: string;
    sourceService: string;
    version: '1.0';
  };
}

/**
 * Service Heartbeat Event Schema
 * Published periodically to indicate service health
 */
export interface ServiceHeartbeatEvent {
  eventId: string;
  timestamp: string;
  eventType: typeof SystemEventTypes.SERVICE_HEARTBEAT;
  
  data: {
    serviceName: string;
    status: 'healthy' | 'degraded' | 'unhealthy';
    uptime: number;
    memoryUsage?: number;
    cpuUsage?: number;
    activeConnections?: number;
  };
  
  metadata: {
    correlationId: string;
    sourceService: string;
    version: '1.0';
  };
}

/**
 * System Event Type Union
 */
export type SystemEventType = typeof SystemEventTypes[keyof typeof SystemEventTypes];

/**
 * System Event Union Type
 */
export type SystemEvent = 
  | ServiceWelcomeEvent
  | ServiceAcknowledgmentEvent
  | ServiceHeartbeatEvent;