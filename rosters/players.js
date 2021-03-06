$(function() {
	$.extend(BaseballChart, {
		player: {
			playerList: [],
			create: function() {
				let playerNumber = Number.parseInt($("#playerNumber").val());
				let createPlayer = {
					teamName: $("#player-teamList option:selected").text(),
					name: $("#playerName").val(),
					number: playerNumber
				};
				let postData = {player: createPlayer};
				let newPlayer = $.ajax({
					type: "POST",
					url: BaseballChart.API_BASE + "player",
					data: JSON.stringify(postData),
					contentType: "application/json"
				});
				newPlayer.done(function(data) {
					BaseballChart.player.playerList.push(data.player);
					$("#playerName").val("");
					$("#playerNumber").val("");
				})
			},
			cancel: function() {
				$("#playerName").val("");
				$("#playerNumber").val("");
			},
			fetchAll: function() {
 				let fetchPlayers = $.ajax({
 					type: "GET",
 					url: BaseballChart.API_BASE + "player",
 					headers: {
 						"authorization": window.localStorage.getItem("sessionToken")
 					}
 				})
 				.done(function(data) {
 					BaseballChart.player.playerList = data;
 				})
 				.fail(function(err) {
 					alert("Get Player Failed: " + err);
 				});
 			},
			setPlayers: function(type) {
 				BaseballChart.player.fetchAll;
				let players = BaseballChart.player.playerList;
				let len = players.length;
				let opts;
				for (let i = 0; i < len; i++) {
					opts += "<option value='" + players[i].id +"'>" + players[i].name + "</option>";
				}
				$("#" + type + "-playerList").children().remove();
				$("#" + type + "-playerList").append(opts);
			},
			setPlayersOnTeam: function(teamName) {
				let players = BaseballChart.player.playerList;
				let len = players.length;
				let opts;
				for (let i = 0; i < len; i++) {
					if (players[i].teamName == teamName) {
						opts += "<option value='" + players[i].id +"'>" + players[i].name + "</option>";
					}
				}
				$("#" + type + "-playerList").children().remove();
				$("#" + type + "-playerList").append(opts);
			},
			delete: function() {
				let team = $("#player-teamList option:selected").text();
 				let player = $("#player-playerList option:selected").text();
 				let deleteData = {team: team, player: player};
 				let deletePlayer = $.ajax({
 					type: "DELETE",
 					url: BaseballChart.API_BASE + "player",
 					data: JSON.stringify(deleteData),
 					contentType: "application/json"
 				});
 				for (let i = 0; i < BaseballChart.player.playerList.length; i++) {
 					if (BaseballChart.player.playerList[i].name == player && BaseballChart.player.playerList[i].teamName == team) {
 						BaseballChart.player.playerList.splice(i, 1);
 					}
 				}
 				BaseballChart.player.setPlayers("player");
 				deletePlayer.fail(function() {
 					alert("Failed to delete");
 				});
 			}
		}
	})
	$("#playerSave").on("click", BaseballChart.player.create);
	$("#playerCancel").on("click", BaseballChart.player.cancel);
	$("#playerDelete").on("click", BaseballChart.player.delete);
	if (window.localStorage.getItem("sessionToken")) {
 		BaseballChart.player.fetchAll();
 	}
})