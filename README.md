# Movies TMDB Website

A movie exploration platform built with **Next.js 14**, **TMDb API**, and **Firebase**. This website allows users to search for movies, explore detailed information about them, add items to their favorites, and switch between English and Arabic. It also features dynamic light/dark mode support for an enhanced user experience.

## Live Demo

Check out the live version of the project:  
**[Movies TMDB Website]([https://movies-website-ke95.vercel.app/en](https://movies-website-ke95-git-style-yasser-al-ariqis-projects.vercel.app/en))**

## Features

### 🔍 **Search Functionality**
- Users can search for **movies** using the TMDb API.
- Search results are dynamically fetched and displayed based on user queries.
- Only relevant results are displayed.

### ⭐ **Add to Favorites**
- Users can **log in** using **Firebase Authentication**.
- Once logged in, users can **add** and **remove** movies, TV shows, and actors from their **Favorites**.
- Favorites are stored in **Firebase Firestore** and accessible across sessions.
- Favorites can be viewed on a dedicated **Favorites page**, organized by movies, TV shows, and actors.

### 🌐 **Multi-language Support (EN/AR)**
- Full support for **English** and **Arabic** with RTL (right-to-left) adjustments for Arabic.
- Language switcher implemented in the navbar, allowing users to toggle between **English** and **Arabic** without duplicating pages.
- Translations are managed using the `next-intl` library and JSON files (`en.json` and `ar.json`).

### 🌓 **Dark/Light Mode**
- Users can switch between **dark** and **light** modes for a personalized browsing experience.
- The mode is persisted across sessions and changes the entire website's theme, including the navbar, footer, and all media elements.

### 🎞️ **Dynamic Pages**
- The website features dynamic pages for **movies**, **TV shows**, and **actors**.
- Users can click on any movie, TV show, or actor from search results or trending sections to view detailed information, such as release date, genre, rating, and more.
- Dynamic routes are used to generate pages for individual movies (`/movies/:id`), TV shows (`/tv/:id`), and actors (`/actors/:id`).

### 🎯 **Advanced Filtering**
- Users can filter movies based on multiple criteria such as **release year**, **popularity**, **vote average**, and more.
- Results can be sorted and filtered dynamically to enhance the discovery experience.

## Technology Stack

- **Frontend**: Next.js 14 (App Router), React.js, Tailwind CSS
- **API**: TMDb API for movie, TV show, and actor data
- **Backend**: Firebase (Firestore for favorites and Firebase Auth for authentication)
- **Styling**: Tailwind CSS with custom themes for light and dark mode
- **Hosting**: Vercel
