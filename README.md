# Currency Converter

A React Native currency conversion app. 

## Requirements

- Node.js 20 or newer
- npm
- A CurrencyBeacon API key
- Expo Go for a physical device, or:
  - Xcode and an iOS Simulator for iOS
  - Android Studio and an Android Emulator for Android

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root based on `.env.example`:

   ```env
   EXPO_PUBLIC_CURRENCY_BEACON_API_KEY=your_currencybeacon_api_key
   ```

3. Start the Expo development server:

   ```bash
   npx expo start
   ```

   If the environment variable was changed while Expo was running, restart with a cleared cache:

   ```bash
   npx expo start -c
   ```

### Platform commands

```bash
npm run ios
npm run android
```

## Tests

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Functionality

- Fetches available currencies from the CurrencyBeacon `/currencies` endpoint.
- Displays source and target currency selectors.
- Allows the user to enter an amount for the source currency.
- Fetches the converted value from the `/convert` endpoint.
- Displays the converted amount and the exact API result.
- Shows loading, error and retry states.

## Additional functionality

- Currency list search by currency code and name.
- Swap button for exchanging source and target currencies.
- Local currency caching with AsyncStorage for 24 hours.
- Debounced conversion requests with a 500 ms delay.
- Request cancellation when inputs change or a component unmounts.
- Zod validation and transformation of the currency API response. 
- Amount validation with normalization.
- Safe-area-aware layout for mobile devices.

## Technology and libraries

- Expo SDK 57
- React Native 0.86
- React 19
- TypeScript
- Axios for HTTP requests
- Zod for API response validation
- AsyncStorage for local caching
- `react-native-safe-area-context` for safe-area support
- `@react-native-vector-icons/material-icons` for the icons
- Jest and React Native Testing Library for test

## API configuration

The API base URL is defined in `src/api/currencyApi/consts.ts`. The API key is read from `EXPO_PUBLIC_CURRENCY_BEACON_API_KEY`.

`.env.local` is excluded from Git and must not be committed. Expo public environment variables are bundled into the client application, so they should not be treated as server-side secrets.

## Project structure

```text
src/
  api/          API client and CurrencyBeacon integration
  components/   Reusable UI components
  hooks/        Currency loading and conversion logic
  screens/      Application screens
  storage/      AsyncStorage persistence
```

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
