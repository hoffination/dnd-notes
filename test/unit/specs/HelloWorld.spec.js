import Vue from 'vue';
import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
// import HelloWorld from '@/components/HelloWorld';

const localVue = createLocalVue();
localVue.use(Vuex);

// describe('HelloWorld.vue', () => {
//   let store;
//   let getters;

//   beforeEach(() => {
//     getters = {
//       noteTypes: () => ['a', 'b'],
//     };
//     store = new Vuex.Store({
//       getters,
//     });
//   });

//   it('should render correct contents', () => {
//     const wrapper = shallow(HelloWorld, {
//       store,
//       localVue,
//     });
//     expect(wrapper.find('.hello h1').text()).toEqual(
//       'Welcome to Your Vue.js App',
//     );
//   });
// });
