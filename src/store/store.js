import Vue from 'vue';
import Vuex from 'vuex';

import Place from '../assets/castle.svg';
import Person from '../assets/caesar.svg';
import Monster from '../assets/saber-toothed-cat-head.svg';
import Item from '../assets/swap-bag.svg';

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
    }],
  },
  enums: {
    noteTypes: {
      0: { name: 'Place', svg: Place },
      1: { name: 'Person', svg: Person },
      2: { name: 'Organization', svg: Person },
      3: { name: 'Item', svg: Item },
      4: { name: 'Monster', svg: Monster },
      5: { name: 'Quest', svg: Person },
    },
  },
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
//   increment (state) {
//     state.count++
//   },
//   decrement (state) {
//     state.count--
//   }
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
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
const getters = {
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
