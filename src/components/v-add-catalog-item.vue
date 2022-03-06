<template>
 <div class="v-add-catalog-item">
   <router-link :to="{name: 'catalog'}">
     <button class="v-catalog-link-to-cart">
       <font-awesome-icon icon="fa-solid fa-arrow-left" />
       Back to catalog</button>
   </router-link>
   <h1>Add new item</h1>
   <div>
     <form action="" method="post">
       <input type="file" accept="image/jpeg"><br>
       <input type="text" >
     </form>
   </div>
 </div>
</template>

<script>
export default {
  name: "v-add-catalog-item"
}
</script>

<style>

</style>