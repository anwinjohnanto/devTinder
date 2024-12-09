# Dev tinder API List

## Auth
- POST /login
- POST /logout
- POST /signup

## Profile
- GET /profile/view
- PATCH /profile/update
- POST /profile/password

## Connection Request
- POST /request/send/interested/:id
- POST /request/send/rejected/:id

- POST /request/review/accepted/:id
- POST /request/review/rejected/:id

- GET /connections
- GET /request/recieved