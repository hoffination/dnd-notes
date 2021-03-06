// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Col,
  Dialog,
  Form,
  FormItem,
  Input,
  Loading,
  Message,
  Option,
  Popover,
  Row,
  Select,
  Table,
  TableColumn,
  Tag,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSimpleSVG from 'vue-simple-svg';

import App from './App';
import router from './router';
import store from './store/store';

import AddNote from './components/AddNote';
import AutocompleteInput from './components/AutocompleteInput';
import NoteItem from './components/NoteItem';
import NoteList from './components/NoteList';
import NoteBreadcrumb from './components/NoteBreadcrumb';

Vue.config.productionTip = false;
Vue.config.API = process.env.API;

Vue.use(VueSimpleSVG);

// External components
Vue.component(Button.name, Button);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);
Vue.component(Card.name, Card);
Vue.component(Col.name, Col);
Vue.component(Dialog.name, Dialog);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Option.name, Option);
Vue.component(Popover.name, Popover);
Vue.component(Row.name, Row);
Vue.component(Select.name, Select);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Tag.name, Tag);

Vue.use(Loading.directive);
Vue.prototype.$message = Message;

// Internal Components
Vue.component(AddNote.name, AddNote);
Vue.component(AutocompleteInput.name, AutocompleteInput);
Vue.component(NoteItem.name, NoteItem);
Vue.component(NoteList.name, NoteList);
Vue.component(NoteBreadcrumb.name, NoteBreadcrumb);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
});
