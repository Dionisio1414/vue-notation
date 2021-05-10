<template>
    <v-list-item 
        tag="li"
    >
        <v-list-item-content>
            <div class="v-list-item__content-title">
                <v-list-item-title v-text="data.title"></v-list-item-title>
                <v-btn
                    icon
                    @click="show = !show"
                >
                    <v-icon>
                        {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                    </v-icon>
                </v-btn>
            </div>
            <v-expand-transition>
                <div class="v-list-item__descriptrion" v-show="show">{{ data.description }}</div>
            </v-expand-transition>
        </v-list-item-content>
        <div class="v-list-item__actions">
            <v-btn
                fab
                x-small
                link
                exact
                :to="path"
            >
                <v-icon dark>
                    mdi-pencil
                </v-icon>
            </v-btn>
            <v-btn
                fab
                x-small
                @click="deleteItem(currentIndex, data)"
            >
                <v-icon dark>
                    mdi-delete
                </v-icon>
            </v-btn>
        </div>
    </v-list-item>
</template>

<script>

export default {
    name: "ListItem",
    props: {
        data: Object,
        currentIndex: Number
    },
    data: () => ({
        show: false,
    }),
    computed: { 
        path() {
            return { name: 'NotationEdit', params: { mode: 'edit', id: this.currentIndex, notationData: this.data } }
        }
    },
    methods: {
        deleteItem(index, data) { this.$emit('delete', index, data.title) },
    },
}
</script>

<style lang="sass">
    .v-list-item
        &__descriptrion
            word-break: break-word
            padding-right: 25px
        &__title
            flex: 0 0 10%!important
        &__content
            &-title
                display: flex
        &__actions
            > .v-btn
                &:not(:last-child)
                    margin-right: 15px
</style>