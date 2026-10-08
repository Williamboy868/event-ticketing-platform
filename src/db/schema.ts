import { pgTable, uuid, text, timestamp, doublePrecision, integer, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user } from './auth-schema';

export const userRoleEnum = pgEnum('user_role', ['PARTICIPANT', 'ORGANIZER', 'ADMIN']);
export const eventStatusEnum = pgEnum('event_status', ['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED']);
export const orderStatusEnum = pgEnum('order_status', ['PENDING', 'PAID', 'CANCELLED']);
export const paymentStatusEnum = pgEnum('payment_status', ['PENDING', 'SUCCESSFUL', 'FAILED']);
export const ticketStatusEnum = pgEnum('ticket_status', ['ACTIVE', 'SCANNED']);

// users table has been replaced by the user table from better-auth

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

export const ticketCategories = pgTable('ticket_categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id').references(() => events.id).notNull(),
  name: text('name').notNull(),
  price: doublePrecision('price').notNull(),
  capacity: integer('capacity').notNull(),
});

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  participantId: text('participant_id').references(() => user.id).notNull(),
  eventId: uuid('event_id').references(() => events.id).notNull(),
  totalAmount: doublePrecision('total_amount').notNull(),
  status: orderStatusEnum('status').default('PENDING').notNull(),
});

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id).notNull().unique(),
  paymentMethod: text('payment_method').notNull(),
  amount: doublePrecision('amount').notNull(),
  status: paymentStatusEnum('status').default('PENDING').notNull(),
});

export const tickets = pgTable('tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
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
  orders: many(orders),
}));

export const ticketCategoriesRelations = relations(ticketCategories, ({ one, many }) => ({
  event: one(events, {
    fields: [ticketCategories.eventId],
    references: [events.id],
  }),
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
  payment: one(payments, {
    fields: [orders.id],
    references: [payments.orderId],
  }),
  tickets: many(tickets),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
}));

export const ticketsRelations = relations(tickets, ({ one }) => ({
  order: one(orders, {
    fields: [tickets.orderId],
    references: [orders.id],
  }),
  category: one(ticketCategories, {
    fields: [tickets.categoryId],
    references: [ticketCategories.id],
  }),
}));
