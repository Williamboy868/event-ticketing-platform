DATABASE SCHEMA
    USER ||--o{ EVENT : "organizes"
    USER ||--o{ ORDER : "places"
    EVENT ||--|{ TICKET_CATEGORY : "has"
    EVENT ||--o{ ORDER : "receives"
    ORDER ||--|| PAYMENT : "is paid via"
    ORDER ||--|{ TICKET : "generates"
    TICKET_CATEGORY ||--o{ TICKET : "defines type for"

    USER {
        UUID id PK
        String first_name
        String last_name
        String email
        String password
        Enum role "participant, organizer, admin"
    }

    EVENT {
        UUID id PK
        UUID organizer_id FK
        String name
        String description
        DateTime start_time
        DateTime end_time
        Float discount_percentage
        Enum status
    }

    TICKET_CATEGORY {
        UUID id PK
        UUID event_id FK
        String name "e.g., VIP, General"
        Float price
        Int capacity
    }

    ORDER {
        UUID id PK
        UUID participant_id FK
        UUID event_id FK
        Float total_amount
        Enum status
    }

    PAYMENT {
        UUID id PK
        UUID order_id FK
        String payment_method "Card, Mobile Money, etc."
        Float amount
        Enum status
    }

    TICKET {
        UUID id PK
        UUID order_id FK
        UUID category_id FK
        String qr_code_data
        Enum status "active, scanned"
    }