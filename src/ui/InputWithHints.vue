<script setup>
import { computed, ref } from "vue";
import InputUI from "./InputUI.vue";

const { hints, ...rest } = defineProps(["hints", "placeholder"]);

const model = defineModel();

const isValid = computed(() => hints.some((hint) => hint === model.value));
const handleChooseHint = (hint) => (model.value = hint);

const isHovered = ref(false);
const isFocused = ref(false);
const isHintsHovered = ref(false);

const isActive = computed(() => isHovered.value || isFocused.value || isHintsHovered.value);
</script>

<template>
  <div class="wrapper">
    <InputUI
      v-model="model"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :is-active="isActive"
      v-bind="rest"
    />
    <div class="separator"></div>
    <ul
      v-if="hints && hints.length > 0 && !isValid"
      class="hints"
      @mouseenter="isHintsHovered = true"
      @mouseleave="isHintsHovered = false"
      :class="{ hints_active: isActive }"
    >
      <li v-for="hint in hints" :key="hint" class="hints__hint" @click="handleChooseHint(hint)">
        {{ hint }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
}

.wrapper:not(:has(.hints)) .separator {
  display: none;
}

.hints {
  padding: 17px;
  position: absolute;
  top: calc(100% - 5px);
  width: 100%;
  max-height: calc(32px * 5 + 25px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  row-gap: 7px;
  background-color: var(--light);
  border: 1px solid rgb(var(--gray) / 0.5);
  border-top: 0;
  border-radius: 0 0 5px 5px;
  box-sizing: border-box;
  z-index: 1;
}

.hints::-webkit-scrollbar {
  width: 0;
}

.hints_active,
.input_active input {
  border-color: var(--secondary-text);
}

.separator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 24px);
  height: 2px;
  background-color: rgb(var(--gray) / 0.3);
  z-index: 2;
}

.hints__hint {
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  color: rgb(var(--gray));
  cursor: pointer;
}

.hints__hint:hover {
  color: var(--secondary-text);
}
</style>
