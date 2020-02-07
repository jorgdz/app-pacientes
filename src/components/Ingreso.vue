<template>
	<div class="container bgcolor">
		<h1>Ingresos</h1>

		<form @submit.prevent="addIngreso">
			<div class="row">
				<div class="col-sm-8">
					<div class="form-group">
					   	<pre>{{ $data.paciente }}</pre>
					</div>
					<div class="form-group">
					    <label for="nombres">Habitaciones:</label>
					   	<select class="custom-select" v-model="selectHabitacion">
						  <option selected value="0">Seleccione una habitación</option>
						  <option v-for="habitacion in habitaciones" :value="habitacion.id">{{ habitacion.codigo }}</option>
						</select>
					</div>
				</div>
			</div>

			<button class="btn btn-primary" type="submit">Add</button>
		</form>
		<hr>
		<table class="table table-striped table-dark">
		  <thead>
		    <tr>
		      <th scope="col">#</th>
		      <th scope="col">Paciente</th>
		      <th scope="col">Habitación</th>
		      <th scope="col">Opción</th>
		    </tr>
		  </thead>
		  <tbody>
		   	<tr v-for="(ingreso, index) in ingresos">
		   		<th scope="row"> {{ index + 1 }} </th>
		   		<td> {{ ingreso.paciente.apellidos }} {{ ingreso.paciente.nombres }} </td>
		   		<td> {{ ingreso.habitacion.codigo }} </td>
		   		<td> 
					<button type="button" class="btn btn-danger" @click="deleteIngreso(ingreso)">Borrar</button>
		   		</td>
		   	</tr>
		  </tbody>
		</table>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				ingresos: [],
				habitaciones: [],
				selectHabitacion: 0,
				paciente: {}
			}
		},

		props: ['idPaciente'],
		
		methods: {
			addIngreso ()
			{
				if (this.selectHabitacion == 0) 
				{
					alert('Debe seleccionar una habitación');
				}
				else
				{
					var ingreso = {
						paciente: {
							id: this.paciente.id
						},
						habitacion: {
							id: this.selectHabitacion
						}
					}

					fetch(this.$domainServer + 'api/ingresos', {
						method: 'POST',
						body: JSON.stringify(ingreso),
						headers:{
						    'Content-Type': 'application/json'
						}
					})
					.then(res => {
						return res.json();
					})
					.catch(err => {
						console.log(err)
					})
					.then(json => {
						this.getIngresos();
						this.findPaciente();
						this.selectHabitacion = 0;
						console.log(json);
	
						let socket = io(this.$domainSocketServer, {'forceNew': true});	
						//EMITIENDO ID DE HABITACIÓN AL SOCKET SERVER
						socket.on('connect', function () {
						    socket.emit('habitacion', {
								habitacion_id : ingreso.habitacion.id
							});
						});
					});
				}
			},

			deleteIngreso (ingreso)
			{
				let socket = io(this.$domainSocketServer, {'forceNew': true});	
					
				//EMITIENDO ID DE HABITACIÓN AL SOCKET IO
				socket.on('connect', function () {
				    socket.emit('habitacion', {
						habitacion_id : ingreso.habitacion.id
					});
				});
				
				fetch(this.$domainServer + 'api/ingresos/' + ingreso.id, {
					method: 'DELETE',
					cache: 'default'
				})
				.then( res => {
					return res.json();
				})
				.catch(err => {
					alert(err.message);
				})
				.then(json => {
					this.getIngresos();
					this.findPaciente();
					alert(json.message);
				})
			},

			getHabitaciones ()
			{
				fetch(this.$domainServer + 'api/habitaciones', {
					method: 'GET',
					cache: 'default'
				})
				.then(res => {
					return res.json();
				})
				.then(json => {
					this.habitaciones = json;
				})
			},

			getIngresos ()
			{
				fetch(this.$domainServer + 'api/ingresos', {
					method: 'GET',
					cache: 'default'
				})
				.then(res => {
					return res.json();
				})
				.then(json => {
					this.ingresos = json;
				})
			},

			findPaciente ()
			{
				fetch(this.$domainServer + 'api/pacientes/' + this.idPaciente, {
					method: 'GET',
					cache: 'default'
				})
				.then(res => {
					return res.json();
				})
				.then(json => {
					this.paciente = json;
				})
			}

		},

		created () 
		{
			this.getHabitaciones();
			this.getIngresos();
			this.findPaciente();
		}
	}
</script>

<style>
	.bgcolor
	{
		background-color: floralwhite;
		padding: 1em;
		box-shadow: 2px 2px gray;
	}
</style>
