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
                        label="Description"
                        @input="changeField"
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
  name: "CreateNotation",
  components: { ModalContainer },
  data: () => ({
    valid: true,
    isOpen: false,
    mode: 'create',
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
    ...mapActions(['createNotationItem']),
    saveItem() {
        this.headerTitle = 'Create notation'
        this.currentMessage = `Are you sure you want to create a notation with this name "${this.copyData.title}"?`
        this.isOpen = true
    },
    cancel() {
        this.mode = 'reset'
        this.headerTitle = 'Cancel'
        this.isOpen = true
        this.currentMessage = 'Are you sure you want to undo the creation of the notation?'
    },
    validate() { this.$refs.form.validate() },
    toggleAlert(){ this.alertFlag = false },
    onCloseModal() { this.isOpen = false },
    createNotation() {
        this.createNotationItem({...this.copyData})
        this.isOpen = false
        this.alertMessage = `Notation "${this.copyData.title}" created`
        this.alertFlag = true
        this.copyData = { title: null, description: null }
    },
    confirm() {
        if(this.mode === 'create')
            this.createNotation()
        else
            this.$router.back()
    },
    changeField() { this.isEditable = false }
  },
  mounted() { this.validate() },
  directives: { frag },

}
</script>

<style lang="sass">
  .card-wrapper
    display: flex
    align-items: center
    justify-content: center
    min-height: calc(100vh - 64px)
    .v-card
      &__actions
        .row
          > .v-btn
              &:not(:last-child)
                margin-right: 15px

  .v-alert
    position: absolute!important
    bottom: 0
</style>
