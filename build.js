const fs = require('fs');
const path = require('path');

// Read the API key from environment variable (set in Vercel)
const apiKey = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE';

// Read the original index.html
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Replace the config.js script tag to inject the API key inline
const updatedHtml = indexHtml.replace(
    '<script src="config.js"></script>',
    `<script>
        // API key injected during build from Vercel environment variable
        const OPENAI_API_KEY = '${apiKey}';
    </script>`
);

// Write the updated index.html
fs.writeFileSync(path.join(__dirname, 'index.html'), updatedHtml);

console.log('Build complete! API key injected.');

