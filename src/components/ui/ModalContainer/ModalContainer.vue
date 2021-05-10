<template>
    <v-dialog
            :value="dialog"
            :max-width="modalWidth"
            persistent
            @click:outside="onClickOutside"
    >
        <div class="dialog modal-container" :class="customDialogClass">
            <div class="dialog-header blue lighten-5">
                <div class="dialog-header__title">
                    <slot name="header"></slot>
                </div>
                <div class="dialog-header__actions">
                    <v-btn 
                        text 
                        @click="onClickOutside"
                    >
                        <v-icon 
                            color="black"
                        >
                            mdi-close
                        </v-icon>
                    </v-btn>
                </div>
            </div>
            <div class="dialog-main white">
                <div class="dialog-main__description">
                    <slot name="main"></slot>
                </div>
            </div>
            <div class="dialog-footer blue lighten-5">
                <div class="dialog-footer__actions">
                    <v-btn @click="onClickOutside">
                        Cancel
                    </v-btn>
                    <v-btn @click="confirm">
                        Confirm
                    </v-btn>
                </div>
            </div>
        </div>
    </v-dialog>
</template>

<script>
    export default {
        name: "ModalContainer",
        props: {
            dialog: Boolean,
            modalWidth: Number,
            customDialogClass: [Array, String],
        },
        methods: {
            onClickOutside() { this.$emit('clickOutside') },
            confirm() { this.$emit('confirm') }
        }
    }
</script>

<style lang="sass">
    .dialog
        &-header
            display: flex
            align-items: center
            justify-content: space-between
            padding: 10px 20px
            &__title
                font-size: 24px
                font-weight: bold
                text-transform: uppercase
            &__actions
                .v-btn
                    &.v-size--default
                        padding: 0
                        height: auto
                        min-width: 0
        &-main
            padding: 20px
            &__description
                font-size: 18px
                text-align: center
        &-footer
            display: flex
            align-items: center
            justify-content: center
            padding: 10px 20px
            &__actions
                > .v-btn
                    &:not(:last-child)
                        margin-right: 15px
</style>