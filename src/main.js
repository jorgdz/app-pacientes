import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router';

import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueRouter);

Vue.prototype.$domainServer = 'http://localhost:8001/';
Vue.prototype.$domainSocketServer = 'http://localhost:5000';

Vue.prototype.$colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


import Test from './components/Test';
import Paciente from './components/Paciente';
import Ingreso from './components/Ingreso';
import Dashboard from './components/Dashboard';


const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [
		{
			path: '/',
			component: Dashboard
		},
		{
			path: '/pacientes',
			component: Paciente
		},
		{
			path: '/ingresar/:idPaciente',
			component: Ingreso,
			props: true
		},
		{
			path: '/test/:id/:arg',
			component: Test,
			props: true
		}
	]
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
  	render: h => h(App)
}).$mount('#app')
