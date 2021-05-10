<template>
  <div v-frag>

    <list-notation
      :list="list"
      @delete="deleteItem"
    >
    </list-notation>
    <modal-container
        v-if="isOpen" 
        :dialog="isOpen" 
        :modalWidth="920" 
        @clickOutside="onCloseModal"
        @confirm="confirm"
    >
        <template #header>
            Delete
        </template>
        <template #main>
            Are you sure you want to remove the notation?
            {{ deleteMessage }}
        </template>
    </modal-container>
    
  </div>
</template>

<script>
  /* Vuex */
  import { mapGetters, mapActions } from 'vuex'
  /* Components */
  import ListNotation from '@/components/app/Home/ListNotation'
  import ModalContainer from '@/components/ui/ModalContainer/ModalContainer'
  /* Directives */
  import frag from 'vue-frag'

  export default {
    name: 'Home',
    components: {
      ListNotation,
      ModalContainer
    },
    data: () => ({
        isOpen: false,
        currentIndexNotation: null,
        deleteMessage: null
    }),
    computed: {
      ...mapGetters({
        list: 'getNotationList'
      })
    },
    methods: { 
      ...mapActions(['initNotations', 'deleteNotationItem']),
      onCloseModal() { this.isOpen = false },
      confirm() { 
        this.deleteNotationItem(this.currentIndexNotation) 
        this.isOpen = false 
      },
      deleteItem(index, title) { 
        this.deleteMessage = `Are you sure you want to remove the "${title}" notation?`
        this.currentIndexNotation = index
        this.isOpen = true
      },
    },
    mounted() { this.initNotations() },
    directives: { frag },
  }
</script>
