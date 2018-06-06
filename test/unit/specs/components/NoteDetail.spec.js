import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import { shallow, createLocalVue } from 'vue-test-utils';
import NoteDetail from '@/components/routes/NoteDetail.vue';

let store, mockGetNote, mockAddItem;
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Router);
const router = new Router({
  routes: [{ path: '/:id', name: 'noteDetail' }],
});

describe('NoteDetail Component', () => {
  beforeEach(() => {
    mockGetNote = jasmine.createSpy('getNote');
    mockAddItem = jasmine
      .createSpy('addNote')
      .and.callFake(() => Promise.resolve());
    store = new Vuex.Store({
      actions: {
        addItem: (state, { _id, item }) => {
          return mockAddItem({ _id, item });
        },
      },
      getters: {
        getNote: state => {
          return mockGetNote;
        },
      },
    });
  });

  it('should initialize with computed properties', () => {
    const wrapper = shallow(NoteDetail, {
      store,
      localVue,
      router,
    });
    expect(wrapper.vm.noteToAdd).toEqual('');
  });

  it('should call addItem and reset noteToAdd when addItemToNote is called', done => {
    router.push({ name: 'noteDetail', params: { id: 1 } });
    const wrapper = shallow(NoteDetail, {
      store,
      localVue,
      router,
    });
    wrapper.vm.noteToAdd = 'ABC';
    wrapper.vm.addItemToNote({}).then(() => {
      expect(wrapper.vm.noteToAdd).toEqual('');
      expect(mockAddItem).toHaveBeenCalledTimes(1);
      expect(mockAddItem).toHaveBeenCalledWith({ _id: 1, item: 'ABC' });
      done();
    });
  });
});
