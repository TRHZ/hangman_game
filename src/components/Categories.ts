export const wordCategories: Record<string, string[]> = {
    fruits: ['mutfruit', 'tato', 'corn', 'razorgrain', 'gourd'],
    animals: ['radroach', 'bloatfly', 'molerat', 'deathclaw', 'yaoguai'],
    locations: ['diamondcity', 'thecommonwealth', 'vault111', 'glowingsea', 'theinstitute']
};

export const getRandomCategory = (): string => {
    const categories = Object.keys(wordCategories);
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
};

export const getRandomWord = (category: string): string => {
    const words = wordCategories[category];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
};
