<template>
  <div v-if="selectedNote">
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

</style>
