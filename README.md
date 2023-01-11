# BuddyUp

By uploading your schedule from BearTracks, BuddyUp helps you form study groups by searching for students who share the same courses as you.

## How To Run:

Requirements: Docker

1. Clone the repo
2. Create a `.env` file in the repo that contains the keys for a Google OAuth app:

```
GOOGLE_CLIENT_ID="Insert Google Client ID Here"
GOOGLE_CLIENT_SECRET="Insert Google Client Secret Here"
```

3. Run `docker-compose up`
4. Visit http://localhost:8000 to see the frontend

