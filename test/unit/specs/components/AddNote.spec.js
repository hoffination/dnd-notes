import Vue from 'vue';
import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import AddNote from '@/components/AddNote.vue';

const formDefault = {
  title: '',
  type: null,
  first: '',
};
let store;
const localVue = createLocalVue();
localVue.use(Vuex);

describe('AddNote Component', () => {
  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        modalOpen: false,
      },
      getters: {
        modalOpen(state) {
          return state.modalOpen;
        },
      },
      mutations: {
        changeModalOpen(state) {
          state.modalOpen = !state.modalOpen;
        },
      },
    });
  });

  it('should initialize data correctly', () => {
    const wrapper = shallow(AddNote, {
      store,
      localVue,
    });
    expect(wrapper.vm.form).toEqual({ ...formDefault });
    expect(wrapper.vm.rules).toEqual({
      title: [
        {
          required: true,
          message: 'Please add a note title',
          trigger: 'blur',
        },
      ],
      type: [
        {
          required: true,
          message: 'Please select a note type',
          trigger: 'change',
        },
      ],
      first: [], // No rules!
    });
  });

  describe('modalOpen watch', () => {
    it('should not reset the form if the modal is open', () => {
      const wrapper = shallow(AddNote, {
        store,
        localVue,
      });
      wrapper.setData({ form: { first: 'TEST' } });
      wrapper.vm.$store.commit('changeModalOpen');
      Vue.nextTick(() => {
        expect(wrapper.vm.form.first).toEqual('TEST');
      });
    });

    it('should reset the form if the modal is closed', () => {
      const wrapper = shallow(AddNote, {
        store,
        localVue,
      });
      wrapper.vm.$store.commit('changeModalOpen');
      wrapper.setData({ form: { first: 'TEST' } });
      wrapper.vm.$store.commit('changeModalOpen');
      Vue.nextTick(() => {
        expect(wrapper.vm.form.first).toEqual('');
      });
    });
  });

  describe('submitForm', () => {
    it('should return false if the form submission is not valid', done => {
      const wrapper = shallow(AddNote, {
        store,
        localVue,
      });
      wrapper.vm.$refs['form'].validate = () => {};
      spyOn(wrapper.vm.$refs['form'], 'validate').and.callFake(callback => {
        expect(callback(false)).toEqual(false);
        done();
      });
      wrapper.vm.submitForm('form');
    });

    it('should return true and add note if the form submission is valid', done => {
      const wrapper = shallow(AddNote, {
        store,
        localVue,
      });
      wrapper.vm.$refs['form'].validate = () => {};
      spyOn(wrapper.vm, 'addNote').and.returnValue(null);
      spyOn(wrapper.vm.$refs['form'], 'validate').and.callFake(callback => {
        expect(callback(true)).toEqual(true);
        done();
      });
      wrapper.vm.submitForm('form');
    });
  });
});
