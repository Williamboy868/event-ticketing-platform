import { detectBot, slidingWindow, validateEmail } from '@arcjet/nest';

/**
 * Anti-scalping sliding window rate limit for checkout routes (e.g. /orders/checkout).
 * Allows at most 5 checkout requests per minute per IP to prevent hoarding bots.
 */
export const checkoutRateLimitRule = slidingWindow({
  mode: 'LIVE',
  interval: '1m',
  max: 5,
});

/**
 * Strict bot protection for sensitive organizer management routes.
 * Blocks all automated bots and clients.
 */
export const strictBotProtectionRule = detectBot({
  mode: 'LIVE',
  allow: [],
});

/**
 * Email validation rule for participant and organizer registrations.
 * Rejects invalid syntax and disposable/burner email domains.
 */
export const emailValidationRule = validateEmail({
  mode: 'LIVE',
  deny: ['DISPOSABLE', 'INVALID'],
});
