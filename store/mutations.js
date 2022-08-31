export default {
    SET_GOODS(state, payload) {
      state.goods = payload;
    },
    SET_CURRENCY_USD(state, payload) {
      state.currencyUSD = payload;
    },
    SET_CURRENCY_USD_OLD(state, payload) {
      state.currencyUSDold = payload;
    },
    SET_CATEGORY_NAMES(state, payload) {
      state.categoryNames = payload;
    },
    ADD_TO_CART(state, payload) {
      const product = {
        ...payload,
        count: 1
      }
      for (let i = 0; i < state.goods.length; i++) {
        // Если товар найден и есть в наличии (quantity > 0), тогда проверяем дальше:
        if (state.goods[i].id === payload.id && state.goods[i].quantity !== 0) {
          // Если корзина не пуста, ищем данный товар в ней:
          if (state.cart.length > 0) {
            for (let q = 0; q < state.cart.length; q++) {
              // Если товар в корзине найден, прибавляем кол-во товара в корзине и вычитаем позицию кол-ва товара, который остался:
              if (state.cart[q].id === payload.id) {
                state.goods[i].quantity--;
                state.cart[q].count++;
                return
              }
            }  
          }
          // Если товара в корзине не оказалось, добавляем его туда:
          state.cart.push(product);
          state.goods[i].quantity--;
          return;
        }
      }
    },
    DELETE_PRODUCT_IN_CART(state, payload) {
      // Ищем товар и удаляем его из корзины:
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id === payload.id) {
          state.cart.splice(i, 1)
          break;
        }
      }
      // Возвращаем в наличие кол-во товаров, удаленных из корзины:
      for (let i = 0; i < state.goods.length; i++) {
        if (state.goods[i].id === payload.id) {
          state.goods[i].quantity += payload.count;
          break;
        }
      }
    }
}