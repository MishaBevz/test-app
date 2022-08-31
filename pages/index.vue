<template>
  <v-app>
    <Header/>
    <ProductList/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '~/components/Header.vue'
import ProductList from '@/components/ProductList.vue'
export default Vue.extend({
  name: 'IndexPage',
  components: {
    Header,
    ProductList
}
})
</script>
