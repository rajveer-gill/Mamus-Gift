// Configuration is loaded from config.js (which should not be committed to git)
// Make sure config.js exists with your OpenAI API key

// API endpoint (using OpenAI's API)
const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

// DOM elements
const generateBtn = document.getElementById('generateBtn');
const loading = document.getElementById('loading');
const storyContainer = document.getElementById('storyContainer');
const storyTitle = document.getElementById('storyTitle');
const storyEra = document.getElementById('storyEra');
const storyText = document.getElementById('storyText');
const errorMessage = document.getElementById('errorMessage');
const shareBtn = document.getElementById('shareBtn');
const newStoryBtn = document.getElementById('newStoryBtn');

// Story topics and eras for variety
const storyEras = [
    'Guru Nanak Dev Ji Era (1469-1539)',
    'Guru Angad Dev Ji Era (1504-1552)',
    'Guru Amar Das Ji Era (1479-1574)',
    'Guru Ram Das Ji Era (1534-1581)',
    'Guru Arjan Dev Ji Era (1563-1606)',
    'Guru Hargobind Ji Era (1595-1644)',
    'Guru Har Rai Ji Era (1630-1661)',
    'Guru Har Krishan Ji Era (1656-1664)',
    'Guru Tegh Bahadur Ji Era (1621-1675)',
    'Guru Gobind Singh Ji Era (1666-1708)',
    'Banda Singh Bahadur Era (1670-1716)',
    'Misl Period (18th Century)',
    'Sikh Empire Period (1799-1849)',
    'British Raj Period (1849-1947)',
    'Post-Independence Era (1947-Present)'
];

const storyTopics = [
    'hidden stories about compassion and helping others',
    'obscure anecdotes about honesty and integrity',
    'little-known figures who demonstrated selfless service',
    'untold stories of personal sacrifice for others',
    'rare teachings about humility and treating all equally',
    'hidden stories about standing up for justice',
    'obscure accounts of forgiveness and understanding',
    'lesser-known stories about charity and community care',
    'forgotten narratives about courage and moral strength',
    'rare interactions showing respect and unity'
];

// Generate a story using AI
async function generateStory() {
    // Check if API key is set
    if (typeof OPENAI_API_KEY === 'undefined' || !OPENAI_API_KEY || OPENAI_API_KEY === 'YOUR_OPENAI_API_KEY_HERE') {
        showError('Please create config.js with your OpenAI API key. Copy config.example.js to config.js and add your key. Get your key from https://platform.openai.com/api-keys');
        return;
    }

    // Show loading, hide other elements
    generateBtn.disabled = true;
    loading.classList.remove('hidden');
    storyContainer.classList.add('hidden');
    errorMessage.classList.add('hidden');

    try {
        // Select random era and topic for variety
        const randomEra = storyEras[Math.floor(Math.random() * storyEras.length)];
        const randomTopic = storyTopics[Math.floor(Math.random() * storyTopics.length)];

        // Create a prompt for the AI
        const prompt = `Write a captivating storytelling narrative about a HIDDEN or LESSER-KNOWN story from Sikh history. Focus on ${randomTopic} during the ${randomEra}. This should be an obscure, rarely-told story that even well-educated Sikhs might not know. 

Write it as an engaging, immersive narrative - like a story being told around a fire, with vivid descriptions, emotional depth, and a compelling storytelling flow. The story should naturally emphasize moral lessons about being a good person: compassion, honesty, humility, service to others, treating everyone equally, standing up for justice, and other core Sikh values. Make the moral teachings emerge naturally through the narrative rather than being preachy.

The story should be historically grounded and highlight lesser-known details, forgotten figures, or overlooked events. Avoid well-known mainstream stories - dig deep into obscure historical accounts, rare anecdotes, or hidden narratives. Make it vivid, memorable, and deeply engaging, suitable for someone who already knows a lot about Sikhism. Keep it between 500-700 words. Write in a flowing narrative style that draws the reader in and keeps them captivated. Include a compelling title for the story.`;

        // Call OpenAI API
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a masterful storyteller and expert historian specializing in obscure and lesser-known aspects of Sikh history and culture. You excel at uncovering hidden stories, forgotten figures, and rare historical accounts that are not commonly known, even to well-educated Sikhs. You write in an immersive, narrative storytelling style that captivates readers - like a skilled storyteller sharing tales around a fire. Your stories naturally weave in moral lessons about being a good person: compassion, honesty, humility, selfless service, equality, justice, and other core Sikh values. You focus on obscure, overlooked, and rarely-told narratives from Sikh history, avoiding well-known mainstream stories. Your narratives are engaging, emotionally resonant, historically accurate, and inspire readers to embody the values demonstrated in the stories.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.9,
                max_tokens: 1500
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to generate story');
        }

        const data = await response.json();
        const generatedText = data.choices[0].message.content;

        // Parse the response to extract title and story
        const lines = generatedText.split('\n').filter(line => line.trim());
        let title = randomEra;
        let story = generatedText;

        // Try to extract title if it's marked
        if (lines[0] && (lines[0].includes('Title:') || lines[0].length < 100)) {
            title = lines[0].replace(/^Title:\s*/i, '').replace(/^#+\s*/, '');
            story = lines.slice(1).join('\n');
        }

        // Display the story
        storyTitle.textContent = title;
        storyEra.textContent = randomEra;
        storyText.textContent = story;

        // Show story container
        loading.classList.add('hidden');
        storyContainer.classList.remove('hidden');
        generateBtn.disabled = false;

    } catch (error) {
        console.error('Error generating story:', error);
        showError(`Error: ${error.message}. Please check your API key and try again.`);
        loading.classList.add('hidden');
        generateBtn.disabled = false;
    }
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Share story functionality
function shareStory() {
    const title = storyTitle.textContent;
    const era = storyEra.textContent;
    const text = storyText.textContent;
    
    const shareText = `${title}\n\n${era}\n\n${text}`;

    if (navigator.share) {
        navigator.share({
            title: title,
            text: shareText
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Story copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Please manually copy the story text.');
        });
    }
}

// Event listeners
generateBtn.addEventListener('click', generateStory);
shareBtn.addEventListener('click', shareStory);
newStoryBtn.addEventListener('click', generateStory);

// Generate a story on page load (optional - remove if you don't want this)
// generateStory();

