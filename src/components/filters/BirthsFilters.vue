<template>
  <div>
    <v-select
      :value="filters.birthPlace"
      class="mt-4"
      :items="birthPlaces"
      label="Місцевість"
      dense
      outlined
      @input="localFilters.birthPlace = $event"
    ></v-select>
  </div>
</template>

<script>
export default {
  props: {
    filters: {
      type: Object
    }
  },
  data() {
    return {
      localFilters: { ...this.filters }
    }
  },
  computed: {
    birthPlaces() {
      return [
        ...new Set(
          this.$store.state.births.births
            .map((item) => item.birthPlace)
            .filter((item) => item !== '-' && item !== '')
        )
      ]
    }
  },
  watch: {
    localFilters: {
      handler(val) {
        this.$emit('update', val)
      },
      deep: true
    }
  }
}
</script>
