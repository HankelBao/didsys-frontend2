<template>
  <div id="app">
    <Nav />
    <b-container>
      <router-view></router-view>
    </b-container>
    <Footer />
  </div>
</template>

<script>
  import Nav from "./components/Nav.vue";
  import Footer from "./components/Footer.vue";

  export default {
    name: "app",
    components: {
      Nav,
      Footer
    }
  };
</script>

<style>
.bg-primary {
  background-color: #a51c30 !important;
}

.btn-primary {
  color: #fff !important;
  background-color: #a51c30 !important;
  border-color: #a51c30 !important; }
  .btn-primary:hover {
    color: #fff !important;
    background-color: #791523 !important;
    border-color: #711321 !important; }
  .btn-primary:focus, .btn-primary.focus {
    box-shadow: 0 0 0 2px rgba(165, 28, 48, 0.5) !important; 
    box-shadow: none !important; }
  .btn-primary.disabled, .btn-primary:disabled {
    background-color: #a51c30 !important;
    border-color: #a51c30 !important; }
  .btn-primary:active, .btn-primary.active,
  .show > .btn-primary.dropdown-toggle {
    color: #fff !important;
    background-color: #791523 !important;
    background-image: none !important;
    border-color: #711321 !important; }

input:hover {
  border-color: #A51C30;
}
input:focus{
  border-color: #A51C30 !important;
  box-shadow: none !important; 
  outline: 0 none !important;
}
select:hover, select:focus{
  border-color: #A51C30 !important;
}
select:focus {
  box-shadow: none !important;
}
</style>
