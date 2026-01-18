# AI Draw & Guess

This is an online "Draw and Guess" game where you draw on a canvas and the Google Gemini AI guesses what it is.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (Direct API calls, no SDK)

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure API Key**
   - Open `.env.local`
   - Replace `YOUR_GEMINI_API_KEY_HERE` with your actual Google Gemini API Key.
   - You can get a key from [Google AI Studio](https://aistudio.google.com/).

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Play**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.
   - Draw something on the canvas.
   - Click "Guess!" to see if the AI can identify your drawing.

## Project Structure
- `src/components/DrawingCanvas.tsx`: The canvas component handling drawing logic.
- `src/app/api/guess/route.ts`: The API route that proxies the request to Gemini.
- `src/app/page.tsx`: The main game page.
