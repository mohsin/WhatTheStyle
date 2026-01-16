<template>
  <div class="h-full flex flex-col lg:flex-row w-full overflow-hidden">
    <!-- Main Stage (Center) -->
    <div class="flex-1 flex flex-col relative overflow-hidden">
      <!-- Scrollable Content Wrapper -->
      <div class="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar">
      <header class="mb-10 flex items-end justify-between">
        <div>
          <h1 class="text-4xl font-display font-bold text-white mb-2 tracking-wide">AI Stylist</h1>
          <p class="text-gray-400 text-lg">Curate your perfect look.</p>
        </div>
      </header>

      <!-- Outfit Display Stage -->
      <div class="flex-1 flex flex-col items-center justify-center relative min-h-[600px]">

        <!-- The Dynamic Floating Slab -->
        <!-- The Dynamic 3D Stage -->
        <div
          class="relative w-full max-w-md perspective-[2000px] group -translate-y-[10%]"
        >

             <!-- 3D Glass Floor Slab (with Thickness) -->
             <div
                class="absolute bottom-26 left-1/2 -translate-x-1/2 w-[90%] h-28 rounded-[2rem] transform rotate-x-60 origin-bottom transition-all duration-700 hover:rotate-x-50 hover:scale-100 group"
                style="transform-style: preserve-3d;"
             >
             >
                <!-- Thickness/Volume Layer (Bottom) -->
                <div
                    class="absolute inset-0 rounded-[2rem] bg-electric/20 border border-white/10 blur-[1px] shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
                    style="transform: translateZ(-8px);"
                ></div>

                <!-- Top Glass Face -->
                <div class="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-[inset_0_0_30px_rgba(255,255,255,0.1)]">
                     <!-- Edge Glow (Electric) -->
                     <div class="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/20 shadow-[0_0_20px_rgba(139,92,246,0.4)]"></div>
                </div>
             </div>

             <!-- Mannequin / Items Container -->
             <!-- Positioned to stand on the floor (visually) -->
             <div class="relative z-10 w-full flex flex-col items-center justify-end pb-12 min-h-[500px] transition-all duration-500">

                <!-- Generated Result (Image Mode) -->
                <!-- Layered Stack: Jacket Front, Jeans Back (Corrected) -->
                <!-- Composed Items Mode (Default) -->
                <!-- Layered Stack: Jacket Front, Jeans Back (Corrected) -->
                <div class="relative w-full h-[500px]">
                     <!-- Jeans (Back Layer - Behind Jacket) -->
                     <div class="absolute top-20 left-[40%] -translate-x-[15%] w-[72%] z-10 rotate-[10deg] transition-transform duration-500 hover:rotate-[12deg] hover:scale-105 group">
                        <img :src="currentOutfit.bottom.image" class="w-full h-full object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.5)]" :alt="currentOutfit.bottom.name" />
                     </div>

                     <!-- Jacket (Front Layer - Main Focus) -->
                     <div class="absolute top-8 left-[40%] -translate-x-[60%] w-[65%] z-30 rotate-[-10deg] transition-transform duration-500 hover:rotate-[-12deg] hover:scale-105 group">
                        <img :src="currentOutfit.top.image" class="w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)]" :alt="currentOutfit.top.name" />
                    </div>

                    <!-- Shoes (Anchor Layer - Sitting on Raised Slab) -->
                    <div class="absolute bottom-10 left-[40%] -translate-x-1/2 w-[40%] z-40 rotate-[-5deg] transition-transform duration-500 hover:rotate-0 hover:scale-105 group">
                        <img :src="currentOutfit.shoes.image" class="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]" :alt="currentOutfit.shoes.name" />
                    </div>
                </div>

             </div>
        </div>
      </div>

      </div>

      <!-- Prompt Input (Floating Bottom) -->
      <div class="absolute bottom-20 left-0 right-0 z-50 px-8 flex justify-center pointer-events-none">
        <div class="relative max-w-[38rem] w-full group/input pointer-events-auto">
            <div class="absolute -inset-1 bg-gradient-to-r from-electric via-purple-500 to-cyber rounded-3xl blur opacity-30 group-hover/input:opacity-60 transition-opacity duration-500"></div>
            <div class="relative bg-midnight/80 backdrop-blur-xl border border-white/10 rounded-3xl p-2 flex items-center gap-4 shadow-2xl">

              <!-- Upload Button with Tooltip -->
              <div class="relative group/upload">
                 <input type="file" ref="fileInput" class="hidden" @change="handleUpload" accept="image/*" />
                 <button @click="triggerUpload" :disabled="isUploading" class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/30 transition-all disabled:opacity-50 disabled:cursor-wait">
                    <Upload v-if="!isUploading" class="w-6 h-6 text-gray-400 group-hover/upload:text-white transition-colors" />
                    <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 </button>
                 <!-- Tooltip -->
                 <div class="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 bg-black/90 backdrop-blur-md border border-white/10 p-3 rounded-xl text-xs text-gray-300 text-center shadow-xl opacity-0 scale-95 group-hover/upload:opacity-100 group-hover/upload:scale-100 transition-all pointer-events-none z-50">
                    Drop your photo to get a render of yourself with the selection
                    <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-b border-r border-white/10"></div>
                 </div>
              </div>

              <input
                v-model="userInput"
                @keyup.enter="generateOutfit"
                type="text"
                placeholder="for a DJ party"
                class="flex-1 bg-transparent border-none focus:ring-0 text-white text-lg placeholder-gray-500 px-4 py-4 font-medium tracking-wide outline-none min-w-0"
              />
              <button
                @click="generateOutfit"
                :disabled="!userInput || isGenerating"
                class="bg-gradient-to-r from-electric to-cyber text-white font-bold py-4 px-10 rounded-2xl shadow-lg hover:shadow-electric/40 hover:scale-105 active:scale-95 transition-all duration-300 flex-shrink-0 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles v-if="!isGenerating" class="w-5 h-5" />
                <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>{{ isGenerating ? 'Ruling...' : 'Pick' }}</span>
              </button>
            </div>
        </div>
      </div>
    </div>

    <!-- Right Sidebar: Wardrobe (Visible Panel) -->
    <div class="hidden xl:flex w-80 flex-shrink-0 border-l border-white/5 bg-white/[0.02] flex-col relative z-20 backdrop-blur-sm">
        <div class="p-6 border-b border-white/5 flex items-center justify-between">
           <h3 class="text-lg font-bold text-white font-display tracking-wide">Wardrobe Picks</h3>
           <div class="bg-electric/20 rounded-full w-2 h-2 animate-pulse"></div>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
           <div v-for="(items, category) in wardrobeCategories" :key="category">
              <h4 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">{{ category }}</h4>
              <div class="grid grid-cols-2 gap-3">
                 <div
                    v-for="item in items"
                    :key="item.id"
                    class="aspect-[3/4] rounded-xl bg-surface border overflow-hidden relative group cursor-pointer transition-all duration-300"
                    :class="[
                        item.selected
                            ? 'border-electric shadow-[0_0_20px_rgba(139,92,246,0.3)] ring-1 ring-electric/50 scale-[1.02]'
                            : 'border-white/5 opacity-60 hover:opacity-100 hover:border-white/20'
                    ]"
                 >
                    <!-- Item Image -->
                    <img :src="item.image" class="w-full h-full object-cover" :alt="item.name" />

                    <!-- Selected Indicator -->
                    <div v-if="item.selected" class="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-electric shadow-[0_0_10px_#8b5cf6]"></div>
                 </div>
              </div>
           </div>
        </div>

        <div class="p-6 border-t border-white/5 bg-white/[0.02]">
            <button class="w-full py-4 rounded-xl border border-dashed border-white/20 text-gray-400 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all font-medium flex items-center justify-center gap-2">
               <Plus class="w-4 h-4" />
               <span>Add Item</span>
            </button>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sparkles, Shirt, Plus, Upload } from 'lucide-vue-next';

