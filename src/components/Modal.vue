<template>
  <v-dialog
    v-model="$store.state.app.modal"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="$store.state.app.modal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
      <slot></slot>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  created() {
    this.$store.state.app.modal = false
  },
  methods: {
    toggleModal() {
      this.$store.state.app.modal = !this.$store.state.app.modal
    }
  }
}
</script>
