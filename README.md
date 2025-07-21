# Estable Exercise Step 4

A React Native application built with Expo and Expo Router, featuring transaction management functionality with modern UI components and state management.

## Quick Start

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 18 or later) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Expo CLI** (optional but recommended) - Install globally with `npm install -g @expo/cli`

### 1. Clone the Repository

```bash
git clone https://github.com/kpCoder2801/estable-react-native-exercise-step-4.git
cd estable-react-native-exercise-step-4
```

### 2. Install Dependencies

Choose your preferred package manager:

#### Using npm:
```bash
npm install
```

#### Using yarn:
```bash
yarn install
```

### 3. Run the Project

#### Start the development server:
```bash
npm start
```
*or*
```bash
yarn start
```

#### Platform-specific commands:

**For iOS Simulator:**
```bash
npm run ios
```

**For Android Emulator:**
```bash
npm run android
```

## Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Start the app on iOS simulator
- `npm run android` - Start the app on Android emulator
- `npm run web` - Start the app in web browser
- `npm run lint` - Run ESLint to check code quality
- `npm run reset-project` - Reset the project to initial state

### Tech Stack

- **Framework:** React Native with Expo (~53.0.20)
- **Navigation:** Expo Router (~5.1.4)
- **UI Library:** Gluestack UI with NativeWind
- **State Management:** Zustand (~5.0.6)
- **Data Fetching:** TanStack React Query (~5.83.0)
- **Styling:** Tailwind CSS with NativeWind (~4.1.23)
- **Icons:** Lucide React Native (~0.525.0)

## Project Structure

```
├── app/                    # App screens and navigation (Expo Router)
├── components/             # Reusable UI components
├── api/                    # API utilities and hooks
├── constants/              # App constants and configurations
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
└── assets/                 # Static assets (fonts, images)
```
