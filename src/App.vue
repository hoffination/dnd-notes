<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import NoteDetail from './components/NoteDetail';
import ViewNotes from './components/ViewNotes';

export default {
  methods: mapActions(['requestNotes', 'resetPreviousNote']),
  name: 'App',
  created() {
    this.requestNotes();
  },
  watch: {
    $route(to, from) {
      if (to.name === ViewNotes.name || (to.name === NoteDetail.name && to.params.id === this.$store.state.ui.previousNote)) {
        this.resetPreviousNote();
      }
    },
  },
};
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.dnd-header {
  font-weight: normal;
  text-align: center;
}
</style>
