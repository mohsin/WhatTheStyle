<template>
  <div class="h-full flex flex-col lg:flex-row w-full overflow-hidden">
    <!-- Main Stage (Center) -->
    <div class="flex-1 flex flex-col p-8 lg:p-12 relative overflow-y-auto custom-scrollbar">
      <header class="mb-10 flex items-end justify-between">
        <div>
          <h1 class="text-4xl font-display font-bold text-white mb-2 tracking-wide">AI Stylist</h1>
          <p class="text-gray-400 text-lg">Curate your perfect look.</p>
        </div>
      </header>

      <!-- Outfit Display Stage -->
      <div class="flex-1 flex flex-col items-center justify-center relative min-h-[500px]">

        <!-- The Stage Platform -->
        <div class="relative w-full max-w-2xl aspect-[4/3] group">
            <!-- Stage Floor Light -->
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-electric/30 via-transparent to-transparent blur-2xl transform scale-x-150"></div>

            <!-- Items Container -->
            <div class="relative z-10 w-full h-full flex items-center justify-center p-8">

               <!-- Jacket (Back Left) -->
               <div class="absolute top-10 left-[15%] w-[40%] aspect-[3/4] bg-gray-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-[5deg] border border-white/10 overflow-hidden hover:scale-105 hover:z-30 transition-all duration-500 ease-out origin-bottom-left group-hover:translate-x-[-20px]">
                  <img src="https://images.unsplash.com/photo-1551028919-ac6635f0e5c9?w=800&auto=format&fit=crop&q=80" class="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" alt="Jacket" />
                  <div class="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <span class="text-white font-medium text-sm">Leather Biker</span>
                  </div>
               </div>

               <!-- Jeans (Back Right) -->
               <div class="absolute top-12 right-[15%] w-[38%] aspect-[3/4] bg-blue-900 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-[8deg] border border-white/10 overflow-hidden hover:scale-105 hover:z-30 transition-all duration-500 ease-out origin-bottom-right group-hover:translate-x-[20px]">
                  <img src="https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&auto=format&fit=crop&q=80" class="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" alt="Jeans" />
                  <div class="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                     <span class="text-white font-medium text-sm">Ripped Denim</span>
                  </div>
               </div>

               <!-- Shoes (Front Center) -->
               <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[45%] aspect-[4/3] bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden hover:scale-110 hover:z-30 transition-all duration-500 ease-out z-20 group-hover:-translate-y-4">
                  <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80" class="w-full h-full object-cover" alt="Shoes" />
                  <div class="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                     <span class="text-white font-medium text-sm">Air Max 97</span>
                  </div>
               </div>
            </div>

            <!-- Floating Data Points -->
            <div class="absolute top-[10%] right-[5%] bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg animate-bounce duration-[3000ms]">
              <Sparkles class="w-4 h-4 text-cyber" />
              <span class="text-sm font-bold text-white">98% Match</span>
            </div>
        </div>
      </div>

      <!-- Prompt Input (Floating Bottom) -->
      <div class="mt-8 relative max-w-3xl mx-auto w-full group/input">
        <div class="absolute -inset-1 bg-gradient-to-r from-electric via-purple-500 to-cyber rounded-3xl blur opacity-30 group-hover/input:opacity-60 transition-opacity duration-500"></div>
        <div class="relative bg-midnight/80 backdrop-blur-xl border border-white/10 rounded-3xl p-2 flex items-center gap-4 shadow-2xl">
          <input
            type="text"
            placeholder="I need an outfit for a DJ party tonight..."
            class="flex-1 bg-transparent border-none focus:ring-0 text-white text-lg placeholder-gray-500 px-6 py-4 font-medium tracking-wide outline-none min-w-0"
          />
          <button class="bg-gradient-to-r from-electric to-cyber text-white font-bold py-4 px-10 rounded-2xl shadow-lg hover:shadow-electric/40 hover:scale-105 active:scale-95 transition-all duration-300 flex-shrink-0 flex items-center gap-2">
            <Sparkles class="w-5 h-5" />
            <span>Generate</span>
          </button>
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
           <div v-for="cat in ['Tops', 'Bottoms', 'Shoes']" :key="cat">
              <h4 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">{{ cat }}</h4>
              <div class="grid grid-cols-2 gap-3">
                 <div v-for="i in 2" :key="i" class="aspect-[3/4] rounded-xl bg-surface border border-white/5 overflow-hidden relative group cursor-pointer hover:border-electric/50 transition-colors">
                    <!-- Placeholder images dependent on category for variety -->
                    <div class="absolute inset-0 bg-gray-800 animate-pulse"></div>
                    <div class="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-white/20 group-hover:bg-electric transition-colors"></div>
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
import { Sparkles, Shirt, Plus } from 'lucide-vue-next';
</script>
