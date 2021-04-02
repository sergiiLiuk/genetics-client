<template>
  <div>
    <v-select
      :value="birthPlace"
      class="mt-4"
      :items="birthPlaces"
      label="Місцевість"
      dense
      outlined
      @input="$emit('update:birthPlace', $event)"
    ></v-select>
  </div>
</template>

<script>
export default {
  props: {
    birthPlace: {
      type: String
    }
  },
  computed: {
    birthPlaces() {
      return [
        ...new Set(
          this.$store.state.births
            .map((item) => item.birthPlace)
            .filter((item) => item !== '-' && item !== '')
        )
      ]
    }
  }
}
</script>
