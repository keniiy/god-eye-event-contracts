/**
 * HRM Service Events - Main Export
 * 
 * Hospital Resource Management events for bed management, hospital onboarding,
 * resource allocation, and staff management
 */

/**
 * All HRM Service Event Types (consolidated)
 */
export const HrmServiceEvents = {
  // Hospital Onboarding Events
  HOSPITAL_REGISTERED: 'hrm.hospital.registered',
  HOSPITAL_VERIFIED: 'hrm.hospital.verified',
  HOSPITAL_APPROVED: 'hrm.hospital.approved',
  HOSPITAL_REJECTED: 'hrm.hospital.rejected',
  HOSPITAL_SUSPENDED: 'hrm.hospital.suspended',
  
  // Bed Management Events
  BED_ALLOCATED: 'hrm.bed.allocated',
  BED_RELEASED: 'hrm.bed.released',
  BED_STATUS_UPDATED: 'hrm.bed.status_updated',
  WARD_CAPACITY_UPDATED: 'hrm.ward.capacity_updated',
  
  // Staff Management Events
  STAFF_ASSIGNED: 'hrm.staff.assigned',
  STAFF_REMOVED: 'hrm.staff.removed',
  SHIFT_SCHEDULED: 'hrm.shift.scheduled',
  SHIFT_UPDATED: 'hrm.shift.updated',
  
  // Resource Events
  RESOURCE_ALLOCATED: 'hrm.resource.allocated',
  RESOURCE_REQUESTED: 'hrm.resource.requested',
  EQUIPMENT_ASSIGNED: 'hrm.equipment.assigned',
  EQUIPMENT_MAINTENANCE: 'hrm.equipment.maintenance',
  
  // Emergency Events
  EMERGENCY_ALERT: 'hrm.emergency.alert',
  CAPACITY_WARNING: 'hrm.capacity.warning',
  RESOURCE_SHORTAGE: 'hrm.resource.shortage',
} as const;

/**
 * HRM Service Event Type Union
 */
export type HrmServiceEventType = typeof HrmServiceEvents[keyof typeof HrmServiceEvents];