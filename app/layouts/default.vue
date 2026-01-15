<template>
  <div class="h-screen bg-midnight text-gray-200 overflow-hidden font-sans flex relative">
    <!-- Global Ambient Background -->
    <div class="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <!-- Noise Texture -->
        <div class="absolute inset-0 opacity-[0.03] mix-blend-overlay z-10" style="background-image: url('https://grainy-gradients.vercel.app/noise.svg');"></div>
        <div class="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-electric/15 rounded-full blur-[150px] animate-pulse"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cyber/10 rounded-full blur-[150px]" style="animation-delay: 2s"></div>
        <div class="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] bg-electric/5 rounded-full blur-[200px] mix-blend-overlay"></div>
    </div>

    <!-- Sidebar (Left) - Full Height -->
    <aside class="w-20 md:w-24 lg:w-72 flex-shrink-0 flex flex-col items-center py-8 relative z-20 border-r border-white/5 bg-surface/30 backdrop-blur-2xl">
      <!-- Logo Area -->
      <div class="mb-12 flex flex-col items-center w-full px-4">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-electric via-purple-600 to-cyber flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)] mb-3 border border-white/20 relative group/logo cursor-pointer hover:scale-105 transition-transform duration-500">
            <div class="absolute inset-0 bg-white/20 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <Shirt class="w-7 h-7 text-white relative z-10" />
          </div>
          <h1 class="hidden lg:block text-2xl font-bold font-display tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">WTS</h1>
          <p class="hidden lg:block text-[9px] text-gray-500 tracking-widest uppercase mt-1">Digital Atelier</p>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 w-full space-y-4 px-2 lg:px-6 overflow-y-auto custom-scrollbar">
        <NuxtLink to="/" class="group flex flex-col lg:flex-row items-center lg:gap-4 p-3 lg:p-4 rounded-xl transition-all duration-300 hover:bg-white/5 relative overflow-hidden" active-class="bg-white/5 border-r-2 lg:border-r-0 lg:border-l-2 border-electric shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <div class="absolute inset-0 bg-gradient-to-r from-electric/10 to-transparent opacity-0 group-[.router-link-active]:opacity-100 transition-opacity duration-500"></div>
            <Shirt class="w-6 h-6 text-gray-400 group-hover:text-electric group-[.router-link-active]:text-electric transition-colors relative z-10" />
            <span class="text-[10px] lg:text-sm font-medium text-gray-400 mt-1 lg:mt-0 group-hover:text-white group-[.router-link-active]:text-white transition-colors relative z-10">Wardrobe</span>
        </NuxtLink>

        <NuxtLink to="/stylist" class="group flex flex-col lg:flex-row items-center lg:gap-4 p-3 lg:p-4 rounded-xl transition-all duration-300 hover:bg-white/5 relative overflow-hidden" active-class="bg-white/5 border-r-2 lg:border-r-0 lg:border-l-2 border-cyber shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <div class="absolute inset-0 bg-gradient-to-r from-cyber/10 to-transparent opacity-0 group-[.router-link-active]:opacity-100 transition-opacity duration-500"></div>
            <Sparkles class="w-6 h-6 text-gray-400 group-hover:text-cyber group-[.router-link-active]:text-cyber transition-colors relative z-10" />
            <span class="text-[10px] lg:text-sm font-medium text-gray-400 mt-1 lg:mt-0 group-hover:text-white group-[.router-link-active]:text-white transition-colors relative z-10">AI Stylist</span>
        </NuxtLink>
      </nav>

      <!-- Settings -->
      <div class="w-full px-2 lg:px-6 mt-auto">
        <div class="w-full h-px bg-white/5 mb-4 hidden lg:block"></div>
        <button class="w-full flex flex-col lg:flex-row items-center lg:gap-4 p-3 lg:p-4 rounded-xl transition-all duration-300 hover:bg-white/5 text-gray-400 hover:text-white group">
          <Settings class="w-6 h-6 group-hover:rotate-90 transition-transform duration-700" />
          <span class="text-[10px] lg:text-sm font-medium mt-1 lg:mt-0">Settings</span>
        </button>
      </div>
    </aside>

    <!-- Main Viewport -->
    <main class="flex-1 relative z-10 flex overflow-hidden">
          <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Shirt, Sparkles, Settings } from 'lucide-vue-next';
</script>

<style scoped>
/* Scoped styles removed in favor of global tailwind.css scrollbar styling */
</style>
