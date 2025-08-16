<script setup>
const { isDisabled, textStyle, className } = defineProps(["isDisabled", "textStyle", "className"]);
</script>

<template>
  <button
    class="button"
    :class="{ button_uppercase: textStyle === 'uppercase', [className]: className }"
    :disabled="isDisabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  position: relative;
  padding: 13px 24px;
  font-size: 16px;
  line-height: 21px;
  color: var(--primary-text);
  background: linear-gradient(
    90deg,
    rgb(var(--primary-left) / 1) 0%,
    rgb(var(--primary-right) / 1) 100%
  );
  border-radius: 24px;
  cursor: pointer;
  z-index: 0;
}

.button::before {
  content: "";
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 30px);
  height: 100%;
  background: linear-gradient(
    90deg,
    rgb(var(--primary-left) / 0.6) 0%,
    rgb(var(--primary-right) / 0.6) 100%
  );
  filter: blur(27px);
  border-radius: inherit;
  transition: opacity 0.3s ease;
  opacity: 0;
  z-index: -1;
}

.button:hover::before {
  opacity: 1;
}

.button:disabled {
  padding: 11px 22px;
  color: var(--gray-text);
  border: 2px solid rgb(var(--gray) / 0.3);
  background: transparent;
  cursor: not-allowed;
}

.button:disabled:hover::before {
  opacity: 0;
}

.button_uppercase {
  letter-spacing: 1.75px;
  text-transform: uppercase;
}
</style>
