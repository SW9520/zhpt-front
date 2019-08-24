<template>
    <div id="index">
     <!--  <img src="./assets/logo.png" /> -->
        <router-view />
    </div>
</template>

<script>
function close() {}

export default {
    name: 'app'
};
</script>

<style>
 #index{
     overflow: hidden;
     pading:0
 }
</style>
