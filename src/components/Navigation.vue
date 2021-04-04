<template>
  <div>
    <MobileNavigation ref="mobnavigation" :menu-items="menuItems" />

    <v-app-bar app dark>
      <v-container>
        <v-toolbar class="elevation-0">
          <span class="hidden-md-and-up">
            <v-btn icon @click="$refs.mobnavigation.toggleDrawer()">
              <v-icon>menu</v-icon>
            </v-btn>
          </span>
          <v-toolbar-title>
            <router-link to="/" tag="span" style="cursor: pointer">
              {{ appTitle }}
            </router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn v-for="item in menuItems" :key="item.title" text :to="item.path">
              <v-icon left dark>{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-btn>
          </v-toolbar-items>

          <span v-if="$route.name === 'Search'" class="hidden-md-and-up">
            <v-btn icon @click="modal = !modal">
              <v-icon>settings</v-icon>
            </v-btn>
          </span>
        </v-toolbar>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import MobileNavigation from '@/components/MobileNavigation'

export default {
  components: {
    MobileNavigation
  },
  data() {
    return {
      appTitle: 'Генеалогічний портал',

      menuItems: [
        { title: 'Головна', path: '/', icon: 'home' },
        { title: 'Пошук', path: '/search', icon: 'search' },
        { title: 'Команда', path: '/team', icon: 'people' },
        { title: 'Про проект', path: '/about', icon: 'history_edu' }
      ]
    }
  },
  computed: {
    modal: {
      // getter
      get: function () {
        return this.$store.state.app.modal
      },
      // setter
      set: function (newVal) {
        this.$store.state.app.modal = newVal
      }
    }
  },
  created() {}
}
</script>
