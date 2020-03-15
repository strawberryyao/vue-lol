import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/category/CategoryEdit.vue';
import CategoryList from './views/category/CategoryList.vue';

import ItemEdit from './views/item/ItemEdit.vue';
import ItemList from './views/item/ItemList.vue';

import HeroEdit from './views/hero/HeroEdit.vue';
import HeroList from './views/hero/HeroList.vue';

import ArticleEdit from './views/article/ArticleEdit.vue';
import ArticleList from './views/article/ArticleList.vue';


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
        { path: '/items/edit/:id', component: ItemEdit, props:true },

        { path: '/heros/create', component: HeroEdit },
        { path: '/heros/list', component: HeroList },
        { path: '/heros/edit/:id', component: HeroEdit, props:true },
        
        { path: '/articles/create', component: ArticleEdit },
        { path: '/articles/list', component: ArticleList },
        { path: '/articles/edit/:id', component: ArticleEdit, props:true },
      ]
    }
  ]
})

export default router