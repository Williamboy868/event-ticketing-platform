# Database Architecture & Schema Specification

## Entity Relationship (ER) Diagram

```mermaid
erDiagram
    %% ========================================================
    %% RELATIONSHIPS & CARDINALITIES
    %% ========================================================

    USER ||--o{ SESSION : "maintains"
    USER ||--o{ ACCOUNT : "authenticates via"
    USER ||--o{ EVENT : "creates & manages (as organizer)"
    USER ||--o{ ORDER : "places (as participant)"
    USER ||--o{ TICKET : "scans at gate (as organizer/staff)"

    EVENT ||--|{ TICKET_CATEGORY : "contains"
    EVENT ||--o{ PROMO_CODE : "provides"
    EVENT ||--o{ ORDER : "receives"

    TICKET_CATEGORY ||--o{ ORDER_ITEM : "ordered in"
    TICKET_CATEGORY ||--o{ TICKET : "defines tier for"

    ORDER ||--|{ ORDER_ITEM : "composed of"
    ORDER ||--o{ TICKET : "issues"
    ORDER ||--o| PAYMENT : "paid with"
    ORDER }o--o| PROMO_CODE : "applies"
    ORDER ||--o{ REFUND : "tracks"

    ORDER_ITEM ||--|{ TICKET : "generates"
    PAYMENT ||--o{ REFUND : "reimburses"

    %% ========================================================
    %% ENTITY DEFINITIONS
    %% ========================================================

    USER {
        UUID id PK
        String first_name
        String last_name
        String email UK
        Boolean email_verified
        String image
        String phone_number
        Enum role "PARTICIPANT, ORGANIZER"
        DateTime created_at
        DateTime updated_at
    }

    SESSION {
        UUID id PK
        UUID user_id FK
        String token UK
        DateTime expires_at
        String ip_address
        String user_agent
        DateTime created_at
        DateTime updated_at
    }

    ACCOUNT {
        UUID id PK
        UUID user_id FK
        String account_id
        String provider_id
        String password
        String access_token
        String refresh_token
        DateTime access_token_expires_at
        DateTime created_at
        DateTime updated_at
    }

    VERIFICATION {
        UUID id PK
        String identifier
        String value
        DateTime expires_at
        DateTime created_at
        DateTime updated_at
    }

    EVENT {
        UUID id PK
        UUID organizer_id FK
        String title
        String slug UK
        String description
        String category
        Enum format "IN_PERSON, ONLINE, HYBRID"
        String venue_name
        String venue_address
        String city
        String country
        String virtual_meeting_url
        String banner_image_url
        String thumbnail_url
        DateTime start_time
        DateTime end_time
        Enum status "DRAFT, PUBLISHED, ONGOING, COMPLETED, CANCELLED"
        DateTime created_at
        DateTime updated_at
    }

    PROMO_CODE {
        UUID id PK
        UUID event_id FK
        String code
        Enum discount_type "PERCENTAGE, FIXED_AMOUNT"
        Float discount_value
        Int max_uses
        Int current_uses
        DateTime valid_from
        DateTime valid_until
        Boolean is_active
        DateTime created_at
        DateTime updated_at
    }

    TICKET_CATEGORY {
        UUID id PK
        UUID event_id FK
        String name "e.g., VIP, Early Bird, General"
        String description
        Float price
        String currency
        Int total_capacity
        Int available_capacity
        Int min_per_order
        Int max_per_order
        DateTime sales_start_at
        DateTime sales_end_at
        Enum status "ACTIVE, SOLD_OUT, PAUSED, HIDDEN"
        DateTime created_at
        DateTime updated_at
    }

    ORDER {
        UUID id PK
        String order_number UK
        UUID participant_id FK
        UUID event_id FK
        UUID promo_code_id FK
        Float subtotal
        Float discount_amount
        Float tax_amount
        Float total_amount
        String currency
        Enum status "PENDING, PAID, CANCELLED, EXPIRED, REFUNDED"
        DateTime reserved_until
        DateTime created_at
        DateTime updated_at
    }

    ORDER_ITEM {
        UUID id PK
        UUID order_id FK
        UUID ticket_category_id FK
        Int quantity
        Float unit_price
        Float subtotal
        DateTime created_at
    }

    TICKET {
        UUID id PK
        UUID order_id FK
        UUID order_item_id FK
        UUID ticket_category_id FK
        String ticket_code UK
        String qr_code_data UK
        String attendee_name
        String attendee_email
        Float price_paid
        Enum status "ACTIVE, CHECKED_IN, CANCELLED, REFUNDED"
        DateTime scanned_at
        UUID scanned_by_id FK
        DateTime created_at
        DateTime updated_at
    }

    PAYMENT {
        UUID id PK
        UUID order_id FK
        String payment_method "CARD, MOBILE_MONEY, TRANSFER"
        String payment_gateway "STRIPE, PAYSTACK, PAYPAL"
        String gateway_transaction_id UK
        Float amount
        String currency
        Enum status "PENDING, SUCCESSFUL, FAILED, REFUNDED"
        String failure_reason
        DateTime paid_at
        DateTime created_at
        DateTime updated_at
    }

    REFUND {
        UUID id PK
        UUID payment_id FK
        UUID order_id FK
        Float amount
        String currency
        String reason
        Enum status "PENDING, PROCESSED, FAILED"
        String gateway_refund_id UK
        DateTime processed_at
        DateTime created_at
        DateTime updated_at
    }
```

