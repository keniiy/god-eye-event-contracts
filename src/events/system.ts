/**
 * System Service Event Types and Schemas
 * 
 * Events for system monitoring, service health checks, and infrastructure events.
 */

/**
 * System Service Event Types
 */
export const SystemEventTypes = {
  // Service Lifecycle Events
  SERVICE_STARTED: 'service.started',
  SERVICE_STOPPED: 'service.stopped',
  SERVICE_WELCOME: 'service.welcome',
  SERVICE_ACKNOWLEDGMENT: 'service.acknowledgment',
  SERVICE_HEARTBEAT: 'service.heartbeat',
  
  // Health and Monitoring Events
  HEALTH_CHECK_PASSED: 'health.check.passed',
  HEALTH_CHECK_FAILED: 'health.check.failed',
  PERFORMANCE_METRIC: 'performance.metric',
  RESOURCE_USAGE: 'resource.usage',
  
  // Error and Alert Events
  SERVICE_ERROR: 'service.error',
  RATE_LIMIT_EXCEEDED: 'rate.limit.exceeded',
  QUOTA_WARNING: 'quota.warning',
  PROVIDER_FAILOVER: 'provider.failover',
  
  // Configuration Events
  CONFIG_CHANGED: 'config.changed',
  DATABASE_CONNECTION_CHANGED: 'database.connection.changed',
  QUEUE_STATUS_CHANGED: 'queue.status.changed',
} as const;

/**
 * Service Welcome Event Schema
 * Published when a service starts up to announce availability
 */
export interface ServiceWelcomeEvent {
  eventId: string;
  timestamp: string;
  eventType: typeof SystemEventTypes.SERVICE_WELCOME;
  
  data: {
    serviceName: string;
    serviceVersion: string;
    startupTimestamp: string;
    redisConnectionStatus: 'connected' | 'connecting' | 'disconnected';
    environment: string;
    port: number;
    healthCheckUrl: string;
    message: string;
  };
  
  metadata: {
    source: string;
    priority: 'low' | 'normal' | 'high' | 'critical';
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
    acknowledgingService: string;
    targetService: string;
    acknowledgmentTimestamp: string;
    connectionStatus: 'healthy' | 'warning' | 'error';
    message: string;
  };
  
  metadata: {
    source: string;
    priority: 'low' | 'normal' | 'high' | 'critical';
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
    timestamp: string;
    uptimeSeconds: number;
    activeConnections: number;
    memoryUsageMb: number;
    cpuUsagePercent: number;
    redisConnectionStatus: 'connected' | 'connecting' | 'disconnected';
  };
  
  metadata: {
    source: string;
    priority: 'low' | 'normal' | 'high' | 'critical';
  };
}

/**
 * Service Error Event Schema
 * Published when services encounter errors
 */
export interface ServiceErrorEvent {
  eventId: string;
  timestamp: string;
  eventType: typeof SystemEventTypes.SERVICE_ERROR;
  
  data: {
    serviceName: string;
    errorType: string;
    errorMessage: string;
    errorStack?: string;
    requestId?: string;
    userId?: string;
    endpoint?: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
  };
  
  metadata: {
    source: string;
    priority: 'high' | 'critical';
  };
}