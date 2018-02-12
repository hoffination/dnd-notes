<template>
  <div>
    <h1 class="dnd-header">
      <simple-svg
        :filepath="$store.state.enums.noteTypes[selectedNote.type].svg"
        :width="'40px'"
        :height="'40px'"
        :stroke="'transparent'"
      >
      </simple-svg>
      {{ selectedNote.title }}
    </h1>
    <h3 class="dnd-header" style="padding-top: 0; margin-top: -10px;">Author: You</h3>

    <br/>

    <p v-for="(note, index) in selectedNote.items" :key="index">
      {{ note.item }}
    </p>

    <form class="add-note">
      <el-row >
        <el-col :span="20">
          <el-input></el-input>
        </el-col>
        <el-col :span="4">
          <el-button>Add</el-button>
        </el-col>
      </el-row>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NoteDetail',
  computed: mapGetters([
    'selectedNote',
  ]),
  data() {
    return {
      addInput: '',
    };
  },
};
</script>

<style scoped>
p {
  text-align: center;
}
.add-note {
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
</style>
