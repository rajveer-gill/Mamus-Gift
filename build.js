const fs = require('fs');
const path = require('path');

// Read the API key from environment variable (set in Vercel)
const apiKey = process.env.OPENAI_API_KEY || process.env.VERCEL_ENV_OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY_HERE';

if (!apiKey || apiKey === 'YOUR_OPENAI_API_KEY_HERE') {
    console.warn('WARNING: OPENAI_API_KEY environment variable not set!');
    console.warn('Please set OPENAI_API_KEY in Vercel project settings.');
}

// Read the original index.html
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Replace config.js or deploy-config.js script tag with inline script containing the API key
const apiKeyScript = `<script>
        // API key injected during build from Vercel environment variable
        const OPENAI_API_KEY = '${apiKey}';
    </script>`;

let updatedHtml = indexHtml;

// Replace config.js or deploy-config.js reference if it exists
if (indexHtml.includes('<script src="config.js"></script>')) {
    updatedHtml = indexHtml.replace('<script src="config.js"></script>', apiKeyScript);
} else if (indexHtml.includes('<script src="deploy-config.js"></script>')) {
    updatedHtml = indexHtml.replace('<script src="deploy-config.js"></script>', apiKeyScript);
} else {
    // If there's already an inline script with OPENAI_API_KEY, replace it
    updatedHtml = indexHtml.replace(
        /<script>[\s\S]*?const OPENAI_API_KEY = '[^']*';[\s\S]*?<\/script>/,
        apiKeyScript
    );
}

// Write the updated index.html
fs.writeFileSync(path.join(__dirname, 'index.html'), updatedHtml);

console.log('Build complete! API key injected.');

