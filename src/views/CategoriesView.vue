<script setup>
import ContainerUI from "@/ui/ContainerUI.vue";
import PageContainer from "@/ui/PageContainer.vue";
</script>

<template>
  <main>
    <PageContainer>
      <ContainerUI>
        <div class="categories">
          <h1 class="categories__title">Категории товаров</h1>
          <div class="categories-cards"></div>
        </div>
      </ContainerUI>
    </PageContainer>
  </main>
</template>

<style scoped>
.categories {
  display: flex;
  flex-direction: column;
  row-gap: 19px;
}

.categories__title {
  font-size: 44px;
  line-height: 44px;
}

.categories-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(271px, 1fr));
  gap: 22px;
}
</style>
