# Jen Handler Therapy — Website

Static HTML/CSS/JS site for Jen Handler, JD, LCSW (psychodynamic psychotherapy &amp; contemporary psychoanalysis, NYC).

## Structure

- `index.html` — homepage (hub: intro, approach teaser, all 4 services, credentials, CTA)
- `aboutme.html` — About Me
- `approach.html` — clinical approach
- `individual-therapy.html` — Individual Therapy (service page)
- `couples-therapy.html` — Couples Therapy (service page)
- `therapy-for-lawyers-professionals.html` — Therapy for Lawyers & Professionals (service page)
- `supervision.html` — Clinical Supervision
- `contact.html` — contact info + map
- `form.html` — consultation request form (submits to Google Forms)
- `formconfirmation.html` — form thank-you page
- `css/` — stylesheets (tokens, base, nav, footer, home, page, contact-page, form)
- `js/main.js` — nav toggle, dropdown, scroll reveal, active-link highlighting, form submission
- `images/` — photography from Jen's actual office, headshots, hero couch asset
- `sitemap.xml`, `robots.txt`, `llms.txt` — SEO / AEO metadata

## Notes for whoever deploys this

- Google Analytics tag (`G-NNLPGRBYXE`), the Google Form endpoint, and the reCAPTCHA site key are carried over unchanged from the previous site.
- The Zencare and Psychology Today trust badges on the homepage are third-party embeds and require live internet access to render.
- Replace the Google Maps embed on `contact.html` if the office address ever changes.
- Old URL `indiv-and-couples-therapy.html` has been split into `individual-therapy.html` and `couples-therapy.html`. If the old URL has inbound links or search rankings, add a server-side 301 redirect (not possible via static HTML alone) to `individual-therapy.html`.
