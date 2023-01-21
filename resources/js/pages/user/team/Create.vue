<template>
  <div class="team">
    <div class="container-fluid" style="padding: 1rem">
      <div class="row">
        <div class="col-md-12">
          <!-- Top section -->
          <div class="text-center" style="margin-top: 1rem">
            <p>
              Welcome to the "Create a Team" section of The Sunday Cup! We're excited to
              have you here and look forward to helping you create your very own team.
            </p>
            <p>
              Creating a team on our platform is easy and straightforward. To get started,
              simply click on the "Create a Team" button located below. This will bring up
              a form where you'll be prompted to enter your team name and upload a team
              logo! You can also choose team motto!
            </p>
            <p>
              Once you've filled out the form and hit submit, your team will be created
              and added to our league. You'll be the captain of your team and will have
              the ability to invite other players to join your team via the team code
              feature, set your team's schedule, and compete in matches against other
              teams in our league.
            </p>
            <p>
              We wish you all the best in creating a team and competing in our league.
              Good luck, and have fun Summoner!
            </p>
          </div>
          <div class="d-flex justify-content-center">
            <button
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#createTeamModal"
            >
              Create a Team
            </button>
            <!-- Modal for Team Creation -->
            <div class="modal" tabindex="-1" role="dialog" id="createTeamModal">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Create a Team</h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                      <label for="teamName">Team Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="teamName"
                        v-model="teamName"
                        placeholder="Enter team name"
                      />
                    </div>
                    <div class="form-group">
                      <label for="teamLogo">Team Logo</label>
                      <input
                        type="file"
                        class="form-control-file"
                        id="teamLogo"
                        ref="teamLogo"
                        @change="handleFileUpload"
                      />
                    </div>
                    <div class="form-group">
                      <label for="teamMotto">Team Motto</label>
                      <input
                        type="text"
                        class="form-control"
                        id="teamMotto"
                        v-model="teamMotto"
                        placeholder="Enter team motto"
                      />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">
                      Close
                    </button>
                    <button type="button" class="btn btn-primary" @click="createTeam">
                      Create Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- HR -->
        <hr />
        <!-- Bottom section -->
        <div class="text-center" style="margin-top: 1rem">
          <p>
            Welcome to the "Join a Team" section of The Sunday Cup, our eSports League
            platform! We're excited to have you here and look forward to helping you join
            one of our teams.
          </p>
          <p>
            To join a team, you will need to obtain the unique team code from the team
            captain or a current team member.
          </p>
          <p>
            This will add you to the team and you will be able to participate in matches
            and tournaments with the team. As a team member, you'll also be able to see
            the schedule of the team, and see the team's statistics.
          </p>
          <p>
            Please note that the team code is unique to every team and it's important to
            enter the correct code to join the desired team. If you have any issues or are
            unsure of the team code, please reach out to the team captain or the league
            administrator for assistance.
          </p>
          <p>
            We wish you all the best in joining a team and competing in our league. Good
            luck, and have fun!
          </p>
        </div>
        <div class="d-flex justify-content-center">
          <input
            class="form-control"
            style="width: 10vw"
            placeholder="Team Code"
            v-model="teamCode"
          />
          <button class="btn btn-secondary ml-2">
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CreateTeam",
  created() {},
  data() {
    return {
      teamCode: "",
      teamName: "",
      teamLogo: null,
      teamMotto: "",
    };
  },
  props: {},
  methods: {
    handleFileUpload() {
      this.teamLogo = this.$refs.teamLogo.files[0];
    },

    createTeam() {
      axios
        .post("/api/teamcreate", {
          name: this.teamName,
          logo: this.teamLogo,
          motto: this.teamMotto,
        })
        .then((response) => {
          this.teamName = "";
          this.teamLogo = null;
          this.teamMotto = "";
          $("#createTeamModal").modal("hide");

          //Show a Success Message
          this.$toasted.success("Team created successfully!", {
            position: "top-center",
            duration: 3000,
          });
        })
        .catch((error) => {
          // Handle the error response
          this.$toasted.error(
            "An error occurred while creating the team. Please try again.",
            {
              position: "top-center",
              duration: 3000,
            }
          );
        });
    },
    uploadTeamLogo(event) {
      this.teamLogo = event.target.files[0];
    },
  },
};
</script>
