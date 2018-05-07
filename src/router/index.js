import Vue from 'vue';
import Router from 'vue-router';
import ViewNotes from '@/components/routes/ViewNotes';
import NoteDetail from '@/components/routes/NoteDetail';

Vue.use(Router);

export default new Router({
  base: '/dnd-notes/',
  routes: [
    {
      path: '/',
      name: 'ViewNotes',
      component: ViewNotes,
    },
    {
      path: '/selectedNote/:id',
      name: 'NoteDetail',
      component: NoteDetail,
    },
  ],
});
