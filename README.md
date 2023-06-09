# Popcorn. 🍿
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

A movie database website allowing users to keep track of movies they want to watch and movies they have watched. The website will keep users informed about the latest and most popular movies. To make this application stand out, I am introducing a gamification feature that will enable users to earn points and unlock achievements based on the number of movies they have watched.

## Demo
This video is a demo of the current state of the project.

https://github.com/KunalP99/movie-project/assets/65904106/c187abf0-6a8d-4111-a7d8-267252291145

## Features
- Watchlist - Users can add movies to a watchlist
- Search - Users can search for a movie by typing into the input box
- History - Users can add movies to their history list and edit/delete from the list
- Points - Users can earn points based on the movies in their History list
- Authentication - Users can log in to the application through their Gmail account using Google ([OAuth 2.0](https://developers.google.com/identity/protocols/oauth2))
- Users are shown the trending & latest movies, top stars, and the 5 most recent movies added to their watchlist on the homepage

## APIs
- I am using the The Movie Database API ([TMDB](https://www.themoviedb.org/)) to access all movie information on the website
- For authentication, I am using [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2) 
- [React-Toastify](https://www.npmjs.com/package/react-toastify) - Handles notification popups
