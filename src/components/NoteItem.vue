<template>
  <p>
    <span v-for="(item, index) in aTest" :key="index">
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
    // TODO: pull out into a util and test
    aTest: (noteItem) => {
      const words = noteItem.item.item.split(' ');
      let position = 0;
      let last = 0;
      const results = [];
      noteItem.item.links.forEach((link) => {
        if (position === 0 && link.startWord !== 0) {
          results.push({
            item: take(link.startWord, words).join(' '),
          });
          position = link.startWord;
          last = link.startWord;
        }
        if (link.startWord > last) {
          results.push({
            item: take(link.startWord - last, drop(last, words)).join(' '),
          });
          position = link.startWord;
          last = link.startWord;
        }
        results.push({
          toId: link.toId,
          item: take(link.endWord - link.startWord, drop(link.startWord, words)).join(' '),
        });
        position = link.endWord;
        last = link.endWord;
      });
      if (last !== 0 && last !== words.length) {
        results.push({
          item: take(words.length - position, drop(position, words)).join(' '),
        });
      }
      if (last === 0 && words.length > 0) {
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
        this.selectNote(id);
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
