
<template>
    <header class="header">
        <v-app-bar
        v-if="$store.state.categoryNames.length"
        color="deep-purple accent-4"
        dense
        dark
        >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Test App</v-toolbar-title>

            <v-spacer></v-spacer>

            <Cart/>  
        </v-app-bar>

        <v-skeleton-loader v-else
            type="table-heading"
        ></v-skeleton-loader>
    </header>
</template>

<script>
import Cart from '@/components/Cart.vue'
export default {
    name: 'Header',
    components: {
        Cart,
    }
}

</script>
<style lang="scss">
    .header {
        height: 48px;
        margin-bottom: 42px;
    }
</style>
