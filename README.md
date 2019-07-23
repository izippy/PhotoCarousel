# PhotoCarousel

> Photo Carousel module of Guestly

# CRUD - API Documentation

CRUD - initial listings

- CREATE / POST: /api/rooms/photos/initial/:listingID
- READ / GET: /api/rooms/photos/initial/:listingID
- UPDATE / PUT: /api/rooms/photos/initial/:listingID
- DELETE / DELETE: /api/rooms/photos/initial/:listingID

CRUD -  prior listings

- CREATE / POST: /api/rooms/photos/:listingID
- READ / GET: /api/rooms/photos/:listingID
- UPDATE / PUT: /api/rooms/photos/:listingID
- DELETE / DELETE: /api/rooms/photos/:listingID

## Related Projects

  - https://github.com/guest-ly/Reservations
  - https://github.com/guest-ly/Listing

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage
> Run webpack
```sh
npm run react-dev
```
> Run server on port 3002
```sh
npm start
```
> Seed database with random data using faker.js
```sh
npm run seed
```
> Run jest/enzyme tests
```sh
npm test
```

## Requirements

- Node 6.13.0
- Unsplash API key
```sh
Replace comment with your API key in unsplashHelper.js
```

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```
