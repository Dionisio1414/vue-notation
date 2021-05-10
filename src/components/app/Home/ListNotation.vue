<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-list 
          tag="ul"
          flat
        >
          <v-list-item-group
            v-model="selectedItem"
          >
            <list-item 
              v-for="(val, index) in list" 
              :key="index"
              :data="val"
              :currentIndex="index"
              @delete="deleteItem"
            >
            </list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ListItem from './ListItem'
  export default {
    name: 'ListNotation',
    props: {
      list: Array
    },
    components: {
      ListItem
    },
    data: () => ({
      selectedItem: 1
    }),
    methods: {
      deleteItem(index, title) { this.$emit('delete', index, title) }
    }
  }
</script>

<style lang="sass">
  .v-list
    &-item
      &:not(:last-child)
        border-bottom: 1px solid #f5f5f5
</style>
