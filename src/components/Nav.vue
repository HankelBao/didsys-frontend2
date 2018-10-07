<template>
  <div>
    <b-navbar toggleable="md" type="dark" class="bg-primary">
      <b-container>
        <router-link to="/">
          <b-navbar-brand>SFLS Discipline Inspection Department</b-navbar-brand>
        </router-link>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
          <!-- Left -->
          <b-navbar-nav>
            <b-nav-item @click="GotoScoreBoard">Board</b-nav-item>
            <b-nav-item @click="GotoScoreRanks">Ranks</b-nav-item>
            <b-nav-item @click="GotoScoreMoments">Moments</b-nav-item>
          </b-navbar-nav>
          <!-- Right -->
          <b-navbar-nav class="ml-auto">
            <div v-if="scorer_signed_in">
              <b-nav-item @click="GotoScorerMyInfo">{{scorer_name}}</b-nav-item>
            </div>
            <div v-else>
              <b-nav-item @click="GotoScorerSignIn">Sign in as a Scorer</b-nav-item>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data: function () {
    return {
      scorer_signed_in: false,
      scorer_name: ""
    }
  },
  methods: {
    GotoScoreBoard () {
      this.$router.push('/scoreboard');
    },
    GotoScoreRanks () {
      this.$router.push('/scoreranks');
    },
    GotoScoreMoments () {
      this.$router.push('/scoremoments');
    },
    GotoScorerMyInfo () {
      this.$router.push('/scorer/myinfo');
    },
    GotoScorerSignIn () {
      this.$router.push('/scorersignin');
    },
    CheckScorerSignedIn () {
      this.$http.get('/scorer/get_session').then( response => {
        if (response.data['status'] == 'failed') {
          this.scorer_signed_in = false;
        } else {
          this.scorer_signed_in = true;
          this.scorer_name = response.data['name'];
        }
      })
    }
  },
  created: function() {
    this.$bus.$on('scorer_sign_in', this.CheckScorerSignedIn);
    this.$bus.$on('scorer_sign_out', this.CheckScorerSignedIn);
    this.CheckScorerSignedIn();
  }
}
</script>
