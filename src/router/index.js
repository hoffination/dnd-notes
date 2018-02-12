import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import ViewNotes from '@/components/ViewNotes';
import NoteDetail from '@/components/NoteDetail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    }, {
      path: '/notes',
      name: 'ViewNotes',
      component: ViewNotes,
    }, {
      path: '/selected',
      name: 'NoteDetail',
      component: NoteDetail,
    },
  ],
});
