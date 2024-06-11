# Personal Tech Blog

Welcome to my personal tech blog! This project is built with React + Vite and uses several APIs to handle blog posts, reviews, and newsletter subscriptions.

## Installation

To get started with this project, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/502ermira/blog-frontend.git
    cd techblog
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the required environment variables (see below).

4. Start the development server:

    ```sh
    npm run dev
    ```

## Usage

Open your browser and navigate to `http://localhost:5173` to see the application in action.

## Environment Variables

To run this project, you need to set up the following environment variables in your `.env` file:

```env
VITE_API_BLOG_DETAIL_URL=https://your-backend-url.com/api/blogs
VITE_API_REVIEWS_URL=https://your-backend-url.com/api/reviews
VITE_API_NEWSLETTER_URL=https://your-backend-url.com/api/subscribe
VITE_GOOGLE_CLIENT_ID=your-google-client-id

Replace the placeholders with your actual URLs and Google client ID.

### Additional Notes

- Make sure to replace the placeholders in the `.env` file with your actual URLs and client ID.
- Restart the development server after creating or updating the `.env` file to apply the changes.

By following these instructions, you should be able to set up and run your personal tech blog locally. If you encounter any issues, please refer to the documentation or raise an issue in the repository.
