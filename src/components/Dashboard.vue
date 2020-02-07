<template>
	<div class="container bgcolor">
		<h1>PACIENTES INGRESADOS</h1>
 		<canvas id="ingresos-habitacion"></canvas>
	 	<!--<pre>{{ $data.ingresosHabitacion }}</pre>-->
	</div>
</template>
<script>

import Chart from 'chart.js';

export default 
{
	data ()
	{
		return {
			ingresosHabitacion: [],
			habitacion_id: []
		}
	},

	methods : {

		getIngresosHabitacion ()
		{
			fetch(this.$domainServer + 'api/ingresos-habitacion', {
				method: 'GET',
				cache: 'default'
			})
			.then(res => {
				return res.json();
			})
			.then(json => {
				this.ingresosHabitacion = json;
				this.Graphic();
			})
		},

		Graphic ()
		{
			let habitacion = [];
			let pacientes = [];
			let arrayBgColor = [];
			this.habitacion_id = [];

			this.ingresosHabitacion.map( ih => {
				habitacion.push(ih.habitacion)
				pacientes.push(ih.pacientes)
				this.habitacion_id.push(ih.id)
			});

			
			for (let i = 0; i < this.habitacion_id.length; i++) 
			{
				arrayBgColor.push(this.$colorArray[i]);
			}

			let ctx = document.getElementById('ingresos-habitacion');
			window.myChart = new Chart(ctx, {
				type: 'pie',
				data: {
				    labels: habitacion,
				    datasets: [
				      {
				        data: pacientes,		
				        backgroundColor: arrayBgColor,	       
				        borderWidth: 4
				      },
				    ]
				  },
				options: {
					responsive: true,
				}
			});
		}

	},

	created ()
	{
		this.getIngresosHabitacion();

		let socket = io(this.$domainSocketServer, {'forceNew': true});	

		socket.on('habitacion_id', (habitacion_id) => { 
		   	if (window.myChart) 
		   	{
				window.myChart.clear();
				window.myChart.destroy();
			}

		   	this.getIngresosHabitacion();
		});
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