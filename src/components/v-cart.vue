<template>
  <div class="v-cart">
    <router-link :to="{name: 'catalog'}" >
      <button class="v-catalog-link-to-cart">
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
        Back to catalog</button>
    </router-link>
    <h1>Cart</h1>
    <p v-if="!cart_data.length">There are no products...</p>
    <v-cart-item
      v-for="(item, index) in cart_data"
      :key="item.article"
      :cart_item_data="item"
      @deleteFromCart="deleteFromCart(index)"
      @increment="increment(index)"
      @decrement="decrement(index)"
    />
    <div>
      <button class="v-cart-button" @click="clearCart">
        <font-awesome-icon icon="fa-solid fa-trash-can" />
        Clear cart
      </button>
    </div>
    <div class="v-cart-total">
      <p class="total-name">Total:</p>
      <p>{{cartTotalCost}}$</p>
    </div>
  </div>
</template>

<script>
import vCartItem from './v-cart-item'
import {mapActions} from "vuex"

export default {
  name: "v-cart",
  components: {
    vCartItem
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    cartTotalCost() {
      let result = []

      if (this.cart_data.length) {
        for (let item of this.cart_data) {
          result.push(item.price * item.quantity)
        }
        result = result.reduce(function (sum,el) {
          return sum + el
        })
        return result
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART',
      'INCREMENT_CART_ITEM',
      'DECREMENT_CART_ITEM'
    ]),
    increment(index) {
      this.INCREMENT_CART_ITEM(index)
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index)
    },
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index)
    },
    clearCart() {
      this.cart_data = []
    }
  },
}
</script>

<style>
  .v-cart {
    margin-bottom: 110px;
  }

  .v-cart-total {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 16px 24px;
    display: flex;
    justify-content: center;
    background: #26ae68;
    color: #ffffff;
    font-size: 20px;
  }

  .total-name {
    margin-right: 16px;
  }

  .v-cart-button {
    border: solid;
    font-size: 16px;
    padding: 10px;
    margin: 10px;
  }
</style>