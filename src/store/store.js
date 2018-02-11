import Vue from 'vue';
import Vuex from 'vuex';

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
      0: 'Place',
      1: 'Person',
      2: 'Organization',
      3: 'Item',
      4: 'Monster',
      5: 'Quest',
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
  noteTypes: s => Object.values(s.enums.noteTypes),
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
