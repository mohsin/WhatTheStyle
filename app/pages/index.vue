<template>
  <div class="h-full flex flex-col p-8 lg:p-12 relative overflow-y-auto custom-scrollbar">
    <header class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 class="text-4xl font-display font-bold text-white mb-2 tracking-wide">Wardrobe</h1>
        <p class="text-gray-400 text-lg">Your digital collection.</p>
      </div>

      <!-- Search & Utils -->
      <div class="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5 w-full md:w-auto">
        <div class="flex-1 flex items-center px-4 gap-2">
            <Search class="w-5 h-5 text-gray-400" />
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Search items..."
                class="bg-transparent border-none outline-none text-white placeholder-gray-500 w-full min-w-[200px]"
            />
        </div>
      </div>
    </header>

    <!-- Category Filters -->
    <div class="flex flex-wrap items-center gap-3 mb-10">
        <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            class="px-5 py-2 rounded-xl text-sm font-medium transition-all"
            :class="[
                activeCategory === cat
                 ? 'bg-electric text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                 : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
            ]"
        >
            {{ cat }}
        </button>
    </div>

    <!-- Stats / Info -->
    <div v-if="filteredItems.length === 0" class="flex-1 flex flex-col items-center justify-center text-gray-500 py-20">
        <p>No items found matching your criteria.</p>
    </div>

    <!-- Grid -->
    <WardrobeGrid :items="filteredItems" @add="triggerUpload" />

    <!-- Hidden Upload Input -->
    <input type="file" ref="fileInput" class="hidden" @change="handleUpload" accept="image/*" />

    <!-- Uploading Overlay -->
    <div v-if="isUploading" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div class="bg-midnight border border-white/10 p-8 rounded-3xl flex flex-col items-center shadow-2xl">
            <div class="w-12 h-12 border-4 border-electric border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-white font-medium">Uploading to wardrobe...</p>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next';

// --- Data & State ---
const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories'];
const activeCategory = ref('All');
const searchQuery = ref('');
const isUploading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

// Extended Mock Data to show off Masonry
const wardrobeItems = ref([
  { id: 1, name: 'Cyber Jacket', category: 'Outerwear', imageUrl: '/jacket.png' },
  { id: 2, name: 'Mesh Top', category: 'Tops', imageUrl: 'https://placehold.co/300x400/1a1a1a/333/png?text=Mesh+Top' },
  { id: 3, name: 'Cyber Jeans', category: 'Bottoms', imageUrl: '/jeans.png' },
  { id: 4, name: 'Tech Boots', category: 'Shoes', imageUrl: 'https://placehold.co/300x350/1a1a1a/333/png?text=Boots' },
  { id: 5, name: 'Neon Hoodie', category: 'Tops', imageUrl: 'https://placehold.co/300x500/1a1a1a/333/png?text=Hoodie' },
  { id: 6, name: 'Cargo Pants', category: 'Bottoms', imageUrl: 'https://placehold.co/300x450/1a1a1a/333/png?text=Cargos' },
  { id: 7, name: 'Cyber Shoes', category: 'Shoes', imageUrl: '/shoes.png' },
  { id: 8, name: 'Silver Chain', category: 'Accessories', imageUrl: 'https://placehold.co/300x300/1a1a1a/333/png?text=Chain' },
  { id: 9, name: 'Leather Coat', category: 'Outerwear', imageUrl: 'https://placehold.co/300x600/1a1a1a/333/png?text=Coat' },
  { id: 10, name: 'Basic Tee', category: 'Tops', imageUrl: 'https://placehold.co/300x400/1a1a1a/333/png?text=Tee' },
]);

// --- Computed ---
const filteredItems = computed(() => {
    return wardrobeItems.value.filter(item => {
        const matchesCategory = activeCategory.value === 'All' || item.category === activeCategory.value;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase());
        return matchesCategory && matchesSearch;
    });
});

// --- Upload Logic ---
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
            // Add to the grid dynamically
            wardrobeItems.value.unshift({
                id: Date.now(), // simple unique id
                name: file.name.split('.')[0], // simple name from filename
                category: activeCategory.value === 'All' ? 'Tops' : activeCategory.value, // Default to current category or 'Tops'
                imageUrl: response.url
            });
        }
    } catch (error) {
        console.error('Upload failed', error);
        alert('Failed to upload image');
    } finally {
        isUploading.value = false;
        if (fileInput.value) fileInput.value.value = '';
    }
};
</script>
