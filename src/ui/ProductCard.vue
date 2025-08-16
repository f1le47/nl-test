<script setup>
import { computed } from "vue";
import ButtonUI from "./ButtonUI.vue";

const { product } = defineProps(["product"]);

const isProductInStock = computed(() => product.allowed && product.available);
</script>

<template>
  <div class="card">
    <img :src="product.main_image_thumb_300" alt="product image" class="card__img" />
    <div class="card-info">
      <span class="card-info__categoryName">{{ product.category.name }}</span>
      <span class="card-info__productName">{{ product.present_name }}</span>
      <span class="card-info__comment">{{ product.comment_name }}</span>
      <div class="card-info-bottom">
        <span class="card-info-bottom__price">{{ product.price }} ₽</span>
        <ButtonUI :is-disabled="!isProductInStock" class-name="card-info-bottom__button">{{
          isProductInStock ? "В корзину" : "Нет в наличии"
        }}</ButtonUI>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  min-width: 276px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--light);
  border-radius: 0 0 5px 5px;
}

.card__img {
  width: 276px;
  height: 276px;
}

.card-info {
  padding: 6px 20px 23px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  box-sizing: border-box;
}

.card-info__categoryName {
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  color: rgb(var(--gray));
}

.card-info__productName {
  margin-bottom: 9px;
  font-size: 20px;
  line-height: 24px;
  color: var(--secondary-text);
}

.card-info__comment {
  margin-bottom: 14px;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: var(--secondary-text);
}

.card-info-bottom {
  margin-top: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-info-bottom__price {
  margin-bottom: 16px;
  font-size: 26px;
  line-height: 24px;
  color: var(--secondary-text);
}

.card-info-bottom__button {
  width: 100%;
}
</style>
