<template>
	<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <!-- Logo -->
      <router-link class="navbar-brand" to="/">
        Logo
      </router-link>
      
      <!-- Navegación -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            Inicio
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/pacientes">
            Pacientes
          </router-link>
        </li>
        <!--<li class="nav-item">
          <router-link class="nav-link" to="/test/3/argumentos">
            Test
          </router-link>
        </li>-->
      </ul>
    </nav>
</template>

<script>
export default {
	
}
</script>