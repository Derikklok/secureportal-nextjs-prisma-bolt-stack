ALTER TABLE "user" ADD COLUMN "resetToken" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "resetTokenExpiry" timestamp;