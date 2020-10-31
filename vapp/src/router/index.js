import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// const appTpl = () => import('@/views/tpl/AppTpl.vue');

export const initRoutes = [
    {
    path: '/getVote',
    name: 'getVote',
    component: () => import('@/views/GetVote.vue'),
},
{
    path: '/vote',
    name: 'vote',
    component: () => import('@/views/Vote.vue'),
},
{
    path: '/voteResult',
    name: 'voteResult',
    component: () => import('@/views/VoteResult.vue'),
}
]
const router = new Router({
    routes: initRoutes
});
export default router;
