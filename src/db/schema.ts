import { pgTable, uuid, text, timestamp, doublePrecision, integer, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from './auth-schema.js';

export const userRoleEnum = pgEnum('user_role', ['PARTICIPANT', 'ORGANIZER', 'ADMIN']);
export const eventStatusEnum = pgEnum('event_status', ['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED']);
export const orderStatusEnum = pgEnum('order_status', ['PENDING', 'PAID', 'CANCELLED', 'EXPIRED', 'REFUNDED']);
export const paymentStatusEnum = pgEnum('payment_status', ['PENDING', 'SUCCESSFUL', 'FAILED', 'REFUNDED']);
export const ticketStatusEnum = pgEnum('ticket_status', ['ACTIVE', 'SCANNED', 'CANCELLED', 'REFUNDED']);
export const discountTypeEnum = pgEnum('discount_type', ['PERCENTAGE', 'FIXED_AMOUNT']);
export const refundStatusEnum = pgEnum('refund_status', ['PENDING', 'PROCESSED', 'FAILED']);

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  organizerId: text('organizer_id').references(() => user.id).notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  discountPercentage: doublePrecision('discount_percentage').default(0.0).notNull(),
  status: eventStatusEnum('status').default('UPCOMING').notNull(),
});

export const promoCodes = pgTable('promo_codes', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id').references(() => events.id, { onDelete: 'cascade' }).notNull(),
  code: text('code').notNull(),
  discountType: discountTypeEnum('discount_type').default('PERCENTAGE').notNull(),
  discountValue: doublePrecision('discount_value').notNull(),
  maxUses: integer('max_uses'),
  currentUses: integer('current_uses').default(0).notNull(),
  validFrom: timestamp('valid_from'),
  validUntil: timestamp('valid_until'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const ticketCategories = pgTable('ticket_categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id').references(() => events.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  price: doublePrecision('price').notNull(),
  capacity: integer('capacity').notNull(),
});

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  participantId: text('participant_id').references(() => user.id).notNull(),
  eventId: uuid('event_id').references(() => events.id).notNull(),
  promoCodeId: uuid('promo_code_id').references(() => promoCodes.id),
  totalAmount: doublePrecision('total_amount').notNull(),
  status: orderStatusEnum('status').default('PENDING').notNull(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  ticketCategoryId: uuid('ticket_category_id').references(() => ticketCategories.id).notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: doublePrecision('unit_price').notNull(),
  subtotal: doublePrecision('subtotal').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id).notNull().unique(),
  paymentMethod: text('payment_method').notNull(),
  amount: doublePrecision('amount').notNull(),
  status: paymentStatusEnum('status').default('PENDING').notNull(),
});

export const refunds = pgTable('refunds', {
  id: uuid('id').defaultRandom().primaryKey(),
  paymentId: uuid('payment_id').references(() => payments.id).notNull(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  amount: doublePrecision('amount').notNull(),
  reason: text('reason'),
  status: refundStatusEnum('status').default('PENDING').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const tickets = pgTable('tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  orderItemId: uuid('order_item_id').references(() => orderItems.id),
  categoryId: uuid('category_id').references(() => ticketCategories.id).notNull(),
  qrCodeData: text('qr_code_data').notNull().unique(),
  status: ticketStatusEnum('status').default('ACTIVE').notNull(),
});

// Relations

export const eventsRelations = relations(events, ({ one, many }) => ({
  organizer: one(user, {
    fields: [events.organizerId],
    references: [user.id],
  }),
  ticketCategories: many(ticketCategories),
  promoCodes: many(promoCodes),
  orders: many(orders),
}));

export const promoCodesRelations = relations(promoCodes, ({ one, many }) => ({
  event: one(events, {
    fields: [promoCodes.eventId],
    references: [events.id],
  }),
  orders: many(orders),
}));

export const ticketCategoriesRelations = relations(ticketCategories, ({ one, many }) => ({
  event: one(events, {
    fields: [ticketCategories.eventId],
    references: [events.id],
  }),
  orderItems: many(orderItems),
  tickets: many(tickets),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  participant: one(user, {
    fields: [orders.participantId],
    references: [user.id],
  }),
  event: one(events, {
    fields: [orders.eventId],
    references: [events.id],
  }),
  promoCode: one(promoCodes, {
    fields: [orders.promoCodeId],
    references: [promoCodes.id],
  }),
  payment: one(payments, {
    fields: [orders.id],
    references: [payments.orderId],
  }),
  orderItems: many(orderItems),
  tickets: many(tickets),
  refunds: many(refunds),
}));

export const orderItemsRelations = relations(orderItems, ({ one, many }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  ticketCategory: one(ticketCategories, {
    fields: [orderItems.ticketCategoryId],
    references: [ticketCategories.id],
  }),
  tickets: many(tickets),
}));

export const paymentsRelations = relations(payments, ({ one, many }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
  refunds: many(refunds),
}));

export const refundsRelations = relations(refunds, ({ one }) => ({
  payment: one(payments, {
    fields: [refunds.paymentId],
    references: [payments.id],
  }),
  order: one(orders, {
    fields: [refunds.orderId],
    references: [orders.id],
  }),
}));

export const ticketsRelations = relations(tickets, ({ one }) => ({
  order: one(orders, {
    fields: [tickets.orderId],
    references: [orders.id],
  }),
  orderItem: one(orderItems, {
    fields: [tickets.orderItemId],
    references: [orderItems.id],
  }),
  category: one(ticketCategories, {
    fields: [tickets.categoryId],
    references: [ticketCategories.id],
  }),
}));
