import Vue from 'vue';
import Vuex from 'vuex';

import Place from '../assets/castle.svg';
import Person from '../assets/caesar.svg';
import Monster from '../assets/saber-toothed-cat-head.svg';
import Item from '../assets/swap-bag.svg';
import Organization from '../assets/throne-king.svg';
import Quest from '../assets/stabbed-note.svg';

Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
const initialState = {
  // count: 0
  entities: {
    notes: {
      0: {
        title: 'Neverwinter',
        type: 0,
        id: 0,
        items: [{
          item: 'A town in the Sword Coast region',
          links: [],
          tags: ['a', 'town', 'in', 'the', 'sword', 'coast', 'region'],
          order: 0,
        }],
      },
      1: {
        title: 'Bijorn Ironheart',
        type: 1,
        id: 1,
        items: [{
          item: 'Lives in Neverwinter',
          links: [{
            toId: 0,
            startWord: 2,
            endWord: 3,
          }],
          tags: ['lives', 'in', 'neverwinter'],
          order: 0,
        }],
      },
      2: {
        title: 'Lords Alliance',
        type: 2,
        id: 2,
        items: [{
          item: 'A group of concerned nobles who have combined resources to combat threats to the Sword Coast',
          links: [],
          tags: [],
          order: 0,
        }, {
          item: 'Northern-most headquarter is located in Neverwinter',
          links: [{
            toId: 0,
            startWord: 5,
            endWord: 6,
          }],
          tags: [],
          order: 1,
        }],
      },
      3: {
        title: 'Deliver goods to Phandalin',
        type: 5,
        id: 3,
        items: [{
          item: 'Quest given by Bijorn Ironheart in Neverwinter',
          links: [{
            toId: 1,
            startWord: 3,
            endWord: 5,
          }, {
            toId: 0,
            startWord: 6,
            endWord: 7,
          }],
          tags: [],
          order: 0,
        }],
      },
      4: {
        title: 'Goblins',
        type: 4,
        id: 4,
        items: [{
          item: 'A menace of the forests of the Sword Coast region',
          links: [],
          tags: [],
          order: 0,
        }],
      },
      5: {
        title: 'Delivery to Phandalin',
        type: 3,
        id: 5,
        items: [{
          item: 'Loaded on the back of a wagon for delivery to Phandalin',
          links: [],
          tags: [],
          order: 0,
        }, {
          item: 'From Bijorn Ironclad to Lydia Moonbutt',
          links: [{
            toId: 1,
            startWord: 1,
            endWord: 3,
          }],
          tags: [],
          order: 0,
        }],
      },
    },
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
    selectedNote: null,
    addNoteModalOpen: false,
  },
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  selectNote(state, noteId) { state.ui.selectedNote = noteId; },
  openAddNoteModal(state) { state.ui.addNoteModalOpen = true; },
  closeAddNoteModal(state) { state.ui.addNoteModalOpen = false; },
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  selectNote: ({ commit }, noteId) => commit('selectNote', noteId),
  openAddNoteModal: ({ commit }) => commit('openAddNoteModal'),
  closeAddNoteModal: ({ commit }) => commit('closeAddNoteModal'),
  // incrementAsync ({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       commit('increment')
  //       resolve()
  //     }, 1000)
  //   })
  // }
};

// getters are functions
export const getters = {
  notes: state => Object.values(state.entities.notes),
  noteTypes: state => Object.values(state.enums.noteTypes),
  selectedNote: state => state.entities.notes[state.ui.selectedNote],
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state: initialState,
  getters,
  actions,
  mutations,
});
