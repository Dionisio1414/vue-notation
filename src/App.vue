<template>

  <v-app>
    <v-app-bar
      absolute
      app
      flat
    >
      <v-app-bar-title>
        <router-link
          to="/"
        >
          {{ appTitle }}
        </router-link>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn :disabled="$route.path !== '/'">
        <router-link to="/notation/create">
          Add notation
        </router-link>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    appTitle: 'Vue Notation'
  })
}
</script>

<style lang="sass">

  .v-toolbar
    &__title 
      .v-app-bar-title
        &__content
          .router-link-active
            text-decoration: none
            color: #242424
    &__content
      .v-btn
        a
          display: block
          text-decoration: none
          color: #242424
</style>

