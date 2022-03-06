<template>
  <div class="v-catalog">
    <router-link :to="{name: 'new-item'}">
      <button class="v-catalog-add-item">
        Add Item
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
    </router-link>
    <router-link :to="{name: 'cart', params: {cart_data: CART}}" >
      <button class="v-catalog-link-to-cart">Cart: {{CART.length}}</button>
    </router-link>
    <h1>Catalog</h1>
    <div class="filters">
      <v-category
          :categories="categories"
          @select="sortByCategory"
          :category="category"
      />
      <div class="range-slider">
        <input
            type="range"
            min="0"
            max="1000"
            step="10"
            v-model="minPrice"
            @change="setChangeSlider"
        >
        <input
            type="range"
            min="0"
            max="1000"
            step="10"
            v-model="maxPrice"
            @change="setChangeSlider"
        >
      </div>
      <div class="range-values">
        <p>Min: {{minPrice}}</p>
        <p>Max: {{maxPrice}}</p>
      </div>
    </div>
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
      sortedProducts: [],
      minPrice: 0,
      maxPrice: 1000
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
      let vm = this
      this.sortedProducts = [...this.PRODUCTS]
      this.sortedProducts = this.sortedProducts.filter(function (item) {
        return item.price >= vm.minPrice && item.price <= vm.maxPrice
      })
      if (category) {
        this.sortedProducts = this.sortedProducts.filter(function (e) {
          vm.category = category.name
          return e.category === category.id
        })
      }
    },
    setChangeSlider() {
      if (this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice
        this.maxPrice = this.minPrice
        this.minPrice = tmp
      }
      this.sortByCategory()
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
    .then((response => {
      if (response.data) {
        console.log('Data arrived!')
        this.sortByCategory()
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
  border: solid;
  background: #ffffff;
  cursor: pointer;
  font-size: 18px;
}

.v-catalog-add-item {
  position: absolute;
  top: 10px;
  right: 100px;
  padding: 16px;
  margin-right: 8px;
  border: solid;
  background: #ffffff;
  cursor: pointer;
  font-size: 18px;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.range-slider {
  width: 200px;
  margin: auto 16px;
  text-align: center;
  position: relative;
}

.range-slider svg, .range-slider input[type=range] {
  position: absolute;
  left: 0;
  bottom: 0;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  top: 2px;
  margin-top: -7px;
}
</style>
