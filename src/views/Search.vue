<template>
  <div>
    <Modal ref="settingsmodal" :title="'Фільтр'">
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
            <div class="d-flex justify-space-between">
              <v-btn @click="clean()">Очистити фільтр</v-btn>
              <v-btn @click="$refs.settingsmodal.toggleModal()">Закрити</v-btn>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
    </Modal>

    <v-flex xs12>
      <v-layout class="" row wrap align-center>
        <v-flex xs12 class="d-flex pa-1 justify-space-between">
          <v-row no-gutters>
            <v-col cols="12" xs="12" md="6" class="table__buttons">
              <v-select
                v-if="$vuetify.breakpoint.smAndDown"
                v-model="page"
                class="mt-4"
                :items="pages"
                label="Архів"
                item-text="name"
                dense
                outlined
              ></v-select>
              <div v-if="$vuetify.breakpoint.mdAndUp" class="d-flex justify-md-start">
                <v-btn class="mx-1" @click="page = 'birth'">Народження</v-btn>
                <v-btn class="mx-1" @click="page = 'marriage'">Одруження</v-btn>
                <v-btn class="mx-1" @click="page = 'death'">Смерть</v-btn>
              </div>
            </v-col>
            <v-col cols="12" xs="12" md="6" class="pagination">
              <v-pagination
                v-model="state.settings.paginationPage"
                class="d-flex"
                :length="pageCount"
                :total-visible="5"
              ></v-pagination>
            </v-col>
          </v-row>
        </v-flex>
        <v-flex v-if="$vuetify.breakpoint.mdAndUp" class="d-flex justify-start">
          <div class="px-2">
            архів
            <span class="headline"> {{ pageTitle }}</span>
            <v-divider></v-divider>
          </div>
        </v-flex>
        <v-flex class="d-flex pa-1 mt-4" xs12>
          <div class="filters__container">
            <div
              v-if="$vuetify.breakpoint.mdAndUp"
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
                  outlined
                  dense
                ></v-select>
                <v-divider class="my-4"></v-divider>
                <v-btn @click="clean()">Очистити фільтр</v-btn>
              </div>
            </div>
          </div>

          <div ref="content" class="table__container">
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
              mobile-breakpoint="959"
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
      page: 'birth',
      pages: [
        { value: 'birth', name: 'Народження' },
        { value: 'marriage', name: 'Одруження' },
        { value: 'death', name: 'Смерть' }
      ],
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
    pageTitle() {
      return this.pages.find((page) => page.value === this.page).name
    },
    dataState() {
      return this.$store.state[this.page][this.page]
    },
    filterComponent() {
      return require('../components/filters/' +
        this.capitalizeFirstLetter(this.page) +
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
      return headers[this.page]
    }
  },
  watch: {
    page: {
      handler(val) {
        this.state.settings = Object.assign({}, settings[val])
        this.state.filters = Object.assign({}, filters[val])
      },
      immediate: true
    }
  },
  mounted() {
    this.loading = true
    this.$store.dispatch('GET_BIRTHS')
    this.$store.dispatch('GET_DEATH')
    this.$store.dispatch('GET_MARRIAGE')
    this.loading = false
  },
  methods: {
    clean() {
      this.state.filters = Object.assign({}, filters[this.page])
      this.state.settings = Object.assign({}, settings[this.page])
    }
  }
}
</script>

<style>
@media only screen and (max-width: 959px) {
  .pagination,
  .table__buttons {
    padding: 5px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .filters__container {
    width: 0%;
  }
  .table__container {
    width: 100% !important;
  }
}
@media only screen and (min-width: 960px) {
  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .table__buttons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
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
