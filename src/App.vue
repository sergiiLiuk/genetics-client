<template>
  <div id="app">
    <v-app>
      <Navigation />
      <Layout />
    </v-app>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Layout from '@/components/Layout'

export default {
  name: 'App',
  components: {
    Navigation,
    Layout
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
