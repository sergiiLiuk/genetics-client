<template>
  <v-layout row wrap>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h1>Про команду</h1>
    </v-flex>
    <v-flex xs12 class="text-xs-center" mt-3>
      <p>Інформація про команду</p>
      <div class="flex-container">
        <!-- <div class="a">a</div>
        <div class="b">b</div> -->
      </div>
    </v-flex>
  </v-layout>
</template>

<style scoped>
@media only screen and (min-width: 600px) {
  .flex-container {
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .a {
    width: 20%;
    background: green;
  }
  .b {
    width: 80%;
    background: red;
  }
}
.flex-container {
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;

  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-align-content: flex-start;
  -ms-flex-line-pack: start;
  align-content: flex-start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}
@media only screen and (max-width: 599px) {
  .flex-container {
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .a {
    background: pink;
    width: 100%;
  }
  .b {
    background: blue;
    width: 100%;
  }
}

.a {
  -webkit-order: 0;
  -ms-flex-order: 0;
  order: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -webkit-align-self: auto;
  -ms-flex-item-align: auto;
  align-self: auto;
}

.b {
  -webkit-order: 0;
  -ms-flex-order: 0;
  order: 0;
  -webkit-flex: 1 0 auto;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  -webkit-align-self: auto;
  -ms-flex-item-align: auto;
  align-self: auto;
}
</style>
