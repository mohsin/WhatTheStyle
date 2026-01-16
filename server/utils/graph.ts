import { StateGraph } from "@langchain/langgraph";
import { RunnableLambda } from "@langchain/core/runnables";

// --- Types ---
export interface Item {
    id: number;
    name: string;
    image: string;
    category: string;
    tags: string[];
}

export interface AgentState {
    input: string;
    wardrobe: Item[];
    outfit: Item[];
}

// --- Mock Data ---
const MOCK_WARDROBE: Item[] = [
    { id: 1, name: 'Cyber Jacket', image: '/jacket.png', category: 'Tops', tags: ['dark', 'cyber', 'cool', 'party', 'night'] },
    { id: 2, name: 'Mesh Top', image: 'https://placehold.co/300x400/1a1a1a/333/png?text=Mesh+Top', category: 'Tops', tags: ['edgy', 'party'] },
    { id: 3, name: 'Cyber Jeans', image: '/jeans.png', category: 'Bottoms', tags: ['dark', 'streetwear', 'casual'] },
    { id: 4, name: 'Tech Cargos', image: 'https://placehold.co/300x400/1a1a1a/333/png?text=Cargos', category: 'Bottoms', tags: ['utilitarian', 'techwear'] },
    { id: 5, name: 'Cyber Shoes', image: '/shoes.png', category: 'Shoes', tags: ['neon', 'futuristic'] },
    { id: 6, name: 'Neon Runners', image: 'https://placehold.co/300x400/1a1a1a/333/png?text=Runners', category: 'Shoes', tags: ['sporty', 'bright'] }
];

// --- Nodes ---

// 1. Retrieve Node: Selects items based on simple keyword matching
const retrieveItems = (state: AgentState): Partial<AgentState> => {
    const prompt = state.input.toLowerCase();
    const allItems = MOCK_WARDROBE; // In real app, fetch from DB

    // Simple keyword logic for MVP
    let selectedTop = allItems.find(i => i.category === 'Tops');
    let selectedBottom = allItems.find(i => i.category === 'Bottoms');
    let selectedShoes = allItems.find(i => i.category === 'Shoes');

    if (prompt.includes('party')) {
        selectedTop = allItems.find(i => i.name === 'Cyber Jacket') || selectedTop;
    } else if (prompt.includes('casual')) {
        selectedTop = allItems.find(i => i.name === 'Mesh Top') || selectedTop;
    }

    // Ensure we have a valid selection (fallback to first of each category)
    const outfit = [
        selectedTop || allItems.find(i => i.category === 'Tops')!,
        selectedBottom || allItems.find(i => i.category === 'Bottoms')!,
        selectedShoes || allItems.find(i => i.category === 'Shoes')!
    ];

    return { outfit };
};

// --- Graph Construction ---

const workflow = new StateGraph<AgentState>({
    channels: {
        input: { value: (left, right) => right ?? left },
        wardrobe: { value: (left, right) => right ?? left },
        outfit: { value: (left, right) => right ?? left }
    }
})
    .addNode("retrieve", new RunnableLambda({ func: retrieveItems }))
    .addEdge("__start__", "retrieve")
    .addEdge("retrieve", "__end__");

export const outfitGraph = workflow.compile();
