# PhotoCarousel

> Photo Carousel module of Guestly

## CRUD - API Documentation

### CRUD - initial listings

- **CREATE** | **POST**: /api/rooms/photos/initial/:listingID | create a new listings post
- **READ** | **GET**: /api/rooms/photos/initial/:listingID | read all of the listings
- **UPDATE** | **PUT**: /api/rooms/photos/initial/:listingID | update a existing listing
- **DELETE** | **DELETE**: /api/rooms/photos/initial/:listingID | delete a existing listing

### CRUD -  prior listings

- **CREATE** | **POST**: /api/rooms/photos/:listingID | create a new listings post
- **READ** | **GET**: /api/rooms/photos/:listingID | read all of the listings
- **UPDATE** | **PUT**: /api/rooms/photos/:listingID | update a existing listing
- **DELETE** | **DELETE**: /api/rooms/photos/:listingID | delete a existing listing

### CRUD - Save Listing
- **CREATE** | **POST**: /api/users/:userID | Save listing when clicking heart icon
- **READ** | **GET**: /api/users/:userID | Read all of saved listings
- **UPDATE** | **PUT** /api/users/:userID | Update listing to toggle it on/off
- **DELETE** | **DELETE** /api/users/:userID | Delete a saved listing from list of liked listings

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
