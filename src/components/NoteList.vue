<template>
  <div>
    <el-table
      :data="$store.state.entities.notes"
      @row-click="clickRow"
    >
      <el-table-column>
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
      <el-table-column label="Type">
        <template slot-scope="scope">
          <p>{{$store.state.enums.noteTypes[scope.row.type].name}}</p>
        </template>
      </el-table-column>
      <el-table-column label="Observations">
        <template slot-scope="scope">
          <p>{{scope.row.items.length}}</p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'NoteList',
  methods: {
    clickRow(e) {
      console.log('Row Clicked: ', e, e.id);
    },
  },
};
</script>

<style>

</style>
