<template>
  <div class="v-catalog-item">
    <div>
    <img class="v-catalog-item__image" :src=" require('../assets/images/' + product_data.image) " alt="img">
    <p class="v-catalog-item__name">{{product_data.name}}</p>
    <p class="v-catalog-item__price">Price: {{product_data.price}}$</p>
    <button
        class="v-catalog-item__add_to_cart_btn"
        @click="addToCart">
      <font-awesome-icon icon="fa-solid fa-cart-plus" />
      Add to cart
    </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-catalog-item",
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
    }
    }
  },
  data() {
    return {}
  },
  methods: {
    addToCart() {
      this.$emit('addToCart', this.product_data)
    }
  },
  computed: {},
  mounted() {
    this.$set(this.product_data, 'quantity', 1)
  }
}
</script>

<style>
  .v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 16px;
    margin-bottom: 16px;
  }

  .v-catalog-item__image {
    width: 100px;
  }

  .v-catalog-item__add_to_cart_btn {
    font-size: 14px;
    border: solid;
  }
</style>
