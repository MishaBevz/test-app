import axios from 'axios';
export default {
    addToCart({commit}, payload) {
        return commit('ADD_TO_CART', payload)
    },
    deleteProductInCart({commit}, payload) {
        return commit('DELETE_PRODUCT_IN_CART', payload)
    },

    // Получаем data.json и names.json
    async getGoods({dispatch}) {  
        let data = [];
        let names = [];
        axios.get('/json/data.json')
            .then(response => {
                data = response.data.Value.Goods;
                return axios.get('/json/names.json')
            })
            .then(response => {
                names = response.data;
                // После получения, вызываем функцию для компоновки и преобразования data.json и names.json
                dispatch('connectAndSortParams', {data, names});
            })
            .catch(error => {
                if (error.response) {
                    console.log('Error response', error.response);
                  } else if (error.request) {
                    console.log('Error request', error.request);
                  } else {
                    console.log('Error message', error.message);
                  }
                console.log('Error config', error.config);
            })
    },
    
    // Компонуем категории товаров categoryNames и сами товары goods в удобные для дальнейшей работы сущности
    connectAndSortParams ({commit}, {data, names}) {
        let goods = [];
        let categoryNames = new Set();
        for (let {C: priсeUSD, G: groupId, T: productId,  P: quantity} of data) {
            goods.push({name: names[groupId].B[productId].N, id: productId, groupId, priсeUSD, quantity, groupName: names[groupId].G})
            categoryNames.add(names[groupId].G)
        }
        commit('SET_CATEGORY_NAMES', Array.from(categoryNames));
        commit('SET_GOODS', goods);
    },
    randomInteger({}, {min, max}) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    },
    getCurrencyUsdRate ({dispatch, commit, state}) {
        const range = {
            min: 20,
            max: 80
        }
        dispatch('randomInteger', range).then(res => {
            commit('SET_CURRENCY_USD_OLD', state.currencyUSD)
            commit('SET_CURRENCY_USD', res)
        })
    }
}