// State
const userInput = ref('');
const isGenerating = ref(false);
const isUploading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const currentOutfit = reactive({
    top: { name: 'Cyber Jacket', image: '/jacket.png' },
    bottom: { name: 'Cyber Jeans', image: '/jeans.png' },
    shoes: { name: 'Cyber Shoes', image: '/shoes.png' }
});

// Actions
interface GenerateResponse {
    success: boolean;
    outfit: Array<{ name: string; image: string; category: string; }>;
}

const triggerUpload = () => {
    fileInput.value?.click();
};

const handleUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const file = target.files[0];
        if (file) await uploadImage(file);
    }
};

const uploadImage = async (file: File) => {
    isUploading.value = true;
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await $fetch<{ success: boolean; url: string }>('/api/upload', {
            method: 'POST',
            body: formData
        });

        if (response.success) {
            // Logic to handle successful upload (e.g., set as current "user" image or classify)
            console.log('Uploaded image:', response.url);
            // Ideally call classification service here
        }
    } catch (error) {
        console.error('Upload failed', error);
    } finally {
        isUploading.value = false;
        // Reset input
        if (fileInput.value) fileInput.value.value = '';
    }
};

const generateOutfit = async () => {
    if (!userInput.value) return;

    isGenerating.value = true;
    try {
        const response = await $fetch<GenerateResponse>('/api/generate', {
            method: 'POST',
            body: { prompt: userInput.value }
        });
        const { outfit } = response;

        if (outfit && outfit.length >= 3) {
            // Check for categories to assign correctly, or assume order [Top, Bottom, Shoes] from graph
            // The graph ensures: [Top, Bottom, Shoes]
            currentOutfit.top = outfit[0]!;
            currentOutfit.bottom = outfit[1]!;
            currentOutfit.shoes = outfit[2]!;

            // Update wardrobe selection (simple toggle for visual consistency)
             wardrobeCategories.Tops.forEach(i => i.selected = (i.name === currentOutfit.top.name));
            wardrobeCategories.Bottoms.forEach(i => i.selected = (i.name === currentOutfit.bottom.name));
            wardrobeCategories.Shoes.forEach(i => i.selected = (i.name === currentOutfit.shoes.name));
        }

    } catch (error) {
        console.error("Generation failed", error);
    } finally {
        isGenerating.value = false;
    }
};

// Wardrobe Data (Mocked with Active Items)
const wardrobeCategories = {
    Tops: [
        { id: 1, name: 'Cyber Jacket', image: '/jacket.png', selected: true },
        { id: 2, name: 'Mesh Top', image: 'https://placehold.co/300x400/1a1a1a/333/png?text=Mesh+Top', selected: false }
    ],
    Bottoms: [
        { id: 3, name: 'Cyber Jeans', image: '/jeans.png', selected: true },
        { id: 4, name: 'Tech Cargos', image: 'https://placehold.co/300x400/1a1a1a/333/png?text=Cargos', selected: false }
    ],
    Shoes: [
        { id: 5, name: 'Cyber Shoes', image: '/shoes.png', selected: true },
        { id: 6, name: 'Neon Runners', image: 'https://placehold.co/300x400/1a1a1a/333/png?text=Runners', selected: false }
    ]
};
</script>
