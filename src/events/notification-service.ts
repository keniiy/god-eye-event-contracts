/**
 * File+Notification Service Event Types and Schemas
 * 
 * Events published by the File+Notification Service for email delivery,
 * SMS delivery, and notification status updates.
 */

import { ServiceNames } from '../services';

/**
 * Notification Service Event Types
 */
export const NotificationServiceEventTypes = {
  // Email Events
  EMAIL_REQUESTED: 'email.notification.requested',
  EMAIL_SENDING: 'email.notification.sending',
  EMAIL_SENT: 'email.notification.sent',
  EMAIL_FAILED: 'email.notification.failed',
  EMAIL_DELIVERED: 'email.notification.delivered',
  EMAIL_BOUNCED: 'email.notification.bounced',
  EMAIL_OPENED: 'email.notification.opened',
  EMAIL_CLICKED: 'email.notification.clicked',
  
  // SMS Events
  SMS_REQUESTED: 'sms.notification.requested',
  SMS_SENDING: 'sms.notification.sending',
  SMS_SENT: 'sms.notification.sent',
  SMS_FAILED: 'sms.notification.failed',
  SMS_DELIVERED: 'sms.notification.delivered',
  SMS_BOUNCED: 'sms.notification.bounced',
  
  // Push Notification Events
  PUSH_REQUESTED: 'push.notification.requested',
  PUSH_SENT: 'push.notification.sent',
  PUSH_FAILED: 'push.notification.failed',
  PUSH_DELIVERED: 'push.notification.delivered',
  
  // File Events
  FILE_UPLOADED: 'file.uploaded',
  FILE_PROCESSED: 'file.processed',
  FILE_DELETED: 'file.deleted',
  FILE_ACCESS_GRANTED: 'file.access.granted',
  FILE_ACCESS_REVOKED: 'file.access.revoked',
} as const;

/**
 * Email Notification Event Schema
 * Published when email notifications are processed
 */
export interface EmailNotificationEvent {
  eventId: string;
  timestamp: string;
  eventType: typeof NotificationServiceEventTypes[keyof typeof NotificationServiceEventTypes];
  
  data: {
    emailRequestId: string;
    recipientEmail: string;
    recipientName?: string;
    templateId: string;
    subject: string;
    
    // Status information
    status: 'requested' | 'sending' | 'sent' | 'failed' | 'delivered' | 'bounced' | 'opened' | 'clicked';
    provider: 'sendgrid' | 'mailtrap' | 'ses' | 'other';
    
    // Error information (if failed)
    errorCode?: string;
    errorMessage?: string;
    
    // Delivery metadata
    sentAt?: string;
    deliveredAt?: string;
    openedAt?: string;
    clickedAt?: string;
    
    // Template data (sanitized)
    templateData?: Record<string, any>;
  };
  
  metadata: {
    correlationId: string;
    sourceService: typeof ServiceNames.FILE_NOTIFICATION_SERVICE;
    version: '1.0';
    originalRequestSource?: string; // Which service requested the email
    retryCount?: number;
    priority: 'low' | 'normal' | 'high' | 'urgent';
  };
}

/**
 * SMS Notification Event Schema
 * Published when SMS notifications are processed
 */
export interface SmsNotificationEvent {
  eventId: string;
  timestamp: string;
  eventType: typeof NotificationServiceEventTypes[keyof typeof NotificationServiceEventTypes];
  
  data: {
    smsRequestId: string;
    recipientPhone: string;
    recipientName?: string;
    messageContent: string;
    
    // Status information
    status: 'requested' | 'sending' | 'sent' | 'failed' | 'delivered' | 'bounced';
    provider: 'twilio' | 'gupshup' | 'other';
    
    // Error information (if failed)
    errorCode?: string;
    errorMessage?: string;
    
    // Delivery metadata
    sentAt?: string;
    deliveredAt?: string;
    
    // Message metadata
    messageLength: number;
    segmentCount: number;
    cost?: number;
  };
  
  metadata: {
    correlationId: string;
    sourceService: typeof ServiceNames.FILE_NOTIFICATION_SERVICE;
    version: '1.0';
    originalRequestSource?: string;
    retryCount?: number;
    priority: 'low' | 'normal' | 'high' | 'urgent';
  };
}

/**
 * File Upload Event Schema
 * Published when files are uploaded or processed
 */
export interface FileEvent {
  eventId: string;
  timestamp: string;
  eventType: typeof NotificationServiceEventTypes.FILE_UPLOADED | typeof NotificationServiceEventTypes.FILE_PROCESSED | typeof NotificationServiceEventTypes.FILE_DELETED;
  
  data: {
    fileId: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    filePath: string;
    
    // Upload information
    uploadedBy: string; // User ID
    uploadedByEmail?: string;
    uploadedAt: string;
    
    // Processing information
    processedAt?: string;
    processingStatus?: 'pending' | 'processing' | 'completed' | 'failed';
    processingResults?: Record<string, any>;
    
    // Storage information
    storageProvider: 'digitalocean' | 'cloudinary' | 'aws' | 'local';
    storageLocation: string;
    
    // Access control
    isPublic: boolean;
    accessPermissions?: string[];
  };
  
  metadata: {
    correlationId: string;
    sourceService: typeof ServiceNames.FILE_NOTIFICATION_SERVICE;
    version: '1.0';
    entityType?: string; // What the file relates to (business_verification, hospital_license, etc.)
    entityId?: string;
  };
}

/**
 * Notification Service Event Union Type
 */
export type NotificationServiceEvent = 
  | EmailNotificationEvent
  | SmsNotificationEvent
  | FileEvent;

/**
 * Type for Notification Service event types
 */
export type NotificationServiceEventType = typeof NotificationServiceEventTypes[keyof typeof NotificationServiceEventTypes];