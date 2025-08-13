<script setup>
import ContainerUI from "@/ui/ContainerUI.vue";
import LocationIcon from "@/assets/icons/location.svg?component";
import { useLocationStore } from "@/stores/location/locationStore";
import ChooseLocationModal from "./components/ChooseLocationModal.vue";
import { onMounted, ref } from "vue";

const locationStore = useLocationStore();

const locationModalRef = ref(null);
const openLocationModal = () => {
  locationModalRef.value.openModal();
};

onMounted(() => {
  locationStore.getCity();
});
</script>

<template>
  <header class="header">
    <ContainerUI>
      <div class="header-location" @click="openLocationModal">
        <LocationIcon class="header-location__icon" />
        <span class="header-location__text">{{ locationStore.city?.city }}</span>
      </div>
      <ChooseLocationModal ref="locationModalRef" />
    </ContainerUI>
  </header>
</template>

<style scoped>
.header {
  padding: 24px 0;
  background-color: var(--light);
  box-shadow: 0 2px 4px 0 rgb(39 39 39 / 0.1);
}

.header-location {
  display: flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;
}

.header-location__icon {
  width: 11px;
  height: 16px;
  color: rgb(var(--gray));
}

.header-location__text {
  font-size: 15px;
  line-height: 24px;
}
</style>
