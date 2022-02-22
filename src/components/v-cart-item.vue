<template>
 <div class="v-cart-item">
   <img class="v-cart-item-images" :src=" require('../assets/images/' + cart_item_data.image) " alt="">
   <div class="v-cart-item-info">
     <p>{{cart_item_data.name}}</p>
     <p>{{cart_item_data.price}}$</p>
     <p>{{cart_item_data.article}}</p>
     <div class="v-cart-item-quantity">
       <p>Quantity:</p>
       <span>
         <button class="quantity-btn" @click="decrementItem">-</button>
         {{cart_item_data.quantity}}
         <button class="quantity-btn" @click="incrementItem">+</button>
       </span>
     </div>
     <button
         class="v-cart-item-button"
         @click="deleteFromCart"
     >Delete</button>
   </div>
 </div>
</template>

<script>

export default {
  name: "v-cart-item",
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    decrementItem() {
      this.$emit('decrement')
    },
    incrementItem() {
      this.$emit('increment')
    },
    deleteFromCart() {
      this.$emit('deleteFromCart')
    }
  },
  mounted() {}
}
</script>

<style>
  .v-cart-item {
    display: flex;
    /*max-width: 220px;*/
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 16px;
    margin-bottom: 16px;
  }

  .v-cart-item-images {
    width: 100px;
  }

  .v-cart-item-button {
    margin: 16px;
  }

  .quantity-btn {
    cursor: pointer;
  }
</style>