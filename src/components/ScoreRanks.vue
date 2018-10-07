<template>
    <div>
        <b-row style="height: 40px"></b-row>
        <b-row>
            <b-col>
                <h1 class="display-3" style="text-align:center">Ranks</h1>
            </b-col>
        </b-row>
        <b-row style="height: 20px"></b-row>
        <b-row>
            <b-col>
                <b-input-group prepend="TYPE">
                    <b-form-select v-model="scoreranks_type" :options="type_options" />
                    <b-input-group-append>
                        <b-btn @click="update_scoreranks" variant="primary">{{update_btn_text}}</b-btn>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row style="height: 15px"></b-row>
        <b-row>
            <b-col>
                <b-table :items="scoreranks_data"></b-table>
            </b-col>
        </b-row>
        <b-row style="height: 15px"></b-row>
    </div>
</template>

<script>
export default {
    name: "ScoreRanks",
    data: function() {
        return {
            scoreranks_data: [],
            scoreranks_type: 'daily',
            update_btn_text: "Update",
            type_options: [
                { value: 'daily', text: 'Daily' },
                { value: 'weekly', text: 'Weekly' },
                { value: 'monthly', text: 'Monthly' },
                { value: 'semesterly', text: 'Semesterly' }
            ]
        }
    },
    methods: {
        update_scoreranks() {
            this.update_btn_text = "Updating...";
            this.$http.get('/scorerank/get_by_type', {params: {
                'type': this.scoreranks_type
            }}).then(response => {
                this.scoreranks_data = response.data['data'];
                this.update_btn_text = "Update";
            });
            
        }
    },
    created: function() {
        this.update_scoreranks();
    }
}
</script>
