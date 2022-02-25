<template>
  <div class="v-category">
    <p
        class="v-category-title"
        @click="areOptionsVisible = !areOptionsVisible"
    >{{category}}</p>
    <div
        class="options"
        v-if="areOptionsVisible"
    >
      <p
        v-for="category in categories"
        :key="category.value"
        @click="selectOption(category)"
      >
        {{category.name}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-category",
  props: {
    categories: {
      type: Array,
      default() {
        return []
      }
    },
    category: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      areOptionsVisible: false
    }
  },
  methods: {
    selectOption(category) {
      this.$emit('select', category)
      this.areOptionsVisible = false
    },
    hideSelect() {
      this.areOptionsVisible = false
    }
  },
  mounted() {
    document.addEventListener('click', this.hideSelect.bind(this), true)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideSelect)
  }
}
</script>

<style>
  .v-category{
    position: relative;
    width: 200px;
    cursor: pointer;
    text-align: left;
  }

  .v-category p {
    margin: 0;
  }

  .options {
    border: solid 1px #aeaeae;
    background: #fff;
    position: absolute;
    top: 30px;
    left: 0;
    width: 100%;
    padding: 8px;
  }

  .v-category-title {
    border: solid 1px #aeaeae;
    padding: 8px;
  }

  .options p:hover {
    background: #e7e7e7;
  }
</style>