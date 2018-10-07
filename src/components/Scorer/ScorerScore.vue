<template>
    <div>
        <b-row>
            <b-col>
                <p class="display-4">Score</p>
            </b-col>
            <b-col style="text-align:right">
                <b-btn @click="SubmitScores" style="margin-top:22px" variant="primary">{{submit_btn_text}}</b-btn>
            </b-col>
        </b-row>
        <b-row>
            <b-input-group prepend="DATE">
                <b-form-input type="date" v-model="date"></b-form-input>
                <b-input-group-append>
                    <b-btn @click="UpdateScores" variant="primary">{{update_btn_text}}</b-btn>
                </b-input-group-append>
            </b-input-group>
        </b-row>
        <b-row style="height: 10px"></b-row>
        <b-row>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th v-for="value in scorerboard_head">
                            {{value}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="values in scorerboard_body">
                        <td v-for="(value,index) in values">
                            <div v-if="index==0">
                                {{value}}
                            </div>
                            <div v-else>
                                <input type="text" v-model="value.score" class="form-control">
                                <input type="text" v-model="value.reason" class="form-control" placeholder="reason">
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </b-row>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs';
export default {
    name: "ScorerScore", 
    data: function() {
        return {
            scorerboard_head: [],
            scorerboard_body: [],
            scorerboard_size: 0,
            scorer_is_admin: false,
            date: "",
            update_btn_text: "Update",
            submit_btn_text: "Submit"
        }
    },
    methods: {
        GetDateToday () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10) 
                dd = '0'+dd;
            if(mm<10) 
                mm = '0'+mm;
            return yyyy+'-'+mm+'-'+dd;
        },
        UpdateIsAdmin () {
            this.$http.get('/scorer/get_session').then( response => {
                this.scorer_is_admin = response.data['admin'];
            });
        },
        UpdateScores () {
            this.update_btn_text = "Updating...";
            this.$http.get('/scorer/get_scores', {params: {
                'date': this.date
            }}).then( response => {
                this.scorerboard_head = response.data['scorerboard_head'];
                this.scorerboard_body = response.data['scorerboard_body'];
                this.scorerboard_size = response.data['scorerboard_size'];
                this.update_btn_text = "Update";
            })
        },
        GetScoreItemByIndex (index) {
            var i,j;
            var body = this.scorerboard_body;
            for (i=0; i<body.length; i++) {
                for (j=0; j<body[i].length; j++) {
                    if (typeof body[i][j] != "string") {
                        if (body[i][j]['index'] == index) {
                            return body[i][j];
                        }
                    }
                }
            }
        },
        SubmitScores () {
            var items_counter = this.scorerboard_size;
            var items = new Array();
            var item_reasons = new Array();

            for (var i = 0; i < items_counter; i++) {
                var score_item = this.GetScoreItemByIndex(i);
                items[i] = score_item.score;
                item_reasons[i] = score_item.reason;
            }

            this.submit_btn_text = "Uploading Scores"
            this.$http.post('/scorer/submit_score', qs.stringify({
                'scores': items,
                'score_reasons': item_reasons,
                'date': this.date
            }, {arrayFormat: 'repeat'})).then( response => {
                this.UpdateScores();
                this.submit_btn_text = "Recalculating sums and ranks...";
                this.$http.get('/scorer/update_totals').then( (response)=> {
                    this.submit_btn_text = "Submit";
                })
            })
        }
    },
    created: function() {
        this.date = this.GetDateToday();
        this.UpdateIsAdmin();
        this.UpdateScores();
    }
}
</script>
