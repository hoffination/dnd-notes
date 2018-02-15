<template>
  <div class="hello">
    <h1 class="dnd-header">{{ msg }}</h1>

    <ul>
      <li v-for="(item, index) in noteTypes" :key="index">
        {{item.name}}
      </li>
    </ul>

    <el-button>Hello</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HelloWorld',
  computed: mapGetters(['noteTypes']),
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