---

## Architectural Enhancements & Key Additions

### 1. Two-Role Model (`PARTICIPANT` vs `ORGANIZER`)
- **Participant:** Discovers events, reserves tickets, executes payments, receives individual QR tickets, and attends.
- **Organizer:** Creates events, specifies venue/stream details, creates ticket tiers/pricing, issues promo codes, and scans/validates attendee tickets at the gate.

### 2. Full Authentication Integration (Better Auth)
- Added **`Session`**, **`Account`**, and **`Verification`** tables.
- Separates user profiles from authentication provider state (credentials, Google/GitHub OAuth, session revocation, email verification, password reset tokens).

### 3. Order Items & Line-Item Pricing (`ORDER_ITEM`)
- **Why it was missing:** The initial draft linked `ORDER` directly to `TICKET`. In real ticketing, users purchase mixed bundles (e.g., 2 VIP + 1 Regular) in one order.
- **Solution:** `ORDER_ITEM` records the exact snapshot of `unit_price`, `quantity`, and `subtotal`, shielding transactions from future ticket price adjustments.

### 4. Concurrency & Overselling Prevention (`reserved_until`)
- Adds `reserved_until` to `ORDER` and `available_capacity` to `TICKET_CATEGORY`.
- When checkout starts, tickets are reserved for a 10–15 minute holding window. If payment times out, inventory releases automatically.

### 5. Check-In & Gate Verification Tracking
- **`Ticket`** includes `scanned_at` and `scanned_by_id` (`FK -> User`).
- Prevents double-scanning fraud and provides an audit trail of which organizer/staff member checked in the attendee.
- Includes `attendee_name` and `attendee_email` for multi-ticket buyer allocations.

### 6. Event Locations & Media Assets
- Added event formats: `IN_PERSON`, `ONLINE`, `HYBRID`.
- Full venue attributes (`venue_name`, `venue_address`, `city`, `country`) and secure `virtual_meeting_url`.
- Promotional assets: `banner_image_url`, `thumbnail_url`.

### 7. Dynamic Promotions (`PROMO_CODE`)
- Replaces static event-level discounts with flexible coupon campaigns (`PERCENTAGE` or `FIXED_AMOUNT`), maximum usage limits, and expiration windows.

### 8. Payment Gateway Audit & Refunds (`PAYMENT`, `REFUND`)
- Added `gateway_transaction_id`, `payment_gateway` (e.g., Stripe, Paystack), and currency tracking.
- Added **`REFUND`** model for handling event cancellations, date changes, and chargebacks.