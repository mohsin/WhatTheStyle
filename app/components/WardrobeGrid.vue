<template>
  <div class="columns-2 md:columns-3 xl:columns-4 gap-6 space-y-6 p-1">
    <!-- Add New Button (First Item for easy access) -->
    <div
      @click="$emit('add')"
      class="break-inside-avoid aspect-[3/4] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-electric hover:text-electric hover:bg-white/5 transition-all cursor-pointer group mb-6"
    >
      <div class="w-12 h-12 rounded-full border border-current flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        <Plus class="w-6 h-6" />
      </div>
      <span class="text-sm font-medium">Add New</span>
    </div>

    <!-- Items -->
    <div
        v-for="item in items"
        :key="item.id"
        class="break-inside-avoid bg-surface rounded-2xl border border-white/5 hover:border-electric/50 transition-all cursor-pointer group relative overflow-hidden mb-6"
    >
      <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" class="w-full h-auto object-cover" />
      <div v-else class="aspect-[3/4] flex items-center justify-center text-gray-600 group-hover:text-electric transition-colors bg-white/5">
        <span class="text-sm font-medium">{{ item.name }}</span>
      </div>

      <!-- Hover Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        <span class="text-white text-sm font-medium">{{ item.name }}</span>
        <span class="text-xs text-gray-400">{{ item.category }}</span>
      </div>
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

defineEmits(['add']);
</script>
