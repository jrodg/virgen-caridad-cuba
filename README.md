# La Virgen de la Caridad del Cobre

Informational React site for Our Lady of Charity of El Cobre, patroness of Cuba. Visitors can read a historical timeline, watch videos, browse shrine calendar events, and make a donation. An administrator can publish all of that from the browser.

This app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run locally

```bash
cd virgen-caridad-cuba
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Admin desk

The Admin link is not in the public menu. Open the desk at [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and sign in with:

- Username: `admin`
- Password: `Cobre1612@NJ4LaCofradia2026`

From there you can:

- Upload a video file (stored in IndexedDB) or paste a YouTube / Vimeo / direct video URL
- Create, edit, and remove calendar events
- Enter historical events as text on the public timeline
- Set donation copy, suggested amounts, and an optional PayPal email or donate URL; review recorded gifts

Content is saved in this browser (`localStorage` + IndexedDB). There is no remote server in this demo, so another computer or a cleared browser will start from the seeded history and calendar again.

## Scripts

- `npm start` — development server
- `npm test` — test runner
- `npm run build` — production build
