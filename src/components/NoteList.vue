<template>
  <el-table
    :data="notes"
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
    <el-table-column width="60">
      <template slot-scope="scope">
        <el-tag>{{scope.row.items.length}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'NoteList',
  computed: mapGetters([
    'notes',
  ]),
  methods: Object.assign(
    mapActions([
      'selectNote',
    ]), {
      clickRow(e) {
        this.selectNote(e.id);
        this.$router.push('/selectedNote');
      },
    },
  ),
};
</script>

<style>

</style>
