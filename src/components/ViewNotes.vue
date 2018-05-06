<template>
  <div>
    <!-- Dialog -->
    <el-dialog
      :visible.sync="$store.state.ui.addNoteModalOpen"
      :fullscreen="true"
    >
      <h1 class="dnd-header">Create a Note</h1>
      <AddNote class="addNoteForm"></AddNote>
    </el-dialog>

    <!-- Main view contemt -->
    <h1 class="dnd-header">{{ msg }}</h1>
    <el-button class="dnd-note-button" @click="openAddNoteModal()">Add Note</el-button>
    <div class="dnd-sort-type">
      <el-select
        :size="'mini'"
        :value="selectedSortValue"
        @change="setSortType($event)"
      >
        <el-option
          v-for="(value, key) in sortValues"
          :key="key"
          :value="key"
          :label="value"
        ></el-option>
      </el-select>
    </div>
    <NoteList class="list"></NoteList>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ViewNotes',
  computed: mapGetters(['sortValues', 'selectedSortValue']),
  methods: mapActions(['openAddNoteModal', 'setSortType']),
  data() {
    return {
      msg: 'Notes',
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
  padding-top: 30px;
  margin-left: auto;
  margin-right: auto;
}
.dnd-note-button {
  position: fixed;
  top: 10px;
  z-index: 1;
}
.dnd-sort-type {
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  display: flex;
}
.dnd-sort-type .el-select {
  margin-left: auto;
}
</style>
