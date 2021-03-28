import Router from 'vue-router'

// const Dashboard = () => import(/* webpackChunkName: "Dashboard" */ '@/views/Dashboard')
// const About = () => import(/* webpackChunkName: "About" */ '@/views/About')
// const Team = () => import(/* webpackChunkName: "Team" */ '@/views/Team')
// const NotFound = () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound')

const router = new Router({
  mode: 'history',
//   routes: [
//     {
//       path: '/',
//       name: 'Dashboard',
//       component: Dashboard
//     },
//     {
//       path: '/team',
//       name: 'Team',
//       component: Team
//     },
//     {
//       path: '/about',
//       name: 'About',
//       component: About
//     },
//     { path: '*', component: NotFound }
//   ]
})

export default router
