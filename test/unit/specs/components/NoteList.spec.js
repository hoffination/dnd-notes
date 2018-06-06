import Vue from 'vue';
import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import NoteList from '@/components/NoteList.vue';

let store;
const localVue = createLocalVue();
localVue.use(Vuex);

describe('NoteList Component', () => {
  beforeEach(() => {
    store = new Vuex.Store({});
  });

  it('should update router when row is clicked', () => {
    const wrapper = shallow(NoteList, {
      store,
      localVue,
    });
    wrapper.vm.$router = { push: () => {} };
    spyOn(wrapper.vm.$router, 'push');
    wrapper.vm.clickRow({ _id: 1 });
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/selectedNote/1');
  });
});
