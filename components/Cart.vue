<!-- Please remove this file from your project -->
<template>
    <div class="cart">
    <v-btn icon class="cart-icon" @click="openCart">
        <v-icon>mdi-cart</v-icon>
        <span v-show="$store.state.cart.length" class="cart-icon__counter">{{counter}}</span>
    </v-btn>
        <v-dialog
            v-model="cartOpened"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            >
            <v-card>
                <v-toolbar
                dark
                color="deep-purple accent-4"
                >
                <v-btn
                    icon
                    dark
                    @click="openCart"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Корзина</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                    dark
                    text
                    @click="openCart"
                    >
                    Закрыть
                    </v-btn>
                </v-toolbar-items>
                </v-toolbar>
                <v-list
                three-line
                subheader
                >
                <div v-if="$store.state.cart.length">
                    <v-subheader>Список товаров:</v-subheader>

                        <v-simple-table>
                            <template v-slot:default>
                            <thead>
                                <tr>
                                <th class="text-left">
                                    Название товара
                                </th>
                                <th class="text-left">
                                    Кол-во
                                </th>
                                <th class="text-left">
                                    Цена
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                v-for="(item, i) in $store.state.cart"
                                :key="i"
                                >
                                    <td>{{item.name}}</td>
                                    <td>{{item.count}}</td>
                                    <td>{{item.priсeUSD * $store.state.currencyUSD}}</td>
                                    <td>
                                        <v-btn
                                            icon
                                            @click="deleteItem(item)"
                                        >
                                        <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                                <tr><td>Общая стоимость: {{total}}</td></tr>

                            </tbody>
                            </template>
                        </v-simple-table>
                    </div>
                    <div v-else>
                        <v-subheader>Корзина пуста</v-subheader>
                    </div>
                </v-list>
            </v-card>
        </v-dialog>
    </div>

</template>

<script>

export default {
  name: 'Cart',
  data () {
    return {
        cartOpened: false
    }
  },
  methods: {
    openCart () {
        this.cartOpened = !this.cartOpened
    },
    deleteItem (item) {
        this.$store.dispatch('deleteProductInCart', item)
    },
  },
  computed: {
    counter () {
        if (this.$store.state.cart.length > 99) {
            return '+99'
        } else {
            return this.$store.state.cart.length
        }
    },

    total () {
        let total = 0;
        // Если корзина пуста:
        if (!this.$store.state.cart.length) {
            return total;
        }
        // Если в корзине только 1 тип товара:
        if (this.$store.state.cart.length < 2) {
            total = ( (this.$store.state.cart[0].priсeUSD  * this.$store.state.currencyUSD) * this.$store.state.cart[0].count ).toFixed(2);
            return total;
        }
        // Если несколько типов товаров:
        total = this.$store.state.cart.reduce((prev, curr) => {
            return ( ((prev.priсeUSD * this.$store.state.currencyUSD) * prev.count) + ((curr.priсeUSD * this.$store.state.currencyUSD) * curr.count) ).toFixed(2);
        });
        return total;
    }
  }
}
</script>

<style lang="scss">
    .cart-icon {
        position: relative;
        &__counter {
            z-index: 2;
            background: red;
            border-radius: 18px;
            min-width: 18px;
            height: 18px;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: 0;
            line-height: 11px;
            top: -7px;
            padding: 0 4px;
        }
    }
</style>
