import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Faq from './views/Faq.vue';
import VueScrollTo from 'vue-scrollto';
import Partners from '@/views/Partners.vue';

Vue.use(Router);
Vue.use(VueScrollTo, {
  container: '.home__container',
});

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (to.hash) {
          next();
        } else {
          next('/#home');
        }
      },
    },
    {
      path: '/faq',
      name: 'faq',
      component: Faq,
    },
    {
      path: '/partners',
      name: 'partners',
      component: Partners,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return VueScrollTo.scrollTo(to.hash, 500);
    }
  },
});
