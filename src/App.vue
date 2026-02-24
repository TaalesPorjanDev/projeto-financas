<template>
  <div id="app-layout">
  <NavBar :logo="logo_src" :alt="app_name" />
  <main class="page-content">
    <router-view></router-view>
  </main>
  
  <Footer />
  </div>
</template>

<script setup>
const logo_src = "src/assets/logo.png";
const app_name = 'Finanças Pessoais';
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

#app-layout {
  min-height: 100vh;       /* ocupa a tela toda */
  display: flex;
  flex-direction: column;  /* empilha navbar, conteúdo, footer */
}

.page-content {
  flex: 1;                 /* conteúdo cresce e empurra o footer */
}

.main-container {
  margin: 50px;
  min-height: 250px;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
</style>
