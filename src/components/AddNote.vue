<template>
  <el-form :model="form" :rules="rules" ref="form" @keyup.enter.native="addItemToNote()" @submit.prevent.native label-width="80px">
    <el-form-item label="Title" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="Type" prop="type">
      <el-row >
        <el-col :span="20">
          <el-select v-model="form.type" placeholder="please pick one">
            <el-option
              v-for="(item, index) in noteTypes"
              :key="index"
              :label="item.name"
              :value="item.id"
            >
              <span style="float: left;">{{item.name}}</span>
              <simple-svg
                style="float: right;"
                :filepath="item.svg"
                :width="'30px'"
                :height="'30px'"
                :stroke="'transparent'"
              >
              </simple-svg>
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <simple-svg v-if="form.type !== null"
            :filepath="$store.state.enums.noteTypes[form.type].svg"
            :width="'40px'"
            :height="'40px'"
            :stroke="'transparent'"
          >
          </simple-svg>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="First Note" prop="first">
      <el-input v-model="form.first"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button @click="closeAddNoteModal()">Cancel</el-button>
      <el-button
        v-loading="addNoteLoading"
        :disabled="addNoteLoading"
        native-type="submit"
        @click="submitForm('form')"
      >
        Create
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
const formDefault = {
  title: '',
  type: null,
  first: '',
};

export default {
  name: 'AddNote',
  computed: mapGetters(['noteTypes', 'modalOpen', 'addNoteLoading']),
  data() {
    return {
      form: { ...formDefault },
      rules: {
        title: [{ required: true, message: 'Please add a note title', trigger: 'blur' }],
        type: [{ required: true, message: 'Please select a note type', trigger: 'change' }],
        first: [], // No rules!
      },
    };
  },
  watch: {
    modalOpen: function() {
      if (!this.modalOpen) {
        this.form = { ...formDefault };
      }
    },
  },
  methods: {
    ...mapActions(['closeAddNoteModal', 'addNote']),
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.addNote({
            title: this.form.title,
            type: this.form.type,
            firstItem: this.form.first,
          });
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<style>
</style>
