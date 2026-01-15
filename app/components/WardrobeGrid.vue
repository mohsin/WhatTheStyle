<template>
  <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
    <!-- Items -->
    <div v-for="item in items" :key="item.id" class="aspect-[3/4] bg-surface rounded-2xl border border-white/5 hover:border-electric/50 transition-all cursor-pointer group relative overflow-hidden">
      <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" class="w-full h-full object-cover" />
      <div v-else class="absolute inset-0 flex items-center justify-center text-gray-600 group-hover:text-electric transition-colors">
        <span class="text-sm font-medium">{{ item.name }}</span>
      </div>

      <!-- Hover Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        <span class="text-white text-sm font-medium">{{ item.name }}</span>
        <span class="text-xs text-gray-400">{{ item.category }}</span>
      </div>
    </div>

    <!-- Add New Button -->
    <div class="aspect-[3/4] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-electric hover:text-electric hover:bg-white/5 transition-all cursor-pointer group">
      <div class="w-12 h-12 rounded-full border border-current flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        <Plus class="w-6 h-6" />
      </div>
      <span class="text-sm font-medium">Add New</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next';

interface WardrobeItem {
  id: number;
  name: string;
  category: string;
  imageUrl?: string;
}

defineProps<{
  items: WardrobeItem[];
}>();
</script>
