# DZtryFitting - Virtual Try-On Platform

DZtryFitting is a cutting-edge, web-based virtual clothing try-on platform that allows users to visualize garments (T-shirts, Dresses, Traditional Algerian wear) on their own photos using the power of Gemini AI.

## ✨ Features

- **Virtual Try-On**: Transform your photos by instantly "wearing" clothes from the collection or your own uploads.
- **Algerian Heritage Focus**: Specialized AI prompts to accurately render traditional garments like the **Karakou**, **Kabyle Dress**, and the **Naili Dress** (with its iconic winged frills).
- **Style Studio**: A powerful interface to choose models, upload photos, and mix-and-match tops and bottoms.
- **Interactive Comparison**: A slider-based comparison tool to see "Before vs. After" results.
- **Multilingual Support**: Fully localized in English and Arabic (RTL support).
- **Partner Network**: A directory of top Algerian fashion boutiques.

## 🚀 Tech Stack

- **React 19** (via esm.sh)
- **Tailwind CSS** (for styling)
- **Google Gemini API** (for AI image generation)
- **FontAwesome** (for iconography)

## 🛠️ Setup & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/dztryfitting.git
   cd dztryfitting
   ```

2. **API Key**:
   The app requires a Google Gemini API Key. Ensure you have one from the [Google AI Studio](https://aistudio.google.com/).

3. **Environment Variable**:
   For local development, you might need a local server. Since this project uses native browser modules (ESM) and an `importmap`, you can serve it using any static server:
   ```bash
   npx serve .
   ```
   *Note: In production, the `API_KEY` must be set in your deployment platform's environment variables.*

## 🌐 Deployment to Vercel

This app is optimized for deployment via GitHub to **Vercel**:

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and "Import" the repository.
3. In the **Environment Variables** section of the deployment settings, add:
   - **Key**: `API_KEY`
   - **Value**: `your_gemini_api_key_here`
4. Click **Deploy**.

## 📸 Camera Permissions

The app requests camera permissions to allow users to take a photo of themselves for the fitting. These are defined in `metadata.json`.

## 📜 License

MIT License - feel free to use and modify for your own projects.
