<template>
  <div v-if="selectedNote">
    <NoteBreadcrumb :selectedNote="selectedNote"></NoteBreadcrumb>

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
    <h3 class="dnd-header">Author: You</h3>

    <NoteItem
      v-for="(note, index) in selectedNote.items"
      :key="index"
      :item="note"
    >
    </NoteItem>

    <el-form class="dnd-add-item" @submit.prevent.native>
      <el-row>
        <el-col :span="20">
          <el-form-item prop="noteToAdd">
            <AutocompleteInput v-model="noteToAdd" placeholder="Item to add"></AutocompleteInput>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button
            v-loading="addItemLoading"
            :disabled="addItemLoading"
            native-type="submit"
            @click="addItemToNote()"
          >
            Add
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NoteDetail',
  methods: {
    ...mapActions(['addItem']),
    addItemToNote(event) {
      return this.addItem({ _id: this.$route.params.id, item: this.noteToAdd }).then(() => {
        this.noteToAdd = '';
      });
    },
  },
  computed: {
    ...mapGetters(['getNote', 'addItemLoading']),
    selectedNote(component) {
      return component.getNote(component.$route.params.id);
    },
  },
  data() {
    return {
      noteToAdd: '',
    };
  },
};
</script>

<style scoped>
p {
  text-align: center;
}
.dnd-add-item {
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
h3.dnd-header {
  padding-top: 0;
  margin-top: -10px;
  margin-bottom: 40px;
}
.simple-svg-wrapper {
  height: 48px;
}
</style>
