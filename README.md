# Roy Persona Chat 🤖

An AI-powered chat application where you can define the persona of the chatbot. Engage in dynamic conversations with an AI tailored to the personality you create, from a witty pirate to a helpful librarian. This project is built using React, TypeScript, Vite, and the Google Gemini API.

## Features

- **Custom AI Persona**: Define any personality for the AI you want to chat with.
- **Real-time Streaming**: Responses from the AI are streamed in real-time for a dynamic conversation experience.
- **Responsive Design**: The user interface is fully responsive and works on both desktop and mobile devices.
- **Sample Personas**: Get started quickly with a selection of pre-defined sample personas.
- **Clean & Modern UI**: A sleek, dark-themed interface built with Tailwind CSS.

## Tech Stack

- **Frontend**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Model**: [Google Gemini API](https://ai.google.dev/docs/gemini_api_overview) (`@google/genai`)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- `npm` or `yarn` package manager

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/roy-persona-chat.git
    cd roy-persona-chat
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up your API Key:**
    This application requires a Google Gemini API key. Create a file named `.env.local` in the root of your project and add your API key to it:

    ```
    VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```

    The application is configured to use this variable automatically.

4.  **Run the application:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open your browser to the local development server URL provided (usually `http://localhost:5173`).

## Project Structure

```
/
├── public/
├── src/
│   ├── components/     # React components
│   │   └── icons/      # SVG icon components
│   ├── App.tsx         # Main application component
│   ├── index.css       # Main CSS file for Tailwind
│   ├── index.tsx       # Application entry point
│   └── types.ts        # TypeScript type definitions
├── .env.local          # For local API Key (do not commit)
├── index.html          # Main HTML file
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Deployment

This application is ready to be deployed to [Vercel](https://vercel.com/).

### Deploying to Vercel

1.  **Push your project to a Git repository** (e.g., on GitHub, GitLab, or Bitbucket).

2.  **Go to Vercel**: Log in to your Vercel account or create a new one.

3.  **Import Project**: From your Vercel dashboard, click on "Add New..." and select "Project".

4.  **Import Git Repository**: Connect Vercel to your Git provider and select the repository for this project.

5.  **Configure Project**: Vercel will detect this is a Vite project. The default settings should work correctly.
    -   **Framework Preset**: `Vite`
    -   **Build Command**: `npm run build`
    -   **Output Directory**: `dist`

6.  **Add Environment Variable**: This is a crucial step.
    -   Navigate to the "Environment Variables" section in your project settings.
    -   Add a new variable. Set the **Name** to `VITE_API_KEY`.
    -   Paste your Google Gemini API key into the **Value** field.
    -   **Important**: Vercel encrypts this variable, keeping your API key secure.

7.  **Deploy**: Click the "Deploy" button. Vercel will build and deploy your application. Once finished, you'll be provided with a live URL to your chat app.

## Developer

- **Name**: Abhinaba Roy Pradhan
- **Email**: abhinabapradhan@gmail.com
