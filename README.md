# Sikh History Stories - AI Story Generator

A beautiful web application that generates fascinating, hidden stories from Sikh history using AI. Each story is a captivating narrative that promotes moral values like compassion, honesty, service, and justice.

## Features

- 🎭 Engaging storytelling narratives
- 📚 Hidden and lesser-known stories from Sikh history
- ✨ AI-powered story generation
- 🎨 Beautiful, modern UI with Sikh-inspired colors
- 📱 Fully responsive design
- 🔄 Random story generation with variety

## Setup for Local Development

1. Clone this repository
2. Copy `config.example.js` to `config.js`
3. Add your OpenAI API key to `config.js`
4. Open `index.html` in your browser

## Deployment

### Option 1: Netlify (Recommended - Easiest)

1. Go to [Netlify](https://www.netlify.com/) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. In Site settings → Environment variables, add:
   - Key: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
5. In the build settings, set:
   - Build command: `echo "No build needed"`
   - Publish directory: `.`
6. Update `index.html` to use `deploy-config.js` and modify `deploy-config.js` to read from `process.env.OPENAI_API_KEY` (or use Netlify's inject script)

Actually, for Netlify, you can:
- Drag and drop the folder to Netlify Drop
- Or use Netlify CLI: `netlify deploy --prod`

### Option 2: Vercel

1. Go to [Vercel](https://vercel.com/) and sign up/login
2. Import your GitHub repository
3. Add environment variable `OPENAI_API_KEY` in project settings
4. Deploy

### Option 3: GitHub Pages (Manual)

Since GitHub blocks API keys, you'll need to:
1. Manually add `deploy-config.js` with your API key after cloning
2. Enable GitHub Pages in repository settings
3. Select the `main` branch and `/` (root) folder

## Note on API Keys

This is a client-side application, so the API key will be visible in the browser. For production use, consider:
- Setting usage limits on your OpenAI account
- Using a backend proxy to keep the key server-side
- Implementing rate limiting

## License

This is a personal gift project.

