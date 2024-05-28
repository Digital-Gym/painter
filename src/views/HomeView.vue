<script setup lang="ts">
import {ref, onMounted} from 'vue'

const canvas = ref()
const ctx = ref()

const width = 750
const height = 750
const isPainting = ref(false)
const startX = ref()
const startY = ref()
const lineWidth = ref(5)


const down = (e: MouseEvent) => {
  isPainting.value = true
  startX.value = e.clientX;
  startY.value = e.clientY;
}

const up = () => {
  isPainting.value = false
  ctx.value.stroke()
  ctx.value.beginPath()
}

const draw = (e: MouseEvent) => {
  if (!isPainting.value){
    return
  }
  ctx.value.lineWidth=lineWidth.value
  ctx.value.lineCap='round'

  ctx.value.lineTo(e.clientX - canvas.value.offsetLeft, e.clientY - canvas.value.offsetTop);
  ctx.value.stroke();
}

const refresh = () => {
  ctx.value.fillStyle = 'white';
  ctx.value.fillRect(0, 0, width, height);
}

onMounted(() => {
  ctx.value = canvas.value.getContext('2d')
  refresh()
});

</script>

<template>
  <div 
    class="main w-full flex justify-center items-center h-screen text-white"
    @mousedown="down"
    @mouseup="up"
    @mousemove="draw"
  >
    <div class="flex flex-col gap-3">
      <h1 class="text-5xl text-center">
        Printer
      </h1>
      <canvas 
        ref="canvas" 
        :width="width" 
        :height="height"
        class="border"
      />
      <div 
        :width="width" 
        class="flex align-items-center justify-around"
      >
        <input 
          v-if="ctx"
          id="stroke" 
          name="stroke" 
          type="color"
          v-model="ctx.strokeStyle"
        >
        <input 
          type="number" 
          class="bg-white text-black w-12"
          v-model="lineWidth"
          min="1" 
          max="50"
        >
        <input 
          type="button" 
          value="Clear" 
          class="bg-white text-black w-12"
          @click="refresh"
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.main{
  background-color: slateblue;
}
</style>