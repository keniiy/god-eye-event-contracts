# @kenniy/godeye-event-contracts

## Shared event schemas and stream definitions for 8Medical godeye microservices architecture

[![npm version](https://badge.fury.io/js/%40kenniy%2Fgodeye-event-contracts.svg)](https://www.npmjs.com/package/@kenniy/godeye-event-contracts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg)]()

## 🎉 Latest Update: v1.0.4 - Complete Legacy Cleanup

✅ **All GOD-EYE services now fully standardized**  
✅ **Legacy event files and constants removed**  
✅ **Schema mismatches resolved**  
✅ **All services compile successfully**

## 🎯 Purpose

This package provides **standardized event contracts** across all 8Medical microservices, ensuring consistent communication patterns and preventing integration issues like stream name mismatches.

## 📦 Installation

```bash
# NPM
npm install @kenniy/godeye-event-contracts

# Yarn
yarn add @kenniy/godeye-event-contracts

# PNPM
pnpm add @kenniy/godeye-event-contracts
```

## 🚀 Quick Start

 ```typescript
import { EventStreams, UserServiceEvents } from '@kenniy/godeye-event-contracts';

// Publisher (User Service)
await eventPublisher.publish(
  EventStreams.USER_SERVICE_EVENTS,
  UserServiceEvents.BUSINESS_REGISTERED,
  businessData
);

// Consumer (HRM Service)
consumer.subscribe(EventStreams.USER_SERVICE_EVENTS, (event) => {
  if (event.eventType === UserServiceEvents.BUSINESS_REGISTERED) {
    await createHospitalProfile(event.data);
  }
});
```

## 🏗️ Architecture

### Phase 1: Service-Based Streams (Current)

Events are organized by **service ownership** with **domain-grouped schemas** for easy understanding:

```plaintext
godeye-event-contracts/
├── streams/          # Stream definitions
├── events/           # Event schemas (organized by domain)
│   ├── user-service/     # Registration, auth, verification
│   ├── hrm-service/      # Hospital management, resources
│   ├── notifications/    # Email, SMS, file events
│   ├── payments/         # Transaction, billing events
│   ├── transport/        # Ambulance, logistics events
│   └── system/           # Health, monitoring events
├── schemas/          # Shared types and base interfaces
└── consumers/        # Consumer group definitions
```

### Phase 2: Domain-Based Streams (Future)

When you scale, easily migrate to domain-organized streams while keeping the same event schemas.

## 📋 Available Streams

| Stream | Purpose | Publishers | Consumers |
|--------|---------|------------|-----------|
| `user-service-events` | User registration, auth | User Service | HRM, Notifications, Analytics |
| `hrm-service-events` | Hospital management | HRM Service | User, Notifications, Analytics |
| `notification-service-events` | Email/SMS delivery | File+Notification | Analytics, Audit |
| `payment-service-events` | Financial transactions | Payment Service | User, Notifications, Analytics |
| `transport-service-events` | Ambulance logistics | Transport Service | HRM, Notifications, Analytics |

## 📚 Event Types

### User Service Events

```typescript
import { UserServiceEvents, UserServiceSchemas } from '@kenniy/godeye-event-contracts';

// Event Types
UserServiceEvents.BUSINESS_REGISTERED      // 'user.business.registered'
UserServiceEvents.CUSTOMER_REGISTERED      // 'user.customer.registered'
UserServiceEvents.EMAIL_VERIFIED           // 'user.email.verified'
UserServiceEvents.BUSINESS_VERIFIED        // 'user.business.verified'

// Event Schemas
interface BusinessRegisteredEvent extends UserServiceSchemas.BusinessRegistered {
  eventId: string;
  eventType: 'user.business.registered';
  timestamp: string;
  data: {
    businessId: string;
    businessName: string;
    businessType: 'hospital' | 'hmo' | 'diagnostic_center';
    email: string;
    // ... more fields
  };
}
```

### HRM Service Events

```typescript
import { HrmServiceEvents, HrmServiceSchemas } from '@kenniy/godeye-event-contracts';

HrmServiceEvents.HOSPITAL_PROFILE_CREATED   // 'hrm.hospital.created'
HrmServiceEvents.RESOURCE_UPDATED           // 'hrm.resource.updated'
HrmServiceEvents.BED_ASSIGNED               // 'hrm.bed.assigned'
```

### Notification Service Events

```typescript
import { NotificationServiceEvents } from '@kenniy/godeye-event-contracts';

NotificationServiceEvents.EMAIL_SENT        // 'notification.email.sent'
NotificationServiceEvents.SMS_SENT          // 'notification.sms.sent'
NotificationServiceEvents.FILE_UPLOADED     // 'notification.file.uploaded'
```

## 🔧 Usage Examples

### Publishing Events

```typescript
import { EventStreams, UserServiceEvents } from '@kenniy/godeye-event-contracts';

class BusinessRegistrationService {
  async registerBusiness(businessData: BusinessRegistrationDto) {
    // 1. Create business entity
    const business = await this.createBusinessEntity(businessData);

    // 2. Publish standardized event
    await this.eventPublisher.publish(
      EventStreams.USER_SERVICE_EVENTS,
      {
        eventId: uuidv4(),
        eventType: UserServiceEvents.BUSINESS_REGISTERED,
        timestamp: new Date().toISOString(),
        data: {
          businessId: business.id,
          businessName: business.name,
          businessType: business.type,
          email: business.email,
          ownerId: business.ownerId,
          registeredAt: business.createdAt,
        },
        metadata: {
          correlationId: businessData.correlationId,
          sourceService: 'user-service',
          version: '1.0',
        }
      }
    );

    return business;
  }
}
```

### Consuming Events

```typescript
import { EventStreams, UserServiceEvents } from '@kenniy/godeye-event-contracts';

class HrmEventConsumer {
  async startConsumers() {
    // Subscribe to user service events
    await this.consumer.subscribe(
      EventStreams.USER_SERVICE_EVENTS,
      this.consumerGroup,
      async (event) => {
        switch (event.eventType) {
          case UserServiceEvents.BUSINESS_REGISTERED:
            await this.handleBusinessRegistration(event);
            break;
          case UserServiceEvents.BUSINESS_VERIFIED:
            await this.handleBusinessVerification(event);
            break;
        }
      }
    );
  }

  private async handleBusinessRegistration(event: BusinessRegisteredEvent) {
    if (event.data.businessType === 'hospital') {
      await this.createHospitalProfile(event.data);
    }
  }
}
```

### Type Safety

```typescript
import { BaseEvent, UserServiceSchemas } from '@kenniy/godeye-event-contracts';

// Fully typed event handling
function handleBusinessEvent(event: BaseEvent<UserServiceSchemas.BusinessRegistered>) {
  // TypeScript knows the exact shape of event.data
  console.log(`New business: ${event.data.businessName}`);
  console.log(`Business type: ${event.data.businessType}`); // Autocomplete works!
}
```

## 🔄 Migration from Legacy

### Before (Inconsistent naming)

```typescript
// User Service published to:
'user-service'

// HRM Service consumed from:
'user_service_events'  // ❌ MISMATCH!
```

### After (Standardized)

```typescript
import { EventStreams } from '@kenniy/godeye-event-contracts';

// Both services use the same constant:
EventStreams.USER_SERVICE_EVENTS  // ✅ 'user-service-events'
```

### Migration Steps

1. **Install the package:**

   ```bash
   npm install @kenniy/godeye-event-contracts
   ```

2. **Update imports:**

   ```typescript
   // Old
   const streamName = 'user-service';

   // New
   import { EventStreams } from '@kenniy/godeye-event-contracts';
   const streamName = EventStreams.USER_SERVICE_EVENTS;
   ```

3. **Update event types:**

   ```typescript
   // Old
   const eventType = 'business.registered';

   // New
   import { UserServiceEvents } from '@kenniy/godeye-event-contracts';
   const eventType = UserServiceEvents.BUSINESS_REGISTERED;
   ```

4. **Test thoroughly** - Events will now flow correctly between services!

## 📊 Consumer Groups

```typescript
import { ConsumerGroups } from '@kenniy/godeye-event-contracts';

// Predefined consumer groups for different purposes
ConsumerGroups.HRM_PROCESSORS           // 'hrm-business-processors'
ConsumerGroups.EMAIL_PROCESSORS         // 'email-notification-processors'
ConsumerGroups.ANALYTICS_PROCESSORS     // 'analytics-processors'
ConsumerGroups.AUDIT_PROCESSORS         // 'audit-trail-processors'
```

## 🛠️ Development

```bash
# Clone and setup
git clone https://github.com/keniiy/event-contracts.git
cd event-contracts
npm install

# Build
npm run build

# Watch mode
npm run dev

# Publish (maintainers only)
npm run prepublishOnly
npm publish
```

## 📈 Roadmap

### Phase 1: Service-Based (✅ COMPLETED)

- [x] Standardized stream names
- [x] Type-safe event schemas
- [x] Consumer group definitions
- [x] Migration documentation
- [x] **NEW v1.0.4**: Complete legacy cleanup across all services
- [x] **NEW v1.0.4**: System events for service health monitoring
- [x] **NEW v1.0.4**: Schema validation and compilation testing

### Phase 2: Domain-Based (6+ months)

- [ ] Domain-organized streams
- [ ] Event versioning system
- [ ] Schema evolution tools
- [ ] Cross-domain event routing

### Phase 3: Enterprise Scale (12+ months)

- [ ] Event sourcing patterns
- [ ] CQRS integration
- [ ] Distributed tracing
- [ ] Event replay capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-event-type`
3. Add event schemas with proper TypeScript types
4. Update documentation and examples
5. Submit a pull request

## 📄 License

MIT © 8Medical Development Team

## 🆘 Support

- **Documentation**: [GitHub Wiki](https://github.com/keniiy/god-eye-event-contracts/blob/main/README.md)
- **Issues**: [GitHub Issues](https://github.com/keniiy/event-contracts/issues)
- **Slack**: #event-architecture channel
- **Email**: [kehindekehinde@gmail.com](mailto:kehindekehinde@gmail.com)

---

**🎯 Goal**: Zero integration issues across 8Medical microservices through standardized event contracts.
