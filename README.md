# My Chat App

A real-time chat application built with React, Firebase, and Electron.

## Features

- 🔥 Real-time messaging using Firestore
- 🔒 Google authentication with Firebase Auth
- 🖼️ User profile pictures in chat
- 🚀 Desktop support via Electron
- 🎨 Responsive and modern UI

## Getting Started

### 1. Clone the repository

```bash
https://github.com/ritthickkt/chat-app.git
cd my-chat-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Firebase

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
- Enable **Firestore** and **Authentication (Google Sign-In)**.
- Replace the config in `src/firebase.js` with your own Firebase project credentials.

### 4. Run the app in development

#### For web (browser):

```bash
npm run dev
```

#### For Electron (desktop):

In one terminal, start the Vite dev server:

```bash
npm run dev
```

In another terminal, start Electron:

```bash
npm run electron
```

> **Note:** Make sure your Firebase Firestore rules allow read/write for development.

### 5. Build for production

```bash
npm run build
```

## Project Structure

```
src/
  App.jsx         # Main React component
  firebase.js     # Firebase config and initialization
  assets/         # Images and icons
  App.css         # Styles
electron/
  main.ts         # Electron main process
public/
  index.html      # HTML entry point
```

## Customization

- **App Icon:**  
  Replace `src/assets/app.png` (or add `app.icns` for Mac) and update the path in `electron/main.ts`.

- **Fonts:**  
  Uses Google Fonts (Montserrat, Playwrite HU).  
  If fonts do not load in Electron, consider bundling them locally.

