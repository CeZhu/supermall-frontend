<template>
  <div id="app">
    <keep-alive exclude="Detail"><router-view></router-view></keep-alive>
    <main-bar></main-bar>
  </div>
</template>

<script>
import MainBar from 'components/content/MainBar'
export default {
  name: 'App',
  components: {
    MainBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
