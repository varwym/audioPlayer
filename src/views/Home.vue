<template>
  <div>
    <Header />
    <ListView />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/home/Header.vue';
import ListView from '@/components/home/ListView.vue';
export default {
  name: 'home',
  components: {
    Header,
    ListView
  }
}
</script>
