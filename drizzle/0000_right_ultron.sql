CREATE TYPE "public"."event_status" AS ENUM('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('PENDING', 'PAID', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('PENDING', 'SUCCESSFUL', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."ticket_status" AS ENUM('ACTIVE', 'SCANNED');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('PARTICIPANT', 'ORGANIZER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizer_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"discount_percentage" double precision DEFAULT 0 NOT NULL,
	"status" "event_status" DEFAULT 'UPCOMING' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"participant_id" uuid NOT NULL,
	"event_id" uuid NOT NULL,
	"total_amount" double precision NOT NULL,
	"status" "order_status" DEFAULT 'PENDING' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"payment_method" text NOT NULL,
	"amount" double precision NOT NULL,
	"status" "payment_status" DEFAULT 'PENDING' NOT NULL,
	CONSTRAINT "payments_order_id_unique" UNIQUE("order_id")
);
--> statement-breakpoint
CREATE TABLE "ticket_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"name" text NOT NULL,
	"price" double precision NOT NULL,
	"capacity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"qr_code_data" text NOT NULL,
	"status" "ticket_status" DEFAULT 'ACTIVE' NOT NULL,
	CONSTRAINT "tickets_qr_code_data_unique" UNIQUE("qr_code_data")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'PARTICIPANT' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_organizer_id_users_id_fk" FOREIGN KEY ("organizer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_participant_id_users_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ticket_categories" ADD CONSTRAINT "ticket_categories_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_category_id_ticket_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."ticket_categories"("id") ON DELETE no action ON UPDATE no action;