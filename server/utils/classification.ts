export interface ImageAttributes {
    category: 'Tops' | 'Bottoms' | 'Shoes';
    color: string;
    style: string;
    weather: string;
}

export const classifyImage = async (imagePath: string): Promise<ImageAttributes> => {
    // Mock Logic for MVP
    // In a real scenario, this would call a Vision API (OpenAI/Google)

    // Deterministic mock based on filename keywords
    const lowerPath = imagePath.toLowerCase();

    if (lowerPath.includes('jacket') || lowerPath.includes('top') || lowerPath.includes('shirt')) {
        return {
            category: 'Tops',
            color: 'Black',
            style: 'Cyberpunk',
            weather: 'Cool'
        };
    }

    if (lowerPath.includes('jeans') || lowerPath.includes('pants') || lowerPath.includes('trousers')) {
        return {
            category: 'Bottoms',
            color: 'Blue',
            style: 'Streetwear',
            weather: 'All-season'
        };
    }

    if (lowerPath.includes('shoe') || lowerPath.includes('sneaker') || lowerPath.includes('boot')) {
        return {
            category: 'Shoes',
            color: 'Neon',
            style: 'Futuristic',
            weather: 'Dry'
        };
    }

    // Default fallback
    return {
        category: 'Tops',
        color: 'Unknown',
        style: 'Casual',
        weather: 'Mild'
    };
};
