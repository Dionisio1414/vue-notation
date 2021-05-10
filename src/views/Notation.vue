<template>
  <div class="card-wrapper">

    <component 
      :is="currentComponent"
      :data="notationData"
    >
    </component>

  </div>
</template>

<script>
/* Components */
import CreateNotation from '../components/app/Notation/CreateNotation.vue'
import EditNotation from '../components/app/Notation/EditNotation.vue'

export default {
  name: "Notation",
  props: {
    notationData: Object
  },
  components: { CreateNotation, EditNotation },
  data: () => ({
    mode: null
  }),
  computed: {
    currentComponent() {
      if(this.mode === 'create') return 'CreateNotation'
      else return 'EditNotation'
    }
  },
  created() {
    const { mode } = this.$route.params
    this.mode = mode
  }
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
