import Vue from 'vue'
import Router from 'vue-router'

import vCatalog from '../components/v-catalog'
import vCart from '../components/v-cart'
import vAddCatalogItem from '../components/v-add-catalog-item'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'catalog',
            component: vCatalog
        },
        {
            path: '/cart',
            name: 'cart',
            component: vCart,
            props: true
        },
        {
            path: '/new-item',
            name: 'new-item',
            component: vAddCatalogItem,
            props: true
        }
    ]
})

export default router