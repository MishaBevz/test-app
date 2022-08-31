<template>
  <v-expansion-panels class="product-list-wrap">
    <div class="product-list" v-if="$store.state.categoryNames.length">
      <v-expansion-panel
        v-for="(item,i) in $store.state.categoryNames"
        :key="i"
      >
        <v-expansion-panel-header>
          {{item}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-if="product.groupName === item" v-for="(product, i) in $store.state.goods" :key="i">
          <Product 
              :groupId="product.groupId"
              :groupName="product.groupName"
              :id="product.id"
              :name="product.name"
              :priсeUSD="product.priсeUSD"
              :quantity="product.quantity"
          />
        </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
    <v-skeleton-loader v-else
      class="product-list__skeleton-loader"
      type="image"
    ></v-skeleton-loader>
  </v-expansion-panels>
</template>
<script>
import Product from './Product.vue';
export default {
    name: 'ProductList',
    components: {
        Product
    },
    methods: {
    },
    created() {
        this.$store.dispatch('getGoods')
    },
    mounted() { 
        setInterval(() => {
          this.$store.dispatch('getCurrencyUsdRate')
        }, 15000)
    }
}
</script>
<style lang="scss">
    .product-list-wrap {
      width: 100%;
      .product-list {
        width: 100%;
        &__skeleton-loader {
          width: 100%;
        }
      }
    }
</style>