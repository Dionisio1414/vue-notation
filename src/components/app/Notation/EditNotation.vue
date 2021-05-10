
<template>
  <div v-frag>
    <v-card
        max-width="1000"
      >
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    v-model="copyData.title"
                    label="Title"
                    :rules="titlefRules"
                    @input="changeField"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    v-model="copyData.description"
                    solo
                    name="input-7-4"
                    :rules="descriptionRules"
                    @input="changeField"
                    label="Description"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-card-actions>
                    <v-row 
                    align="center"
                    justify="center"
                    >
                      <v-btn
                          depressed
                          color="primary"
                          :disabled="!valid"
                          @click="saveItem"
                      >
                          Save
                      </v-btn>
                      <v-btn 
                          depressed
                          :disabled="isEditable"
                          @click="cancel"
                      >
                          Cancel
                      </v-btn>
                      <v-btn
                        depressed
                        color="error"
                        @click="deleteItem(copyData.title)"
                      >
                        Delete
                      </v-btn>
                    </v-row>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
    </v-card>
    <modal-container
      v-if="isOpen" 
      :dialog="isOpen" 
      :modalWidth="920" 
      @clickOutside="onCloseModal"
      @confirm="confirm"
    >
      <template #header>
          {{ headerTitle }}
      </template>
      <template #main>
          {{ currentMessage }}
      </template>
    </modal-container>
    <v-alert
      :value="alertFlag"
      dense
      color="blue"
      type="success"
      transition="scroll-y-reverse-transition"
      dismissible
      @input="toggleAlert"
    >
      {{ alertMessage }}
    </v-alert>
  </div>
</template>

<script>
/* Vuex */
import { mapActions } from 'vuex'
/* Ui components */
import ModalContainer from '@/components/ui/ModalContainer/ModalContainer'
/* Directives */
import frag from 'vue-frag'

export default {
  name: "EditNotation",
  props: { data: Object },
  components: { ModalContainer },
  data: () => ({
    valid: false,
    isOpen: false,
    mode: 'edit',
    currentIndexNotation: null,
    copyData: {
      title: null,
      description: null
    },
    titlefRules: [
      v => !!v || 'Title is required'
    ],
    descriptionRules: [
      v => !!v || 'Description is required'
    ],
    headerTitle: null,
    currentMessage: null,
    alertMessage: null,
    alertFlag: false,
    isEditable: true
  }),
  methods: {
    ...mapActions(['editNotationItem', 'deleteNotationItem']),
    validate() { this.$refs.form.validate() },
    toggleAlert(){ this.alertFlag = false },
    onCloseModal() { this.isOpen = false },
    deleteItem(title) {
      this.headerTitle = 'Delete'
      this.currentMessage = `Are you sure you want to remove "${title}" the notation?`
      this.mode = 'delete'
      this.isOpen = true
    },
    saveItem() {
      this.headerTitle = 'Edit notation'
      this.currentMessage = `Are you sure you want to edit the notation "${this.copyData.title}"?`
      this.isOpen = true
    },
    confirm() {
      if(this.mode === 'delete') {
        this.deleteNotationItem(this.currentIndexNotation) 
        this.isOpen = false 
        this.mode = 'edit'
        this.$router.back()
      } else if(this.mode === 'reset') {
        this.isOpen = false 
        this.mode = 'edit'
        this.copyData = { ...this.data }
      } else {
        this.editNotationItem({index: this.currentIndexNotation, data: { ...this.copyData } }) 
        this.isOpen = false 
        this.mode = 'edit'
        this.alertMessage = `Notation "${this.copyData.title}" edited`
        this.alertFlag = true
      }
    },
    cancel() {
      this.mode = 'reset'
      this.headerTitle = 'Cancel'
      this.isOpen = true
      this.currentMessage = `Are you sure you want to undo editing "${this.copyData.title}" the notation?`
    },
    changeField() { this.isEditable = false }
  },
  created() {
    this.currentIndexNotation = this.$route.params.id
    this.copyData = { ...this.data } 
  },
  mounted() { 
    if(!this.data) this.$router.push('/')
    this.validate() 
  },
  directives: { frag },
}
</script>

<style>

</style>