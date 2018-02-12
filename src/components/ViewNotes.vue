<template>
  <div>
    <h1 class="dnd-header">{{ msg }}</h1>
    <el-button>Add Note</el-button>
    <NoteList class="list"></NoteList>
  </div>
</template>

<script>
export default {
  name: 'ViewNotes',
  data() {
    return {
      msg: 'Your notes',
    };
  },
};
</script>

<style scoped>
.list {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
</style>
