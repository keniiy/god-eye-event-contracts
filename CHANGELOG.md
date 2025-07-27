# Changelog

All notable changes to the `@8medical/event-contracts` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-27

### Added

#### Phase 1: Service-Based Event Architecture

- **Event Streams**: Standardized Redis stream names for all 8Medical services
  - `user-service-events` - User registration, authentication, verification
  - `hrm-service-events` - Hospital management, resource updates
  - `notification-service-events` - Email, SMS, file processing
  - `payment-service-events` - Payment processing and billing
  - `transport-service-events` - Ambulance and logistics
  - `business-verification-events` - Cross-service verification workflows
  - `service-health-events` - Service monitoring and health checks
  - `audit-events` - Security and compliance audit trails

- **Consumer Groups**: Organized event processing groups
  - `hrm-business-processors` - HRM business logic processing
  - `email-notification-processors` - Email delivery processing
  - `sms-notification-processors` - SMS delivery processing
  - `analytics-processors` - Analytics and reporting
  - `audit-trail-processors` - Audit and compliance logging
  - `payment-processors` - Payment business logic
  - `transport-processors` - Transport and logistics
  - `health-monitoring-processors` - System health monitoring
  - `integration-processors` - Third-party integrations
  - `file-processors` - File upload and processing

- **User Service Events**: Complete event schemas for user domain
  - Customer registration events with medical info and privacy settings
  - Business registration events with comprehensive business data
  - Agent invitation and response workflows
  - Full TypeScript type definitions and interfaces

- **Base Event System**: Foundation for all event types
  - `BaseEvent<T>` interface for type-safe event handling
  - `EventMetadata` for correlation, tracing, and processing hints
  - Common business entity identifiers and types
  - Error handling and address/contact structures
  - Event envelope for Redis stream storage

- **Developer Experience**:
  - Comprehensive TypeScript support with full intellisense
  - Utility functions for stream validation and routing
  - Migration helpers for legacy stream names
  - Extensive JSDoc documentation
  - Usage examples and integration guides

- **Future Roadmap**: Phase 2 domain-based architecture planning
  - Domain stream definitions ready for future migration
  - Backwards compatibility considerations
  - Gradual migration strategy documentation

### Documentation

- Complete README with installation, usage, and migration guides
- TypeScript examples for publishers and consumers
- Service integration patterns and best practices
- Phase 1 to Phase 2 migration strategy
- Consumer group recommendations per service

### Infrastructure

- TypeScript build configuration with strict mode
- NPM package setup ready for public publishing
- Git repository structure with proper .gitignore
- Semantic versioning configuration
- MIT license for open source usage

### Migration Support

- Legacy stream name mappings for smooth transition
- Before/after code examples for all services
- Step-by-step migration guide
- Utility functions to map old stream names to new standards

## [Unreleased]

### Planned for 1.1.0

- **User Service Events** (Additional):
  - Authentication events (login, logout, password reset)
  - Email and phone verification events
  - Profile and preference update events

- **HRM Service Events**:
  - Hospital profile management events
  - Resource and bed management events
  - Patient admission and discharge events

- **Notification Service Events**:
  - Email delivery status events (sent, delivered, bounced, opened)
  - SMS delivery status events
  - File upload and processing events
  - Push notification events

### Planned for 1.2.0

- **Payment Service Events**:
  - Transaction processing events
  - Invoice and billing events
  - Refund and dispute events

- **Transport Service Events**:
  - Ambulance dispatch events
  - Route optimization events
  - Emergency response events

### Planned for 2.0.0 (Phase 2)

- **Domain-Based Architecture**:
  - Migration to domain-organized streams
  - Event versioning system
  - Schema evolution tools
  - Cross-domain event routing
  - Backwards compatibility layer

### Planned for 2.1.0

- **Advanced Features**:
  - Event replay and recovery mechanisms
  - Distributed tracing support
  - Enhanced error handling and retry logic
  - Performance optimizations for high-throughput scenarios

## NOTE

This changelog is a work in progress and will be updated as new features and improvements are made to the `@kenniy/event-contracts` package. Please refer to the GitHub repository for the latest information.
