<template>
  <div>
    <v-select
      :value="filters.parish"
      class="mt-4"
      :items="allParish"
      label="Парафія"
      dense
      outlined
      @input="localFilters.parish = $event"
    ></v-select>

    <v-select
      :value="filters.locality"
      class="mt-4"
      :items="locations"
      label="Місцевість"
      dense
      outlined
      @input="localFilters.locality = $event"
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
    allParish() {
      return ['костел с. Уланів', 'церква с. Сальниця']
    },
    locations() {
      return [...new Set(this.$store.state.marriage.marriage.map((item) => item.locality))]
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
