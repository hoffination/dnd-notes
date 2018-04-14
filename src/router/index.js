import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import ViewNotes from '@/components/ViewNotes';
import NoteDetail from '@/components/NoteDetail';

Vue.use(Router);

export default new Router({
  base: '/dnd-notes/',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
    }, {
      path: '/',
      name: 'ViewNotes',
      component: ViewNotes,
    }, {
      path: '/selectedNote/:id',
      name: 'NoteDetail',
      component: NoteDetail,
    },
  ],
});
