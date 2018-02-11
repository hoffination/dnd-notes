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
const state = {
  // count: 0
  entities: {
    notes: [{
      title: 'Neverwinter',
      type: 0,
      id: 0,
      items: [{
        item: 'A town in the Sword Coast region',
        links: [],
        tags: ['a', 'town', 'in', 'the', 'sword', 'coast', 'region'],
        order: 0,
      }],
    }, {
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
    }, {
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
    }, {
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
    }, {
      title: 'Goblins',
      type: 4,
      id: 4,
      items: [{
        item: 'A menace of the forests of the Sword Coast region',
        links: [],
        tags: [],
        order: 0,
      }],
    }, {
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
    }],
  },
  enums: {
    noteTypes: {
      0: { name: 'Place', svg: Place },
      1: { name: 'Person', svg: Person },
      2: { name: 'Organization', svg: Organization },
      3: { name: 'Item', svg: Item },
      4: { name: 'Monster', svg: Monster },
      5: { name: 'Quest', svg: Quest },
    },
  },
  ui: {
    selectedNote: null,
  },
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  selectNote(s, id) {
    state.ui.selectedNote = id;
  },
//   increment (state) {
//     state.count++
//   },
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  selectNote: ({ commit }, id) => commit('selectNote', id),
  // increment: ({ commit }) => commit('increment'),
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
  noteTypes: s => Object.values(s.enums.noteTypes).map(value => value.name),
  // evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
