<template>
  <div>
    <el-input
      class="dnd-auto-input"
      :placeholder="placeholder"
      v-bind:value="value"
      v-on:input="updateValue('input', $event)"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
    >
    </el-input>
    <h5 class="dnd-auto-tip">Use @ to search</h5>
    <el-card class="dnd-auto-popover">
      <el-row
        v-for="note of matchingNotes"
        :key="note._id"
      >
        <div @click="replaceTextWithSelection(note.title)">
          <el-col :span="4">
            <simple-svg
              :filepath="$store.state.enums.noteTypes[note.type].svg"
              :width="'40px'"
              :height="'40px'"
              :stroke="'transparent'"
            >
            </simple-svg>
          </el-col>
          <el-col :span="20">{{note.title}}</el-col>
        </div>
      </el-row>
      <span v-if="matchingNotes.length === 0">No notes with the title "{{inputQuery}}"</span>
    </el-card>
  </div>
</template>

<script>
import { getQueryFromInput, getLowestPopoverScrollPosition, replaceQueryWithSelection } from '@/utils/autocomplete';
import { mapGetters } from 'vuex';

export default {
  name: 'AutocompleteInput',
  props: ['value', 'placeholder'],
  data() {
    return {
      inputValue: '',
      focused: false,
    };
  },
  computed: {
    ...mapGetters(['findMatchingNoteTitles']),
    inputQuery: function() {
      return getQueryFromInput(this.inputValue);
    },
    showAutocomplete: function() {
      return this.inputQuery && this.inputQuery.length > 0 && this.focused;
    },
    matchingNotes: function() {
      return this.findMatchingNoteTitles(this.inputQuery);
    },
  },
  watch: {
    inputValue: function() {
      this.handleScroll();
    },
  },
  methods: {
    setFocus: function(value) {
      setTimeout(() => {
        this.focused = value;
        this.handleScroll();
      }, 100);
    },
    updateValue: function(type, value) {
      this.$emit(type, value);
      this.inputValue = value;
    },
    replaceTextWithSelection: function(selected) {
      this.updateValue('input', replaceQueryWithSelection(this.inputValue, selected));
    },
    handleScroll: function() {
      window.requestAnimationFrame(() => {
        const popover = document.getElementsByClassName('dnd-auto-popover')[0];
        if (this.showAutocomplete) {
          popover.style.display = '';
          this.calculateDropdownPosition();
        } else {
          popover.style.display = 'none';
        }
      });
    },
    calculateDropdownPosition() {
      window.requestAnimationFrame(() => {
        const scrollHeight = window.scrollY;
        const popover = document.getElementsByClassName('dnd-auto-popover')[0];
        const popoverHeight = popover.getBoundingClientRect().height;
        const element = document.getElementsByClassName('dnd-auto-input')[0];
        const elementRect = element.getClientRects()[0];

        const bottomOfHangingPopover = getLowestPopoverScrollPosition({
          elementTop: elementRect.y,
          elementHeight: elementRect.height,
          popoverHeight,
          scrollHeight,
        });
        if (bottomOfHangingPopover > window.innerHeight) {
          popover.style.top = `${elementRect.y - popoverHeight}px`;
        } else {
          popover.style.top = `${elementRect.y + elementRect.height}px`;
        }
        popover.style.width = `${elementRect.width}px`;
      });
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scope>
.dnd-auto-popover {
  max-height: 200px;
  position: fixed;
  z-index: 2120;
  overflow-y: auto;
}
.dnd-auto-tip {
  margin: 0;
  text-align: left;
  margin-top: -10px;
  padding-left: 10px;
}
</style>
