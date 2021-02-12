<template>
  <div class="home">
      <Header/>
      <b-container>
          <b-row>
              <b-col cm="6" >
                  <GameList/>
              </b-col>
          </b-row>
      </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header";
import GameList from "@/components/GameList";

export default {
    name: 'home',
    components: {
        Header,
        GameList
    }
}
</script>
