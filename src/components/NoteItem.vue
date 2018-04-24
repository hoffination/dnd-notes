<template>
  <p>
    <span v-for="(item, index) in noteItems" :key="index">
      <el-button
        class="linkTag"
        v-if="item.toId !== undefined"
        size="small"
        @click="goto(item.toId)"
      >
        {{item.item}}
      </el-button>
      <span v-else>{{item.item + ' '}}</span>
    </span>
  </p>
</template>

<script>
import { mapActions } from 'vuex';
import { separateLinksInItem } from '../utils/NoteTransform';

export default {
  props: ['item'],
  name: 'NoteItem',
  computed: {
    noteItems: separateLinksInItem,
  },
  methods: Object.assign(mapActions(['selectNote']), {
    goto(id) {
      this.$router.push(`/selectedNote/${id}`);
    },
  }),
};
</script>

<style>
.linkTag {
  margin-right: 5px;
}
</style>
