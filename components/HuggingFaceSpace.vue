<template>
  <div class="huggingface-container" :style="{ height: `${height}px` }">
    <iframe
      :src="spaceSrc"
      frameborder="0"
      width="100%"
      height="100%"
      :allow="allowFeatures"
      loading="lazy"
    ></iframe>
  </div>
</template>

<script setup>
defineProps({
  space: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    default: 500
  },
  allowFeatures: {
    type: String,
    default: 'microphone'
  }
});

const spaceSrc = computed(() => {
  return `https://${props.space}.hf.space`;
});
</script>

<style scoped>
.huggingface-container {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}
</style>
