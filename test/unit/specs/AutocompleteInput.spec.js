import Vue from 'vue';
import Vuex from 'vuex';
import { shallow, createLocalVue } from 'vue-test-utils';
import AutocompleteInput from '@/components/AutocompleteInput.vue';
import * as autocompleteUtils from '@/utils/autocomplete';

let store, mockFindMatchingNoteTitles;
const localVue = createLocalVue();
localVue.use(Vuex);

describe('AutocompleteInput Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockFindMatchingNoteTitles = jasmine
      .createSpy('findMatchingNoteTitles')
      .and.returnValue([]);
    store = new Vuex.Store({
      getters: {
        findMatchingNoteTitles(state) {
          return mockFindMatchingNoteTitles;
        },
      },
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize data and setup listeners', () => {
    spyOn(window, 'addEventListener');
    const wrapper = shallow(AutocompleteInput, {
      store,
      localVue,
      methods: { updatePopoverDisplay: () => {} },
    });
    expect(wrapper.vm.inputValue).toEqual('');
    expect(wrapper.vm.focused).toEqual(false);
    expect(window.addEventListener).toHaveBeenCalledWith(
      'scroll',
      wrapper.vm.handleScroll,
    );
  });

  it('should remove listeners when destroyed', () => {
    spyOn(window, 'removeEventListener');
    const wrapper = shallow(AutocompleteInput, {
      store,
      localVue,
      methods: { updatePopoverDisplay: () => {} },
    });
    wrapper.destroy();
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      wrapper.vm.handleScroll,
    );
  });

  describe('computed values', () => {
    it('should compute imputQuery from util based on inputValue', () => {
      spyOn(autocompleteUtils, 'getQueryFromInput').and.returnValue(['1']);
      const wrapper = shallow(AutocompleteInput, {
        store,
        localVue,
        methods: { updatePopoverDisplay: () => {} },
      });
      expect(autocompleteUtils.getQueryFromInput).toHaveBeenCalledTimes(1);
      wrapper.vm.inputValue = 'abc';
      Vue.nextTick(() => {
        expect(autocompleteUtils.getQueryFromInput).toHaveBeenCalledWith('abc');
        expect(wrapper.vm.inputQuery).toEqual(['1']);
      });
    });

    it('should calculate to hide autocomplete when inputQuery empty', done => {
      spyOn(autocompleteUtils, 'getQueryFromInput').and.returnValue([]);
      const wrapper = shallow(AutocompleteInput, {
        store,
        localVue,
        methods: { updatePopoverDisplay: () => {} },
      });
      wrapper.vm.inputValue = 'abc';
      wrapper.vm.focused = true;
      Vue.nextTick(() => {
        expect(wrapper.vm.showAutocomplete).toEqual(false);
        done();
      });
    });

    it('should calculate to hide autocomplete when not focused', done => {
      spyOn(autocompleteUtils, 'getQueryFromInput').and.returnValue(['1']);
      const wrapper = shallow(AutocompleteInput, {
        store,
        localVue,
        methods: { updatePopoverDisplay: () => {} },
      });
      wrapper.vm.inputValue = 'abc';
      Vue.nextTick(() => {
        expect(wrapper.vm.showAutocomplete).toEqual(false);
        done();
      });
    });

    it('should calculate to show autocomplete when inputQuery and focused', done => {
      spyOn(autocompleteUtils, 'getQueryFromInput').and.returnValue(['1']);
      const wrapper = shallow(AutocompleteInput, {
        store,
        localVue,
        methods: { updatePopoverDisplay: () => {} },
      });
      wrapper.vm.focused = true;
      Vue.nextTick(() => {
        expect(wrapper.vm.showAutocomplete).toEqual(true);
        done();
      });
    });

    it('should call findMatchingNoteTitles to calculate matchingNotes', done => {
      spyOn(autocompleteUtils, 'getQueryFromInput').and.returnValue(['1']);
      const wrapper = shallow(AutocompleteInput, {
        store,
        localVue,
        methods: { updatePopoverDisplay: () => {} },
      });
      wrapper.vm.inputValue = 'abc';
      Vue.nextTick(() => {
        expect(wrapper.vm.matchingNotes).toEqual([]);
        expect(mockFindMatchingNoteTitles).toHaveBeenCalledTimes(2);
        done();
      });
    });
  });

  describe('watched values', () => {
    it('should call handle function when inputValue changes', done => {
      spyOn(autocompleteUtils, 'getQueryFromInput').and.returnValue(['1']);
      const wrapper = shallow(AutocompleteInput, {
        store,
        localVue,
        methods: { updatePopoverDisplay: () => {} },
      });
      spyOn(wrapper.vm, 'handleScroll').and.returnValue();
      wrapper.vm.inputValue = 'abc';
      Vue.nextTick(() => {
        expect(wrapper.vm.handleScroll).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('setFocus method', () => {
    it('should set focusd value and handle scroll after a timeout', () => {
      spyOn(autocompleteUtils, 'getQueryFromInput').and.returnValue(['1']);
      const wrapper = shallow(AutocompleteInput, {
        store,
        localVue,
        methods: { updatePopoverDisplay: () => {} },
      });
      const focusValue = true;
      spyOn(wrapper.vm, 'handleScroll').and.returnValue(null);
      spyOn(wrapper.vm, 'calculateDropdownPosition').and.returnValue(null);
      wrapper.vm.setFocus(focusValue);
      Vue.nextTick(() => {
        expect(wrapper.vm.handleScroll).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('updateValue method', () => {
    it('should emit type and value setting input value', () => {
      spyOn(autocompleteUtils, 'getQueryFromInput').and.returnValue(['1']);
      const wrapper = shallow(AutocompleteInput, {
        store,
        localVue,
        methods: {
          updatePopoverDisplay: () => {},
          calculateDropdownPosition: () => {},
        },
      });
      spyOn(wrapper.vm, '$emit');
      wrapper.vm.updateValue('type', 'value');
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('type', 'value');
      expect(wrapper.vm.inputValue).toEqual('value');
    });
  });

  describe('replaceTextWithSelection method', () => {
    it('should call upade input values after confirming query selection', () => {
      spyOn(autocompleteUtils, 'getQueryFromInput').and.returnValue(['1']);
      const wrapper = shallow(AutocompleteInput, {
        store,
        localVue,
        methods: {
          updatePopoverDisplay: () => {},
          calculateDropdownPosition: () => {},
        },
      });
      spyOn(autocompleteUtils, 'replaceQueryWithSelection').and.returnValue(
        'hello abc',
      );
      spyOn(wrapper.vm, 'updateValue');
      wrapper.vm.inputValue = 'hello @abc';
      wrapper.vm.replaceTextWithSelection('abc');
      expect(wrapper.vm.updateValue).toHaveBeenCalledWith('input', 'hello abc');
    });
  });

  describe('updatePopoverDisplay method', () => {
    it('should set the DOM element display value', () => {
      spyOn(autocompleteUtils, 'getQueryFromInput').and.returnValue(['1']);
      const wrapper = shallow(AutocompleteInput, {
        store,
        localVue,
        methods: {
          calculateDropdownPosition: () => {},
        },
      });
      const element = { style: {} };
      spyOn(document, 'getElementsByClassName').and.returnValue([element]);
      wrapper.vm.updatePopoverDisplay('none');
      expect(element).toEqual({ style: { display: 'none' } });
    });
  });
});
