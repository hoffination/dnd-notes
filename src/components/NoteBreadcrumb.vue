<template>
  <div v-if="selectedNote" class="dnd-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Notes</el-breadcrumb-item>
      <el-breadcrumb-item
        v-if="previousNote"
        :to="{ path: '/selectedNote/' + previousNote._id }"
      >
        {{ previousNote.title }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ selectedNote.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['selectedNote'],
  name: 'NoteBreadcrumb',
  computed: mapGetters(['previousNote']),
};
</script>

<style>
.dnd-breadcrumb {
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 20px;
  padding-left: 20px;
  width: 100%;
  height: 100px;
  background: linear-gradient(white 25%, rgba(255, 255, 255, 0) 75%);
}
</style>
