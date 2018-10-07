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
                <b-input-group>
                    <b-input-group-prepend is-text>
                        Class
                    </b-input-group-prepend>
                    <b-form-select v-model="query_class" :options="class_names" />
                    
                    <b-input-group-append is-text>
                        Subject
                    </b-input-group-append>
                    <b-form-select v-model="query_subject" :options="subject_names" />

                    <b-input-group-append is-text>
                        Scorer
                    </b-input-group-append>
                    <b-form-select v-model="query_scorer" :options="scorer_names" />

                    <b-input-group-append is-text>
                        Loss Only
                    </b-input-group-append>
                    <b-input-group-append is-text>
                        <input v-model="query_loss" type="checkbox" >
                    </b-input-group-append>

                    <b-input-group-append>
                        <b-btn @click="update_moments" variant="primary">{{update_btn_text}}</b-btn>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row style="height: 15px"></b-row>
        <b-row>
            <b-col>
                <b-table :items="scoremoments_data"></b-table>
            </b-col>
        </b-row>
        <b-row style="height: 15px"></b-row>
    </div>
</template>

<script>
var str_selecting_all = "All";
export default {
  name: "ScoreMoments",
  data: function() {
    return {
      scoremoments_data: [],
      query_scorer: str_selecting_all,
      scorer_names: [],
      query_class: str_selecting_all,
      class_names: [],
      query_subject: str_selecting_all,
      subject_names: [],
      query_loss: false,
      update_btn_text: "Update"
    };
  },
  methods: {
    load_scorer_names () {
        this.$http.get('/scorers/get_names').then( response => {
            this.scorer_names = response.data;
            this.scorer_names.unshift(str_selecting_all);
        });
    },
    load_class_names () {
        this.$http.get('/classes/get_names').then( response => {
            this.class_names = response.data;
            this.class_names.unshift(str_selecting_all);
        });
    },
    load_subjects_names () {
        this.$http.get('/subjects/get_names').then( response => {
            this.subject_names = response.data;
            this.subject_names.unshift(str_selecting_all);
        });
    },
    update_moments () {
        var query_params = {}
        if (this.query_class != str_selecting_all)
            query_params['class'] = this.query_class;
        if (this.query_subject != str_selecting_all)
            query_params['subject'] = this.query_subject;
        if (this.query_scorer != str_selecting_all)
            query_params['scorer'] = this.query_scorer;
        if (this.query_loss == true)
            query_params['loss_only'] = true;
        this.update_btn_text = "Updating...";
        this.$http.get("/scoremoments/query", {params: query_params}).then( response => {
            this.scoremoments_data = response.data;
            this.update_btn_text = "Update";
        });
    }
  },
  created: function() {
      this.load_scorer_names();
      this.load_class_names();
      this.load_subjects_names();
      this.update_moments();
  }
};
</script>
