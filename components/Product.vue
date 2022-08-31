<template lang="">
    <v-card
        elevation="2"
        outlined
    >
        <v-card-title>{{name}}</v-card-title>
        <v-card-subtitle>Осталось: {{quantity}}</v-card-subtitle>
        <v-card-text :style="{color: priceAdvantage ? 'green' : 'red', transition: 'color .5s'}">Цена: {{price}}</v-card-text>
        <v-card-actions>
            <v-btn
                @click="addToCart"   
                :disabled="quantity <= 0"
                >
                {{quantity <= 0 ? 'Нет в наличии' : 'Добавить в корзину'}}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>

export default {
    name: 'Product',
    props: {
        groupId: Number,
        groupName: String,
        id: Number,
        name: String,
        priсeUSD: Number,
        quantity: Number,
    },
    data () {
      return {
        product: {
            groupId: this.groupId,
            groupName: this.groupName,
            id: this.id,
            name: this.name,
            priсeUSD: this.priсeUSD,
            quantity: this.quantity
        }
      }  
    },
    methods: {
        addToCart () {
            for (let i = 0; i < this.$store.state.goods.length; i++) {
                if (this.$store.state.goods[i].id === this.product.id && this.$store.state.goods[i].id > 0) {
                    return this.$store.dispatch('addToCart', this.product);
                }
            }
        }
    },
    computed: {
        priceOld () {
            return  (this.priсeUSD * this.$store.state.currencyUSDold).toFixed(2)
        },
        price () {
            return  (this.priсeUSD * this.$store.state.currencyUSD).toFixed(2)
        },
        priceAdvantage () {
            return (this.priсeUSD * this.$store.state.currencyUSD).toFixed(2) < (this.priсeUSD * this.$store.state.currencyUSDold).toFixed(2)
        }
    }
}
</script>
<style lang="scss">
</style>
