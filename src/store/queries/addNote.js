import gql from 'graphql-tag';

export default gql`
  mutation AddNote($title: String!, $type: Int!, $firstItem: String) {
    addNote(title: $title, type: $type, firstItem: $firstItem) {
      _id
      title
      type
      characterId
      created
      updated
      items {
        created
        item
        order
        links {
          toId
          startWord
          endWord
        }
      }
    }
  }
`;
