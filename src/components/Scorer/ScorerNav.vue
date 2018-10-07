<template>
    <div>
        <b-row style="height: 20px"></b-row>
        <b-row>
            <b-col cols="3">
                <b-card no-body :header="welcome_messege">
                    <b-list-group flush>
                        <b-list-group-item @click="GotoMyInfo">My Info</b-list-group-item>
                        <b-list-group-item @click="GotoScore">Score</b-list-group-item>
                        <b-list-group-item href="#">Arguments & Ratings</b-list-group-item>
                        <b-list-group-item @click="SignOut">Sign Out</b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-col>
            <b-col cols="9">
                <router-view></router-view>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: "ScorerNav",
    computed: {
        welcome_messege: function() {
            return '<b>Scorer, '+this.scorer_name+'</b>';
        }
    },
    data: function() {
        return {
            scorer_name: ""
        }
    },
    methods: {
        GetScorerName () {
            this.$http.get('/scorer/get_session').then( response => {
                if (response.data['status'] == 'failed') {
                    this.$router.push('/scorersignin');
                } else {
                    this.scorer_name = response.data['name'];
                }
            })
        },
        GotoMyInfo () {
            this.$router.push('/scorer/myinfo');
        },
        GotoScore() {
            this.$router.push('/scorer/score');
        },
        SignOut () {
            this.$http.get('/scorer/signout').then( ()=> {
                this.$bus.$emit('scorer_sign_out');
                this.$router.push('/');
            })
        }
    },
    created: function() {
        this.GetScorerName();
    }
}
</script>
