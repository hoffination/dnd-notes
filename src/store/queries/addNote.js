import gql from 'graphql-tag';

export default gql`
  mutation AddNote($title: String!, $type: Int!, $firstNote: String) {
    addNote(title: $title, type: $type, firstNote: $firstNote) {
      _id
      title
      type
      characterId
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
