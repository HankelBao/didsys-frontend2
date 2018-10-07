<template>
    <div>
        <b-row style="height: 20vh"></b-row>
        <b-row align-h="center" style="text-align:center">
            <b-col cols="6">
                <b-card>
                    <p class="display-4">Sign In as Scorer</p>

                    <b-row style="height: 20px"></b-row>

                    <b-input-group prepend="Username">
                        <b-form-input v-model="username" type="text"/>
                    </b-input-group>

                    <b-row style="height: 10px"></b-row>

                    <b-input-group prepend="Password">
                        <b-form-input v-model="password" type="password"/>
                    </b-input-group>

                    <b-row style="height: 13px"></b-row>

                    <b-alert variant="danger"
                            dismissible
                            :show="showWrongPasswordAlert"
                            @dismissed="showWrongPasswordAlert=false">
                        Dismissible Alert!
                    </b-alert>

                    <b-button @click="SignIn" variant="primary" >Sign In</b-button>
                </b-card>
            </b-col>
        </b-row>
        <b-row style="height: 20vh"></b-row>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    name: "ScorerSignIn",
    data: function () {
        return {
            showWrongPasswordAlert: false,
            username: "",
            password: ""
        }
    },
    methods: {
        SignIn () {
            this.$http.post('/scorer/signin', qs.stringify({
                'username': this.username,
                'password': this.password
            })).then( response => {
                var json = response.data;
                if (json['status'] == 'failed')
                    this.showWrongPasswordAlert = true;
                this.$bus.$emit('scorer_sign_in');
                this.$router.push('/scorer/myinfo');
            })
        }
    }
}
</script>
