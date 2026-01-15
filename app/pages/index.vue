<template>
  <div>
    <h1 class="text-3xl font-display font-bold text-white mb-2">Wardrobe</h1>
    <p class="text-gray-400 mb-8">Your digital collection.</p>

    <WardrobeGrid :items="wardrobeItems" />
  </div>
</template>

<script setup lang="ts">
const wardrobeItems = [
  { id: 1, name: 'Leather Jacket', category: 'Outerwear' },
  { id: 2, name: 'White Tee', category: 'Tops' },
  { id: 3, name: 'Slim Jeans', category: 'Bottoms' },
  { id: 4, name: 'Chelsea Boots', category: 'Footwear' },
  { id: 5, name: 'Black Hoodie', category: 'Tops' },
];
</script>
