import { outfitGraph } from "../utils/graph";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { prompt } = body;

    // Invoke the LangGraph workflow
    const result = await outfitGraph.invoke({
        input: prompt || "party", // Default fallback
        wardrobe: [], // Mock wardrobe is internal for now
        outfit: []
    });

    return {
        success: true,
        outfit: result.outfit
    };
});
