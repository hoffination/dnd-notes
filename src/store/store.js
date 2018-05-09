import Vue from 'vue';
import Vuex from 'vuex';
import compareAsc from 'date-fns/compare_asc';
import { remove } from 'ramda';

import Place from '../assets/castle.svg';
import Person from '../assets/caesar.svg';
import Monster from '../assets/saber-toothed-cat-head.svg';
import Item from '../assets/swap-bag.svg';
import Organization from '../assets/throne-king.svg';
import Quest from '../assets/stabbed-note.svg';
import graphqlClient from '../utils/graphql';
import notesQuery from './queries/notes';
import addNoteMutation from './queries/addNote';
import addItemMutation from './queries/addItem';
import { dateStrParse, noteArrayToIndexMap } from '../utils/NoteTransform';
import { wrapPromiseWithLoadStatus } from '../utils/loading';

Vue.use(Vuex);

const initialState = {
  entities: {
    notes: {},
  },
  enums: {
    noteTypes: {
      0: { id: 0, name: 'Place', svg: Place },
      1: { id: 1, name: 'Person', svg: Person },
      2: { id: 2, name: 'Organization', svg: Organization },
      3: { id: 3, name: 'Item', svg: Item },
      4: { id: 4, name: 'Monster', svg: Monster },
      5: { id: 5, name: 'Quest', svg: Quest },
    },
    api: {
      getNotes: 'GET_NOTES',
      addNote: 'ADD_NOTE',
      addItem: 'ADD_ITEM',
    },
    sortValues: {
      createdDate: 'Newest',
      updatedDate: 'Last Updated',
    },
  },
  loading: [],
  ui: {
    addNoteModalOpen: false,
    previousNote: null,
    notesSortConfig: {
      sortValue: 'createdDate',
    },
  },
};

const mutations = {
  openAddNoteModal(state) {
    state.ui.addNoteModalOpen = true;
  },
  closeAddNoteModal(state) {
    state.ui.addNoteModalOpen = false;
  },
  loadNotes(state, notes) {
    state.entities.notes = notes;
  },
  appendNotes(state, notes) {
    state.entities.notes = {
      ...state.entities.notes,
      ...notes,
    };
  },
  setPreviousNote(state, noteId) {
    state.ui.previousNote = noteId;
  },
  resetPreviousNote(state) {
    state.ui.previousNote = null;
  },
  startLoading(state, api) {
    state.loading = [...state.loading, api];
  },
  endLoading(state, api) {
    state.loading = remove(api, 1, state.loading);
  },
  setSortType(state, sortType) {
    state.ui.notesSortConfig.sortValue = sortType;
  },
};

const actions = {
  openAddNoteModal: ({ commit }) => commit('openAddNoteModal'),
  closeAddNoteModal: ({ commit }) => commit('closeAddNoteModal'),
  requestNotes: ({ commit }) => {
    return wrapPromiseWithLoadStatus(
      commit,
      initialState.enums.api.getNotes,
      graphqlClient
        .query({
          query: notesQuery,
        })
        .then(response => noteArrayToIndexMap(response.data.notes))
        .then(notes => {
          commit('loadNotes', notes);
          return notes;
        }),
    );
  },
  addNote: ({ commit }, { title, type, firstItem }) => {
    return wrapPromiseWithLoadStatus(
      commit,
      initialState.enums.api.addNote,
      graphqlClient
        .mutate({
          mutation: addNoteMutation,
          variables: { title, type, firstItem },
        })
        .then(response => noteArrayToIndexMap(response.data.addNote))
        .then(notes => {
          commit('appendNotes', notes);
          commit('closeAddNoteModal');
          return notes;
        }),
    );
  },
  addItem: ({ commit }, { _id, item }) => {
    return wrapPromiseWithLoadStatus(
      commit,
      initialState.enums.api.addItem,
      graphqlClient
        .mutate({
          mutation: addItemMutation,
          variables: { _id, item },
        })
        .then(response => {
          let noteContainer = {};
          response.data.addItem.createdDate = dateStrParse(
            response.data.addItem.created,
          );
          noteContainer[response.data.addItem._id] = response.data.addItem;
          commit('appendNotes', noteContainer);
          return noteContainer;
        }),
    );
  },
  setPreviousNote: ({ commit }, noteId) => commit('setPreviousNote', noteId),
  resetPreviousNote: ({ commit }) => commit('resetPreviousNote'),
  setSortType: ({ commit }, sortType) => commit('setSortType', sortType),
};

export const getters = {
  getNote: state => id => state.entities.notes[id],
  notes: state =>
    Object.values(state.entities.notes).sort((a, b) =>
      compareAsc(
        b[state.ui.notesSortConfig.sortValue],
        a[state.ui.notesSortConfig.sortValue],
      ),
    ),
  notesLoading: state => state.loading.indexOf(state.enums.api.getNotes) !== -1,
  addItemLoading: state =>
    state.loading.indexOf(state.enums.api.addItem) !== -1,
  addNoteLoading: state =>
    state.loading.indexOf(state.enums.api.addNote) !== -1,
  noteTypes: state => Object.values(state.enums.noteTypes),
  sortValues: state => state.enums.sortValues,
  selectedSortValue: state =>
    state.enums.sortValues[state.ui.notesSortConfig.sortValue],
  modalOpen: state => state.ui.addNoteModalOpen,
  previousNote: state =>
    state.ui.previousNote ? state.entities.notes[state.ui.previousNote] : null,
};

export default new Vuex.Store({
  state: initialState,
  getters,
  actions,
  mutations,
});
