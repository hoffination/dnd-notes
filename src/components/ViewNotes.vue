<template>
  <div>
    <!-- Dialog -->
    <el-dialog
      title="Create a Note"
      :visible.sync="$store.state.ui.addNoteModalOpen"
      center
    >
      <AddNote class="addNoteForm"></AddNote>
    </el-dialog>

    <!-- Main view contemt -->
    <h1 class="dnd-header">{{ msg }}</h1>
    <el-button @click="openAddNoteModal()">Add Note</el-button>
    <NoteList class="list"></NoteList>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ViewNotes',
  methods: mapActions([
    'openAddNoteModal',
  ]),
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
.addNoteForm {
  max-width: 600px;
}
</style>
