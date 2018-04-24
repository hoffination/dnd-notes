import Vue from 'vue';
import Vuex from 'vuex';

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
import demoNotes from './demo/demo-notes';
import { noteArrayToIndexMap } from '../utils/NoteTransform';

Vue.use(Vuex);

const initialState = {
  entities: {
    notes: demoNotes,
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
  },
  ui: {
    addNoteModalOpen: false,
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
};

const actions = {
  openAddNoteModal: ({ commit }) => commit('openAddNoteModal'),
  closeAddNoteModal: ({ commit }) => commit('closeAddNoteModal'),
  requestNotes: ({ commit }) => {
    graphqlClient
      .query({
        query: notesQuery,
      })
      .then(response => noteArrayToIndexMap(response.data.notes))
      .then(notes => commit('loadNotes', notes));
  },
  addNote: ({ commit }, { title, type, firstNote }) => {
    graphqlClient
      .mutate({
        mutation: addNoteMutation,
        variables: { title, type, firstNote },
      })
      .then(response => noteArrayToIndexMap(response.data.addNote))
      .then(notes => {
        commit('appendNotes', notes);
        commit('closeAddNoteModal');
      })
      .catch(err => alert(err));
  },
  addItem: ({ commit }, { _id, item }) => {
    graphqlClient
      .mutate({
        mutation: addItemMutation,
        variables: { _id, item },
      })
      .then(response => {
        let noteContainer = {};
        noteContainer[response.data.addItem._id] = response.data.addItem;
        commit('appendNotes', noteContainer);
      });
  },
};

export const getters = {
  getNote: state => id => state.entities.notes[id],
  notes: state => Object.values(state.entities.notes),
  noteTypes: state => Object.values(state.enums.noteTypes),
  modalOpen: state => state.ui.addNoteModalOpen,
};

export default new Vuex.Store({
  state: initialState,
  getters,
  actions,
  mutations,
});
