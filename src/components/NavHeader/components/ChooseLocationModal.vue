<script setup>
import ButtonUI from "@/ui/ButtonUI.vue";
import ModalContainer from "@/ui/ModalContainer.vue";
import CloseIcon from "@/assets/icons/close.svg?component";
import { computed, ref, watch } from "vue";
import { useLocationStore } from "@/stores/location/locationStore";
import { debounce } from "@/common/utils/debounce";
import InputWithHints from "@/ui/InputWithHints.vue";

const locationStore = useLocationStore();

const isOpen = ref(false);
const openModal = () => (isOpen.value = true);
const closeModal = () => (isOpen.value = false);

const search = ref("");
const debouncedSearch = debounce((value) => {
  if (!chosenCity.value) {
    locationStore.getCitiesByTerm(value);
  }
}, 250);
watch(search, (value) => {
  debouncedSearch(value);
});

const citiesLabels = computed(() => locationStore.cities.map((city) => city.label));
const chosenCity = computed(() => locationStore.cities.find((city) => city.label === search.value));

const handleConfirm = () => {
  locationStore.saveCity(chosenCity.value);
  closeModal();
};

defineExpose({
  openModal,
});
</script>

<template>
  <ModalContainer :is-open="isOpen" @close="closeModal">
    <div class="modal">
      <span class="modal__title">Выбор населённого пункта:</span>
      <div class="modal-search">
        <InputWithHints
          :hints="citiesLabels"
          v-model="search"
          placeholder="Например, Санкт-петербург"
        />
        <ButtonUI :is-disabled="!chosenCity" @click="handleConfirm">ПОДТВЕРДИТЬ</ButtonUI>
      </div>
      <CloseIcon class="modal__close" @click="closeModal" />
    </div>
  </ModalContainer>
</template>

<style scoped>
.modal {
  margin: 0 16px;
  padding: 28px 18px 32px;
  position: relative;
  width: 100%;
  max-width: 769px;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  background-color: var(--light);
  border-radius: 5px;
}

.modal__title {
  font-size: 20px;
  line-height: 24px;
}

.modal-search {
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 18px;
}

.modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 16px;
  height: 16px;
  color: rgb(var(--gray));
  cursor: pointer;
}
</style>
