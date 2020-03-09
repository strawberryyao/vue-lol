import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue';
import CategoryList from './views/CategoryList.vue';

import ItemEdit from './views/ItemEdit.vue';
import ItemList from './views/ItemList.vue';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        { path: '/categories/create', component: CategoryEdit },
        { path: '/categories/list', component: CategoryList },
        // props:true 等价 this.$route.params.id
        { path: '/categories/edit/:id', component: CategoryEdit, props:true },

        { path: '/items/create', component: ItemEdit },
        { path: '/items/list', component: ItemList },
        { path: '/items/edit/:id', component: ItemEdit, props:true }

      ]
    }
  ]
})

export default router