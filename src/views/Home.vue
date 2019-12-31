<template>
  <div>
    <Header />
    <Nav />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/home/Header.vue';
import ListView from '@/components/home/ListView.vue';
import Nav from '@/components/home/Nav.vue';
export default {
  name: 'home',
  components: {
    Header,
    ListView,
    Nav
  }
}
</script>
