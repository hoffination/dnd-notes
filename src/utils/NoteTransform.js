import { take, drop } from 'ramda';

export default function separateLinksInItem(noteItem) {
  const words = noteItem.item.item.split(' ');
  let position = 0;
  const results = [];
  noteItem.item.links.forEach(link => {
    if (position === 0 && link.startWord !== 0) {
      results.push({
        item: take(link.startWord, words).join(' '),
      });
      position = link.startWord;
    }
    if (link.startWord > position) {
      results.push({
        item: take(link.startWord - position, drop(position, words)).join(' '),
      });
      position = link.startWord;
    }
    results.push({
      toId: link.toId,
      item: take(link.endWord - link.startWord, drop(link.startWord, words)).join(' '),
    });
    position = link.endWord;
  });
  if (position !== 0 && position !== words.length) {
    results.push({
      item: take(words.length - position, drop(position, words)).join(' '),
    });
  }
  if (position === 0 && words.length > 0) {
    results.push({
      item: words.join(' '),
    });
  }
  return results;
}
