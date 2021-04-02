<template>
  <div>
    <Modal :title="'Фільтр'">
      <v-list three-line subheader>
        <!-- <v-subheader>User Controls</v-subheader> -->
        <v-list-item>
          <v-list-item-content>
            <!-- <v-list-item-title>Content filtering</v-list-item-title> -->

            <v-text-field
              v-model="state.filters.search"
              class="py-2"
              append-icon="mdi-magnify"
              label="Пошук"
              dense
              hide-details
            ></v-text-field>

            <component
              :is="filterComponent"
              :filters="state.filters"
              @update="state.filters = $event"
            />

            <div>
              <v-checkbox
                v-for="header in headers"
                :key="header.text"
                v-model="state.settings.columns"
                class="mt-0"
                :label="header.text"
                color="primary"
                hide-details
                :value="header.value"
              ></v-checkbox>
            </div>
            <v-select
              v-model="state.settings.selectedPagination"
              :items="Object.keys(paginationMap)"
              label="Записів на сторінку "
              dense
            ></v-select>
            <v-divider class="my-2"></v-divider>
            <v-btn @click="clean()">Очистити фільтр</v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
    </Modal>
    <v-flex xs12>
      <v-layout class="" row wrap align-center>
        <v-flex xs12 class="d-flex pa-1 justify-space-between">
          <div class="d-flex align-center">
            <v-btn class="mx-1" @click="page = 1">Народження</v-btn>
            <v-btn class="mx-1" @click="page = 2">Одруження</v-btn>
            <v-btn class="mx-1" @click="page = 3">Смерть</v-btn>
          </div>
          <!-- <div xs12 class="d-flex justify-space-between align-center pb-4"> -->
          <v-pagination
            v-model="state.settings.paginationPage"
            class="d-flex"
            :length="pageCount"
            :total-visible="7"
          ></v-pagination>
          <!-- </div> -->
        </v-flex>
        <v-flex class="d-flex pa-1 mt-4" xs12>
          <div class="filters__container">
            <div
              v-if="$vuetify.breakpoint.smAndUp"
              class="pr-2"
              :style="{ maxHeight: siteSpaceHeight + 'px' }"
              sm2
            >
              <div
                class="px-1 py-4"
                style="
                  border: 1px solid #dfdfdf;
                  border-radius: 5px;
                  max-width: 280px;
                  background: white;
                "
              >
                <div class="subtitle-1 pb-4">
                  Знайдено: {{ paginationEvent.itemsLength }} записів
                </div>
                <v-divider class="mb-4"></v-divider>
                <v-text-field
                  v-model="state.filters.search"
                  class="py-2"
                  append-icon="mdi-magnify"
                  label="Пошук"
                  dense
                  hide-details
                ></v-text-field>

                <component
                  :is="filterComponent"
                  :filters="state.filters"
                  @update="state.filters = $event"
                />

                <v-checkbox
                  v-for="header in headers"
                  :key="header.text"
                  v-model="state.settings.columns"
                  class="mt-0"
                  :label="header.text"
                  color="primary"
                  hide-details
                  :value="header.value"
                ></v-checkbox>

                <v-select
                  v-model="state.settings.selectedPagination"
                  class="mt-4"
                  :items="Object.keys(paginationMap)"
                  label="Записів на сторінку "
                  dense
                ></v-select>
                <v-divider class="my-4"></v-divider>
                <v-btn @click="clean()">Очистити</v-btn>
              </div>
            </div>
          </div>

          <div ref="content" xs12 sm10 class="table__container">
            <v-data-table
              height="700px"
              fixed-header
              dense
              :page.sync="state.settings.paginationPage"
              :items-per-page="itemsPerPage"
              :loading="loading"
              loading-text="Завантаження, будь ласка, зачекайте"
              :headers="filteredHeaders"
              :items="filteredItems"
              class="elevation-1"
              hide-default-footer
              @pagination="paginationEvent = $event"
            >
              <template v-slot:no-data>
                <div v-if="loading">Завантаження</div>
                <div v-else>Немає даних</div>
              </template>
            </v-data-table>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
  </div>
</template>

<script>
const pageMap = {
  1: 'births',
  2: 'marriage',
  3: 'death'
}

import { mingoFilter } from '../service/mingo/birth'
import common from '../mixins/common'
import headers from '../imports/headers'
import settings from '../imports/settings'
import filters from '../imports/filters'

export default {
  components: {},
  mixins: [common],
  data() {
    return {
      page: 1,
      state: {
        settings: {},
        filters: {}
      },
      sideSpaceState: undefined,
      loading: false,
      paginationEvent: {},
      paginationMap: {
        10: 10,
        20: 20,
        50: 50,
        100: 100,
        500: 500,
        Всі: 999999999
      }
    }
  },
  computed: {
    dataState() {
      return this.$store.state[pageMap[this.page]][pageMap[this.page]]
    },
    filterComponent() {
      return require('../components/filters/' +
        this.capitalizeFirstLetter(pageMap[this.page]) +
        'Filters.vue').default
    },
    filteredHeaders() {
      return this.headers.filter((header) => this.state.settings.columns.includes(header.value))
    },
    filteredItems() {
      return mingoFilter(this.dataState, this.state)
    },
    itemsPerPage() {
      // this.paginationPage = 1

      let res = Object.entries(this.paginationMap).find(([key, value]) => {
        if (key == this.state.settings.selectedPagination) return value
      })

      if (res !== undefined) return res[1]
      else return this.paginationMap['Всі']
    },
    pageCount() {
      return !this.paginationEvent.itemsLength
        ? 1
        : Math.ceil(this.paginationEvent.itemsLength / this.itemsPerPage)
    },
    siteSpaceHeight() {
      return window.innerHeight
    },
    headers() {
      return headers[pageMap[this.page]]
    }
  },
  watch: {
    page: {
      handler(val) {
        this.state.settings = Object.assign({}, settings[pageMap[val]])
        this.state.filters = Object.assign({}, filters[pageMap[val]])
      },
      immediate: true
    }
  },
  mounted() {
    this.loading = true
    this.$store.dispatch('GET_BIRTHS')
    this.loading = false
  },
  methods: {
    clean() {
      this.state.filters = Object.assign({}, filters[pageMap[this.page]])
      this.state.settings = Object.assign({}, settings[pageMap[this.page]])
    }
  }
}
</script>

<style>
@media only screen and (max-width: 599px) {
  .filters__container {
    width: 0%;
  }
  .table__container {
    width: 100% !important;
  }
}
@media only screen and (min-width: 600px) {
  .filters__container {
    width: 16% !important;
  }
  .table__container {
    width: 84% !important;
  }
}

.v-data-table-header-mobile {
  display: none !important;
}
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
.v-pagination {
  justify-content: flex-end;
}
</style>
