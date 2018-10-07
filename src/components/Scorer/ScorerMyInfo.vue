<template>
    <div style="margin-left: 20px">
        <b-row>
            <p class="display-4">My Info</p>
        </b-row>
        <b-row>
            <h6>Name: <b-badge>{{scorer_name}}</b-badge></h6>
        </b-row>
        <b-row>
            <h6>My Subjects: 
                <b-badge style="margin: 2px" v-for="scorer_subject in scorer_subjects">
                    {{scorer_subject}}
                </b-badge>
            </h6>
        </b-row>
        <b-row>
            <h6>My Classes: 
                <b-badge style="margin: 2px" v-for="scorer_class in scorer_classes">
                    {{scorer_class}}
                </b-badge>
            </h6>
        </b-row>
    </div>
</template>

<script>
export default {
    name: "ScorerMyInfo",
    data: function () {
        return {
            scorer_name: "",
            scorer_subjects: [],
            scorer_classes: []
        }
    },
    methods: {
        GetScorerSessionInfo () {
            this.$http.get('/scorer/get_session').then( response => {
                if (response.data['status'] == 'failed') {
                    this.$router.push('/scorersignin');
                } else {
                    this.scorer_name = response.data['name'];
                    this.scorer_subjects = response.data['subjects'];
                    this.scorer_classes = response.data['classes'];
                }
            })
        }
    },
    created: function () {
        this.GetScorerSessionInfo();
    }
}
</script>
