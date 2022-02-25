<template>
  <div class="v-catalog">
    <router-link :to="{name: 'new-item'}">
      <div class="v-catalog-add-item">Add Item</div>
    </router-link>
    <router-link :to="{name: 'cart', params: {cart_data: CART}}" >
      <div class="v-catalog-link-to-cart">Cart: {{CART.length}}</div>
    </router-link>
    <h1>Catalog</h1>
    <v-category
        :categories="categories"
        @select="sortByCategory"
        :category="category"
    />
      <div class="v-catalog-list">
        <v-catalog-item
            v-for="product in filteredProducts"
            :key="product.article"
            :product_data="product"
            @addToCart="addToCart"
        />
      </div>
  </div>
</template>

<script>
import vCatalogItem from './v-catalog-item'
import vCategory from './v-category'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "v-catalog",
  components: {
    vCatalogItem,
    vCategory
  },
  props: {},
  data() {
    return {
      categories: [
        {name: 'All', id: 0, value: 0},
        {name: 'Category 1', id: 1, value: 1},
        {name: 'Category 2', id: 2, value: 2},
        {name: 'Category 3', id: 3, value: 3},
        {name: 'Category 4', id: 4, value: 4},
        {name: 'Category 5', id: 5, value: 5},
        {name: 'Category 6', id: 6, value: 6}
      ],
      category: 'All',
      sortedProducts: []
    }
  },
  computed: {
    ...mapGetters([
      'PRODUCTS',
        'CART'
    ]),
    filteredProducts() {
      if (this.sortedProducts.length) {
        return this.sortedProducts
      } else {
        return this.PRODUCTS
      }
    }
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART'
    ]),
    addToCart(data) {
      this.ADD_TO_CART(data)
    },
    sortByCategory(category) {
      this.sortedProducts = []
      let vm = this
      this.PRODUCTS.map(function (item) {
        if (item.category === category.id) {
          vm.sortedProducts.push(item)
        }
      })
      this.category = category.name
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
    .then((response => {
      if (response.data) {
        console.log('Data arrived!')
      }
    }))
  }
}
</script>

<style>
.v-catalog-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.v-catalog-link-to-cart {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 16px;
  border: solid 1px #aeaeae;
}

.v-catalog-add-item {
  position: absolute;
  top: 10px;
  right: 100px;
  padding: 16px;
  border: solid 1px #aeaeae;
}
</style>
