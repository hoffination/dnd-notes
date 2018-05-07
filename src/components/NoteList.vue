<template>
  <el-table
    v-loading="notesLoading"
    :data="notes"
    :empty-text="'No notes to display.'"
    @row-click="clickRow"
  >
    <el-table-column width="60">
      <template slot-scope="scope">
        <simple-svg
          :filepath="$store.state.enums.noteTypes[scope.row.type].svg"
          :width="'40px'"
          :height="'40px'"
          :stroke="'transparent'"
        >
        </simple-svg>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="Title"></el-table-column>
    <el-table-column width="60" label="Count" :align="'center'">
      <template slot-scope="scope">
        <el-tag>{{scope.row.items.length}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NoteList',
  computed: mapGetters(['notes', 'notesLoading']),
  methods: {
    clickRow(event) {
      this.$router.push(`/selectedNote/${event._id}`);
    },
  },
};
</script>

<style>

</style>
