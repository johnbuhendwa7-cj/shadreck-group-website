# Enquiry delivery adapter

Current production behaviour is an honest email-draft fallback. Required name, message and one contact method are checked accessibly. Six service slugs are allowlisted. Arbitrary URL values are ignored and are never inserted as HTML. The phone and email links work without JavaScript. No browser field data is persisted or logged.

Configure `site.enquiryEndpoint` only after an authorised backend exists. The client POSTs JSON:

```json
{"name":"Example","phone":"","email":"test@example.invalid","service":"civil-works","location":"Parklands","message":"Project details","website":""}
```

The endpoint must return a 2xx response **and** `{"delivered":true}` only after the provider confirms delivery/acceptance under its documented semantics. A queued receipt must not be presented as confirmed delivery unless the product wording is adjusted. All other status codes, invalid JSON, timeout or `delivered:false` show an explicit failure. The browser timeout is 15 seconds.

The real server implementation must independently enforce:

- Name 1–120 characters, message 1–5000, email ≤254, phone ≤40, location ≤180; valid email when supplied; require phone or email; allowlisted service or general.
- Reject an occupied honeypot, oversized payloads and invalid content type. Add an appropriate server-side spam check and request-rate limit (including behind proxies); a client honeypot alone is insufficient.
- Trusted origins, appropriate CSRF defence for the chosen host/session model, HTTPS, provider timeouts and idempotency to avoid duplicate sends.
- Server-only provider credentials, fixed authorised recipient and safely escaped plain-text content. Never use arbitrary user values as mail headers or recipients.
- No enquiry bodies or contact details in public logs; approved retention/privacy rules and useful non-sensitive error responses.

Example server-only environment configuration (not active; no secrets included):

```dotenv
MAIL_PROVIDER_API_KEY=SET_ON_SERVER_ONLY
ENQUIRY_RECIPIENT=CONFIRM_AUTHORISED_RECIPIENT
ALLOWED_ORIGIN=CONFIRMED_HTTPS_ORIGIN
RATE_LIMIT_STORE_URL=SERVER_SIDE_STORE
```

The client adapter is `src/components/shadreck/enquiry.js`. Mock success/failure checks exercise the adapter and UI without a mail service. A live provider, server-side protections and real delivery have **not** been configured or verified.
