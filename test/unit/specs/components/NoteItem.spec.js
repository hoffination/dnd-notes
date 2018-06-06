import Vue from 'vue';
import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import NoteItem from '@/components/NoteItem.vue';
import * as noteTransfrom from '@/utils/NoteTransform';

let store, mockSetPreviousNote;
const localVue = createLocalVue();
localVue.use(Vuex);

describe('NoteItem Component', () => {
  beforeEach(() => {
    mockSetPreviousNote = jasmine.createSpy('setPreviousNote');
    store = new Vuex.Store({
      actions: {
        setPreviousNote: ({ commit }, id) => mockSetPreviousNote(id),
      },
    });
  });

  it('should update router when row is clicked', () => {
    const wrapper = shallow(NoteItem, {
      store,
      localVue,
      computed: { noteItems: 5 },
    });
    wrapper.vm.$route = { params: { id: 1 } };
    wrapper.vm.$router = { push: () => {} };
    spyOn(wrapper.vm.$router, 'push');
    wrapper.vm.goto(1);
    expect(mockSetPreviousNote).toHaveBeenCalledTimes(1);
    expect(mockSetPreviousNote).toHaveBeenCalledWith(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/selectedNote/1');
  });
});
