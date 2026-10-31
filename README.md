# Lens Manual: frontend

Angular frontend for a lens manual aimed at an optician chain. It shows lens products and their limits in a way that is quick to look up when selling and ordering, and has an admin view for maintaining the data. Built as a course project (DT190G, Mid Sweden University) with the MEAN stack.

This is the frontend. The Express and MongoDB API it talks to lives in [lensmanual-backend](https://github.com/J-manLans/lensmanual-backend).

## Stack

- Angular 19 (standalone components, router)
- TypeScript, RxJS
- Talks to the backend over HTTP

## Pages

- `/glasmanual`: the lens manual itself, with views for single vision and progressive lenses. This is the default page.
- `/admin`: management of lenses, diameter and strength bounds, and indexes.

## Running it locally

You need Node 20 and the backend running. See the backend README for how to start it.

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Point the frontend at your local backend. In `src/app/services/backend.service.ts`, `apiUrl` currently uses `remoteApiUrl`, which pointed at a course server that no longer exists. Change it to use `localApiUrl` (`http://localhost:3000`):

   ```ts
   private apiUrl = `${this.localApiUrl}/api/v1`
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   Then open `http://localhost:4200/`.

The backend does not ship with any data, so the manual will be empty until you add lenses, for example through the admin page.

## Project layout

```
src/app/features/home/      The lens manual views
src/app/features/admin/     Admin views for lenses, diameters and indexes
src/app/services/           Backend service (all HTTP calls)
src/app/models/             Data models shared across the app
```

## Limitations

This was a course project, where learning the concepts and scoping the work was part of the assignment, and the code reflects that. It is not production code. Known shortcomings:

- **No authentication.** The `/admin` page has no login or route guard, so anyone who can reach the app can change the data.
- **Hardcoded backend address.** The API URL is set in the service file, not in an environment config, and points at a server that no longer exists by default.
- **No automated tests.**
- **Inconsistent naming.** The frontend spells the model "Lense" while the backend uses "Lens".

## Status

A finished course project, left as it was when the course ended. It has not been maintained since, so the setup may need small fixes to run today (the frontend still points at a course server that no longer exists, see above). I may pick it up again someday.
