 $(function() {
 		$.extend(BaseballChart, {
 			team: {
 				teamList: [],
 				create: function() {
 					let teamName = $("#teamName").val()
	 				let postData = {teamName: teamName};
	 				let newTeam = $.ajax({
	 					type: "POST",
	 					url: BaseballChart.API_BASE + "team",
	 					data: JSON.stringify(postData),
	 					contentType: "application/json"
	 				});
	 				newTeam.done(function(postData) {
	 					BaseballChart.team.teamList.push(postData.team);
	 					$("#teamName").val("");
 					});
	 			},
	 			fetchAll: function() {
	 				let fetchTeams = $.ajax({
	 					type: "GET",
	 					url: BaseballChart.API_BASE + "team",
	 					headers: {
	 						"authorization": window.localStorage.getItem("sessionToken")
	 					}
	 				})
	 				.done(function(data) {
	 					BaseballChart.team.teamList = data;
	 				})
	 				.fail(function(err) {
	 					alert("Get Teams Failed: " + err);
	 				});
	 			},
	 			setTeams: function(type) {
	 				BaseballChart.team.fetchAll;
					let teams = BaseballChart.team.teamList;
					let len = teams.length;
					let opts;
					for (let i = 0; i < len; i++) {
						opts += "<option value='" + teams[i].id +"'>" + teams[i].teamName + "</option>";
					}
					$("#" + type + "-teamList").children().remove();
					$("#" + type + "-teamList").append(opts);
				},
	 			delete: function() {
	 				let team = $("#team-teamList option:selected").text();
	 				let deleteData = {team: team};
	 				let deleteTeam = $.ajax({
	 					type: "DELETE",
	 					url: BaseballChart.API_BASE + "team",
	 					data: JSON.stringify(deleteData),
	 					contentType: "application/json"
	 				});
	 				for (let i = 0; i < BaseballChart.team.teamList.length; i++) {
	 					if (BaseballChart.team.teamList[i].teamName == team) {
	 						BaseballChart.team.teamList.splice(i, 1);
	 					}
	 				}
	 				BaseballChart.team.setTeams("team");
	 				deleteTeam.fail(function() {
	 					alert("Failed to delete");
	 				});
	 			},
	 			cancel: function() {
	 				$("#teamName").val("")
	 			}
 			}
 		});
 		$("#teamSave").on("click", BaseballChart.team.create);
 		$("#teamCancel").on("click", BaseballChart.team.cancel);
 		$("#teamDelete").on("click", BaseballChart.team.delete);
 		if (window.localStorage.getItem("sessionToken")) {
 			BaseballChart.team.fetchAll();
 		}
 })