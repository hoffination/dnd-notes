import {
  AUTO_CHAR,
  getLowestPopoverScrollPosition,
  getQueryFromInput,
  replaceQueryWithSelection,
} from '@/utils/autocomplete';

describe('autocomplete utils', () => {
  describe('getLowestPopoverScrollPosition', () => {
    it('should take inputs and compute lowest point', () => {
      const elementTop = 200;
      const elementHeight = 40;
      const popoverHeight = 300;
      const scrollHeight = 0;
      const position = getLowestPopoverScrollPosition({
        elementTop,
        elementHeight,
        popoverHeight,
        scrollHeight,
      });
      expect(position).toEqual(540);
    });
  });

  describe('getQueryFromInput', () => {
    it(`should not return anything if missing ${AUTO_CHAR} character`, () => {
      const source = 'Hello World';
      expect(getQueryFromInput(source)).toEqual(null);
    });

    it(`should grab everything after a ${AUTO_CHAR} character is found`, () => {
      const source = 'Hello World of @Step';
      expect(getQueryFromInput(source)).toEqual('step');
    });

    it(`should ignore later ${AUTO_CHAR} characters if more than one exist`, () => {
      const source = 'Hello World of @Step @ Fred';
      expect(getQueryFromInput(source)).toEqual('step @ fred');
    });
  });

  describe('replaceQueryWithSelection', () => {
    it(`should not replace anything if no ${AUTO_CHAR} character present`, () => {
      const source = 'Hello World';
      expect(replaceQueryWithSelection(source, 'zap')).toEqual(source);
    });

    it(`should grab everything after the first ${AUTO_CHAR}`, () => {
      const source = 'Hello World of @Step';
      expect(replaceQueryWithSelection(source, 'Stepharos')).toEqual(
        'Hello World of Stepharos',
      );
    });
  });
});
