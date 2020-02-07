<template>
	<div class="container bgcolor">
		<h1>Pacientes</h1>

		<form @submit.prevent="addPaciente">
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
					    <label for="nombres">Nombres:</label>
					    <input type="text" class="form-control" v-model="newPaciente.nombres" id="nombres" placeholder="Nombres del paciente">
					</div>

					<div class="form-group">
					    <label for="nombres">Apellidos:</label>
					    <input type="text" class="form-control" v-model="newPaciente.apellidos" id="apellidos" placeholder="Apellidos del paciente">
					</div>
				</div>
				<div class="col-sm-6">
					<div class="form-group">
					    <label for="cedula">Cédula:</label>
					    <input type="text" class="form-control" v-model="newPaciente.cedula" id="cedula" placeholder="Cédula del paciente">
					</div>

					<div class="form-group">
					    <label for="fecha_nac">Fecha de nacimiento:</label>
					    <input type="date" class="form-control" v-model="newPaciente.fecha_nac" id="fecha_nac" placeholder="Fecha de nacimiento del paciente">
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
		      <th scope="col">Cédula</th>
		      <th scope="col">Nombres</th>
		      <th scope="col">Apellidos</th>
		      <th scope="col">Fecha de nacimiento</th>
		      <th scope="col">Acciones</th>
		    </tr>
		  </thead>
		  <tbody>
		    <tr v-for="(paciente, index) in pacientes">
		      <th scope="row">{{ index + 1 }}</th>
		      <td>{{ paciente.cedula }}</td>
		      <td>{{ paciente.nombres }}</td>
		      <td>{{ paciente.apellidos }}</td>
		      <td>{{ paciente.fecha_nac }}</td>
		      <td>
		      	<button type="button" class="btn btn-danger" @click="deletePaciente(paciente)">Borrar</button>
								
	      		<router-link :to="`/ingresar/${paciente.id}`" class="btn btn-info">Ingresar</router-link>
				<router-view></router-view>
				
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
				pacientes: [],
				newPaciente: {}
			}
		},

		methods: {
			addPaciente ()
			{
				this.newPaciente.contacted = true
				this.pacientes.push(this.newPaciente);
				this.newPaciente = {}
			},

			deletePaciente (paciente)
			{
				this.pacientes.splice(this.pacientes.indexOf(paciente), 1);
			}
		},

		created() {
			fetch(this.$domainServer + 'api/pacientes', {
				method: 'GET',
				cache: 'default'
			})
				.then( resp => {
					return resp.json();
				})
				.then(json => {
					this.pacientes = json;
				})
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
