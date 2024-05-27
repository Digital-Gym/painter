<script setup lang="ts">
import { getQuote } from '@/api';
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue'

interface Quote {
  author: string;
  authorSlug: string;
  content: string;
  dateAdded: string;
  dateModified: string;
  length: number;
  tags: string[];
  _id: string;
}

const quote: Ref<Quote | null> = ref(null)

const refresh = async () => {
  const data = await getQuote()
  if (data){
    quote.value = data
  }
}

onMounted(async () =>{
  await refresh()
})
</script>

<template>
  <div class="w-full flex justify-center items-center h-screen bg-slate-800 text-white">
    <div class="w-4/5 flex flex-col items-center justify-between h-2/5">
      <img
        src="/ugway.png"
        alt="ugway-photo"
      >
      <div
        class="flex flex-col items-center gap-3" 
        v-if="quote"
      >
        <i class="text-2xl text-center">
          "{{ quote.content }}"
        </i>
        {{ quote.author }}
      </div>
    </div>
  </div>
</template>
