# J&O Farm Produce Ltd

A responsive, buildless website for Joseph & Owura Farm Produce Ltd.

## Local preview

Run `python -m http.server 4173 --directory dist` from this directory and open http://localhost:4173.

## Files

- `dist/index.html`: website content and accessible enquiry form
- `dist/styles.css`: responsive design
- `dist/app.js`: product catalogue, division filtering, detail dialogs, and WhatsApp enquiry composition
- `dist/assets/`: locally hosted illustrative agricultural images and favicon

The enquiry form opens a prepared WhatsApp message for the visitor to review and send. No enquiries are stored on this site. Phone and WhatsApp destination: +233 243 503 083.

Agricultural photographs are illustrative stock photography from Unsplash, not authenticated images of the J&O farm. Replace them with original farm images when available. Fonts are served through Google Fonts with system fallbacks.

Deployment configuration is in `.openai/hosting.json`.
