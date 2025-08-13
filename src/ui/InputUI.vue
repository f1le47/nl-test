<script setup>
import ClearIcon from "@/assets/icons/close.svg?component";
import { computed } from "vue";

const { placeholder, isActive } = defineProps(["placeholder", "isActive"]);
const emit = defineEmits(["mouseenter", "mouseleave", "focus", "blur"]);

const model = defineModel();
const clearInput = () => (model.value = "");
const hasText = computed(() => model.value && model.value.length > 0);
</script>

<template>
  <div class="wrapper" @mouseenter="$emit('mouseenter')" @mouseleave="$emit('mouseleave')">
    <input
      type="text"
      v-model="model"
      :placeholder="placeholder"
      class="input"
      :class="{ input_active: isActive }"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
    <div v-if="hasText" class="clear" @click="clearInput">
      <ClearIcon class="clear__icon" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
}

.input {
  padding: 12px;
  width: 100%;
  font-size: 18px;
  font-weight: 400;
  line-height: 23px;
  border: 1px solid rgb(var(--gray) / 0.5);
  border-radius: 5px;
  box-sizing: border-box;
}

.input:hover,
.input:focus,
.input_active {
  border-color: var(--secondary-text);
}

.clear {
  position: absolute;
  top: 50%;
  right: 18px;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.clear__icon {
  transform: scale(0.75);
}
</style>
