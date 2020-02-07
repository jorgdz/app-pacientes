<template>
	<div class="test">
		<h1>{{ title }}</h1>
		<ul>
			<li v-for="(user, index) in users" :key="user.id">{{ index+1 }} - {{ user.name }} - {{ user.lastname }}</li>
		</ul>
		
		<input type="" v-model="users[1].name" @keyup.enter="typedEnter">
		<button type="button" @click="gretting(users[1].name)">Click me</button>
		
		<span>ID: {{ id }}</span>
		<span>ARG: {{ arg }}</span>
		<pre>{{ $data.users }}</pre>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Gretting VUE JS',
				users: [
					{
						'id': 1,
						'name': 'Cesar',
						'lastname': 'Lata'
					},
					{
						'id': 2,
						'name': 'Josue',
						'lastname': 'Caballero'
					}
				]
			}
		},
		methods: {
			gretting (name) 
			{
				alert('Hola ' + name)
			},

			typedEnter ()
			{
				console.log('Dio enter')
			}
		},
		computed: {
			fullName () 
			{
				return this.users[1].name + ' ' + this.users[1].lastname;
			}
		},
		
		props: ['id','arg']
	}
</script>

<style>
	.test {
		background-color: #eee; 
	}
</style>