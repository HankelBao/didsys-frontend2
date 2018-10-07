<template>
    <div>
        <b-row style="height: 40px"></b-row>
        <b-row>
            <b-col>
                <h1 class="display-3" style="text-align:center">ScoreBoard</h1>
            </b-col>
        </b-row>
        <b-row style="height: 20px"></b-row>
        <b-row>
            <b-col>
                <b-input-group prepend="DATE">
                    <b-form-input type="date" v-model="scoreboard_date"></b-form-input>
                    <b-input-group-append>
                        <b-btn @click="update_scoreboard" variant="primary">{{update_btn_text}}</b-btn>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row style="height: 15px"></b-row>
        <b-row>
            <b-col>
                <b-table :items="scoreboard_data"></b-table>
            </b-col>
        </b-row>
        <b-row style="height: 15px"></b-row>
    </div>
</template>

<script>
export default {
    name: "ScoreDaily",
    data: function () {
        return {
            scoreboard_data: [],
            scoreboard_date: "",
            update_btn_text: "Update"
        }
    },
    methods: {
        update_scoreboard () {
            this.update_btn_text = "Updating..."
            this.$http.get('/scoreboard/get_by_date', {params: {
                'date': this.scoreboard_date
            }}).then(response => {
                this.scoreboard_data = response.data['data'];
                this.update_btn_text = "Update";
            });
        },
        get_date_today () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10) 
                dd = '0'+dd;
            if(mm<10) 
                mm = '0'+mm;
            return yyyy+'-'+mm+'-'+dd;
        }
    },
    created: function() {
        this.scoreboard_date = this.get_date_today();
        this.update_scoreboard();
    }
}
</script>
