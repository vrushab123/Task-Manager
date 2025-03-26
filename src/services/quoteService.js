export const fetchQuote = async () => {
    try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('Error fetching quote:', error);
        return null;
    }
};

export const getRandomMessage = () => {
    const messages = [
        "Keep going! You're doing great!",
        "Small progress is still progress!",
        "You're crushing it!",
        "One step at a time!",
        "You're making it happen!",
        "Stay focused, stay amazing!",
        "Every task completed is a win!",
        "You've got this!",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
};
