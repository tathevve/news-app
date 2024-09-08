# News App

This is a **news app** available for both **iOS** and **Android** platforms. It provides an infinite scrolling loop of news articles, allowing users to stay up to date with the latest news from around the world.

## Task Overview

This app was developed as a test task to create a news reader mobile application using React Native. The task involved building a news app that allows users to browse, search, and save articles for offline use.

### Task Details

1. **Display News Articles**: The app displays a list of news articles fetched from The Guardian, with each item showing a thumbnail image, title, and publication date.
2. **Search Functionality**: Users can search for articles using a search bar that filters articles by keywords.
3. **Infinite Scrolling**: The homepage shows an infinite scrolling list of articles, with an option to switch between a list view and a Pinterest-like grid view.
4. **Detailed Article View**: Each article has a detailed view showing the title, body text, publication date, and any relevant images.
5. **Offline Mode**: Users can save articles for offline use. These articles can be viewed without an internet connection. The app shows a message when offline.
6. **Error Handling**: The app handles network errors gracefully, displaying appropriate error messages when something goes wrong.

### API Integration

The app integrates with two APIs:
- **The Guardian API**: To fetch the latest news articles. Documentation: [The Guardian API Documentation](https://open-platform.theguardian.com/documentation/search)

### Environment Variables

The app uses a `.env` file to store sensitive information, such as API keys.

- **API_KEY**: Your API key used to fetch news from The Guardian.

Ensure you have the `.env` file in the project root, and that it contains the following line:

```
API_KEY=your_api_key_here
```

### Code Quality and Formatting

This project includes ESLint for linting and Prettier for code formatting to ensure consistent code quality.

### Available Scripts

In the project directory, you can run the following scripts:

- **Lint the code**:
  - `npm run lint` or `yarn lint`
  - This will check for any linting errors in your code.
  
- **Automatically fix linting issues**:
  - `npm run lint:fix` or `yarn lint:fix`
  - This will attempt to fix any linting errors automatically.
  
- **Format the code**:
  - `npm run format` or `yarn format`
  - This will format the codebase using Prettier.
  
- **Check if code is formatted correctly**:
  - `npm run format:check` or `yarn format:check`
  - This will check if the files are correctly formatted.

## Screens Overview

- **Discover Screen**: Showcases an infinite scroll of the latest news articles, available in both list and grid views. Users can switch between views and continue browsing as new articles load automatically.
- **Detail Screen**: Provides an in-depth view of the selected news article, including the title, body text, publication date, and images.
- **Offline Mode**: Lets users access and read articles that have been saved for offline use, even when the app is not connected to the internet.

### Key Features:

- **Infinite Scrolling**: Effortlessly load more articles as you scroll down the Discover Screen.
- **Save Functionality**: Bookmark articles to read later, ensuring that you never miss out on important news.
- **Offline Mode**: Access your saved articles anytime, regardless of your internet connection status.
