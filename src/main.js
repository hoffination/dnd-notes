// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { Button, Table, TableColumn } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSimpleSVG from 'vue-simple-svg';

import App from './App';
import router from './router';
import store from './store/store';

import NoteList from './components/NoteList';

Vue.config.productionTip = false;

// External components
Vue.component(Button.name, Button);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.use(VueSimpleSVG);

// Internal Components
Vue.component(NoteList.name, NoteList);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
