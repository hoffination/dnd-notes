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
import { take, drop } from 'ramda';
import { mapActions } from 'vuex';

export default {
  props: ['item'],
  name: 'NoteItem',
  computed: {
    noteItems: (noteItem) => {
      const words = noteItem.item.item.split(' ');
      let position = 0;
      const results = [];
      noteItem.item.links.forEach((link) => {
        if (position === 0 && link.startWord !== 0) {
          results.push({
            item: take(link.startWord, words).join(' '),
          });
          position = link.startWord;
        }
        if (link.startWord > position) {
          results.push({
            item: take(link.startWord - position, drop(position, words)).join(' '),
          });
          position = link.startWord;
        }
        results.push({
          toId: link.toId,
          item: take(link.endWord - link.startWord, drop(link.startWord, words)).join(' '),
        });
        position = link.endWord;
      });
      if (position !== 0 && position !== words.length) {
        results.push({
          item: take(words.length - position, drop(position, words)).join(' '),
        });
      }
      if (position === 0 && words.length > 0) {
        results.push({
          item: words.join(' '),
        });
      }
      return results;
    },
  },
  methods: Object.assign(
    mapActions([
      'selectNote',
    ]), {
      goto(id) {
        this.$router.push(`/selectedNote/${id}`);
      },
    },
  ),
};
</script>

<style>
.linkTag {
  margin-right: 5px;
}
</style>
