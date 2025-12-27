<template>
    <span ref="valueRef">{{ Math.abs(val) }}</span>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { coldColor, warmColor } from '../things';

const { val } = defineProps<{val: number}>()
const valueRef = ref<HTMLSpanElement>();

onMounted(() => {
    if(!valueRef.value) return;
    const color = val < 0 ? coldColor : warmColor;
    valueRef.value.style.color = color;
})
</script>