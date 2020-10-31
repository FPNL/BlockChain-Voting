import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/views/Main.vue';
import DashBoard from '@/views/DashBoard.vue';
import Welcome from '@/pages/Welcome.vue';
import Voting from '@/pages/Voting.vue';
import End from '@/pages/End.vue';

Vue.use(Router);

export const initRoutes = [
	{
		path: '/',
		name: '@main',
		component: Main,
        children: [
            {
                path: '',
                name: '@index',
                component: Welcome,
            },
            {
                path: 'voting',
                name: '@votingPage',
                component: Voting
            },
            {
                path: 'end',
                name: '@end',
                component: End
            }
        ]
	},
	{
		path: '/dashboard',
		name: '@dashboard',
		component: DashBoard
	}
]
const router = new Router({
	routes: initRoutes
});
export default router;
