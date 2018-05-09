import {
  separateLinksInItem,
  noteArrayToIndexMap,
  appendNoteDates,
} from '@/utils/NoteTransform';
import parse from 'date-fns/parse';

describe('NoteTransform', () => {
  describe('noteArrayToIndexMap', () => {
    it('should take an empty array and return an empty object', () => {
      expect(noteArrayToIndexMap([])).toEqual({});
    });

    it('should take an array of objects and map them by _id', () => {
      let notes = [
        { _id: '1', created: 0, updated: 0 },
        { _id: '2', created: 0, updated: 0 },
        { _id: '3', created: 0, updated: 0 },
      ];
      let expectedNoteMap = {
        1: appendNoteDates(notes[0]),
        2: appendNoteDates(notes[1]),
        3: appendNoteDates(notes[2]),
      };
      expect(noteArrayToIndexMap(notes)).toEqual(expectedNoteMap);
    });

    it('should use the last note if there are two notes with the same _id', () => {
      let notes = [
        { _id: '1', created: 0, updated: 0 },
        { _id: '1', created: 1, updated: 0 },
      ];
      let expectedNoteMap = { 1: appendNoteDates(notes[1]) };
      expect(noteArrayToIndexMap(notes)).toEqual(expectedNoteMap);
    });
  });

  describe('appendNoteDates', () => {
    it('should return invalid from object without a created date', () => {
      let result = appendNoteDates({ updated: 0 });
      expect(JSON.stringify(result.createdDate)).toEqual('null');
      expect(JSON.stringify(result.updatedDate)).toEqual(
        '"1970-01-01T00:00:00.000Z"',
      );
    });
  });

  describe('separateLinksInItem', () => {
    it('should be able to handle item without any links', () => {
      const noteItem = {
        item: {
          item: 'Lives in a hut',
          links: [],
          tags: ['lives', 'in', 'a', 'hut'],
          order: 0,
        },
      };

      const outputItem = separateLinksInItem(noteItem);
      expect(outputItem.length).toEqual(1);
      expect(outputItem[0]).toEqual({ item: 'Lives in a hut' });
    });

    it('should be able to handle last word being link', () => {
      const noteItem = {
        item: {
          item: 'Lives in Neverwinter',
          links: [
            {
              toId: 0,
              startWord: 2,
              endWord: 3,
            },
          ],
          tags: ['lives', 'in', 'neverwinter'],
          order: 0,
        },
      };

      const outputItem = separateLinksInItem(noteItem);
      expect(outputItem.length).toEqual(2);
      expect(outputItem[0]).toEqual({ item: 'Lives in' });
      expect(outputItem[1]).toEqual({ toId: 0, item: 'Neverwinter' });
    });

    it('should be able to handle middle word being link', () => {
      const noteItem = {
        item: {
          item: 'Quest given by Bijorn Ironheart to the guild',
          links: [
            {
              toId: 1,
              startWord: 3,
              endWord: 5,
            },
          ],
          tags: [],
          order: 0,
        },
      };

      const outputItem = separateLinksInItem(noteItem);
      expect(outputItem.length).toEqual(3);
      expect(outputItem[0]).toEqual({ item: 'Quest given by' });
      expect(outputItem[1]).toEqual({ toId: 1, item: 'Bijorn Ironheart' });
      expect(outputItem[2]).toEqual({ item: 'to the guild' });
    });

    it('should be able to handle the first word being a link', () => {
      const noteItem = {
        item: {
          item: 'Bijorn Ironheart is awesome',
          links: [
            {
              toId: 1,
              startWord: 0,
              endWord: 2,
            },
          ],
          tags: [],
          order: 0,
        },
      };

      const outputItem = separateLinksInItem(noteItem);
      expect(outputItem.length).toEqual(2);
      expect(outputItem[0]).toEqual({ toId: 1, item: 'Bijorn Ironheart' });
      expect(outputItem[1]).toEqual({ item: 'is awesome' });
    });

    it('should be able to handle the first word being a link', () => {
      const noteItem = {
        item: {
          item: 'Bijorn Ironheart to Lydia Moonbutt',
          links: [
            {
              toId: 1,
              startWord: 0,
              endWord: 2,
            },
            {
              toId: 2,
              startWord: 3,
              endWord: 5,
            },
          ],
          tags: [],
          order: 0,
        },
      };

      const outputItem = separateLinksInItem(noteItem);
      expect(outputItem.length).toEqual(3);
      expect(outputItem[0]).toEqual({ toId: 1, item: 'Bijorn Ironheart' });
      expect(outputItem[1]).toEqual({ item: 'to' });
      expect(outputItem[2]).toEqual({ toId: 2, item: 'Lydia Moonbutt' });
    });
  });
});
