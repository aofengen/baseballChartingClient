$(function() {
	$.extend(BaseballChart, {
		Pstats: {
			statsList: [],
			getRatios: function() {
				let ER = Number.parseInt($("#earnedRunsAllowed").val());
				let R = Number.parseInt($("#runsAllowed").val());
				let IP = Number.parseInt($("#inningsPitched").val());
				let BB = Number.parseInt($("#walksAllowed").val());
				let H = Number.parseInt($("#hitsAllowed").val());

				let ERA = (ER * 9)/IP;
				let RA = (R * 9)/IP;
				let WHIP = (BB + H)/IP;

				$("#era").val(ERA.toFixed(2));
				$("#ra").val(RA.toFixed(2));
				$("#whip").val(WHIP.toFixed(2));

				document.getElementById("PstatsP").textContent = "A pitcher's Earned Run Average (ERA) is calculated by taking the number of" +
				" earned runs allowed (ER) multiplied by 9, and dividing it by the number of innings pitched (IP) ( (ERA * 9)/IP ). Their " + 
				" WHIP (Walks + Hits per Inning Pitched) is as simple as it sounds: (BB+H)/IP. Finally, while not used as often, the Run Average" +
				" is the total number of runs allowed (RA) multiplied by 9, then divided by the number of innings pitched ( (RA * 9)/ IP )."; 
			},
			getK9: function() {
				let IP = Number.parseInt($("#inningsPitched").val());
				let K = Number.parseInt($("#battersStruckOut").val());

				let K9 = (K * 9)/IP;

				$("#ksPer9").val(K9.toFixed(2));

				document.getElementById("PstatsP").textContent = "Strikeouts per 9 innings (K/9) shows the number of batters struck out by a " +
				"pitcher every 9 innings, or every game. ( (K * 9) / IP ). The higher the number, the better."

			},
			getBB9: function() {
				let IP = Number.parseInt($("#inningsPitched").val());
				let BB = Number.parseInt($("#walksAllowed").val());

				let BB9 = (BB * 9)/IP;

				$("#walksPer9").val(BB9.toFixed(2));

				document.getElementById("PstatsP").textContent = "Walks per 9 innings (BB/9) shows the number of walks allowed by a " +
				"pitcher every 9 innings, or every game. ( (BB * 9) / IP ). The lower the number, the better."
			},
			getCSPer: function() {
				let SB = Number.parseInt($("#stolenBasesAllowed").val());
				let CS = Number.parseInt($("#runnersCaughtStealing").val());

				let CSPer = CS/(SB+CS);

				$("#csPerField").val((CSPer.toFixed(3)) * 100);

				document.getElementById("PstatsP").textContent = "Stolen Base Percentage (SB%) is the percent of successful stolen bases " +
				"against a pitcher. The lower the number, the better. *NOTE: This stat is heavily affected by the catcher behind the plate" +
				", and may not be a quality method of ranking pitchers.*"
			},
			isPlayerInDB: function(playerName, teamName) {
				BaseballChart.Pstats.fetchAll();
				let stats = BaseballChart.Pstats.statsList;
				let playerInDB = false;
				for (let i = 0; i <= stats.length; i++) {
					if (i == stats.length) {
						break;
					} else if (stats[i].teamName == teamName && stats[i].player == playerName) {
						return playerInDB = true;
					}
				}
				return playerInDB;
			},
			saveStats: function() {
				let team = $("#Pstats-teamList option:selected").text();
				let player = $("#Pstats-playerList option:selected").text();
				let position = $("#Pstats-positionList option:selected").text();
				let inningsPitched = $("#inningsPitched").val();
				let wins = $("#wins").val();
				let losses = $("#losses").val();
				let saves = $("#saves").val();
				let earnedrunsallowed = $("#earnedRunsAllowed").val();
				let runsallowed = $("#runsAllowed").val();
				let strikeouts = $("#battersStruckOut").val();
				let walksallowed = $("#walksAllowed").val();
				let hits = $("#hitsAllowed").val();
				let wildpitches = $("#wildPitches").val();
				let pickoffs = $("#pickOffs").val();
				let stolenbases = $("#stolenBasesAllowed").val();
				let caughtstealing = $("#runnersCaughtStealing").val();
				let homerunsallowed = $("#homeRunsAllowed").val();

				let playerInDB = BaseballChart.Pstats.isPlayerInDB(team, player);
				if (playerInDB === false) {
					let postData = {
						team: team,
						player: player,
						position: position,
						ip: inningsPitched,
						wins: wins,
						losses: losses,
						saves: saves,
						er: earnedrunsallowed,
						r: runsallowed,
						strikeouts: strikeouts,
						walksallowed: walksallowed,
						hits: hits,
						wp: wildpitches,
						po: pickoffs,
						sb: stolenbases,
						cs: caughtstealing,
						hr: homerunsallowed
					}
					let newStats = $.ajax({
						type: "POST",
						url: BaseballChart.API_BASE + "pstats",
						data: JSON.stringify(postData),
						contentType: "application/json"
					});
					newStats.fail(function() {
						alert("Failed to add " + player + "\'s pitching stats. Please try again.")
					})
					alert(player + "\'s pitching stats added to database");
				} else {
					let postData = {
						team: team,
						player: player,
						position: position,
						ip: inningsPitched,
						wins: wins,
						losses: losses,
						saves: saves,
						er: earnedrunsallowed,
						r: runsallowed,
						strikeouts: strikeouts,
						walksallowed: walksallowed,
						hits: hits,
						wp: wildpitches,
						po: pickoffs,
						sb: stolenbases,
						cs: caughtstealing,
						hr: homerunsallowed
					}
					let newStats = $.ajax({
						type: "PUT",
						url: BaseballChart.API_BASE + "pstats",
						data: JSON.stringify(postData),
						contentType: "application/json"
					});
					newStats.fail(function() {
						alert("Failed to update " + player + "\'s pitching stats. Please try again.")
					})
					alert(player + "\'s pitching stats were updated.")
				}
			},
			clearStats: function() {
				$("#inningsPitched").val("");
				$("#wins").val("");
				$("#losses").val("");
				$("#saves").val("");
				$("#earnedRunsAllowed").val("");
				$("#runsAllowed").val("");
				$("#battersStruckOut").val("");
				$("#walksAllowed").val("");
				$("#hitsAllowed").val("");
				$("#wildPitches").val("");
				$("#pickOffs").val("");
				$("#stolenBasesAllowed").val("");
				$("#runnersCaughtStealing").val("");
				$("#homeRunsAllowed").val("");
			},
			fetchAll: function() {
				//BUG: requires fetchAll to run twice before info will appear. Will run first time when tab is clicked, second when button is clicked
				let fetchStat = $.ajax({
					type: "GET",
					url: BaseballChart.API_BASE + "pstats",
					headers: {
						"authorization": window.localStorage.getItem("sessionToken")
					}
				})
				.done(function(data) {
					BaseballChart.Pstats.statsList.splice(0);
					BaseballChart.Pstats.statsList = data;
				})
				.fail(function(err) {
					alert("Get player stats Failed: " + err);
				});
			},
			setStats: function() {
				BaseballChart.Pstats.clearStats();
				let stats = BaseballChart.Pstats.statsList;
				let teamName = $("#Pstats-teamList option:selected").text();
				let playerName = $("#Pstats-playerList option:selected").text();
				if (stats.length < 1) {
					BaseballChart.Pstats.fetchAll();
					alert("Failed to get stats. Please try again");
				} else {
					for (let i = 0; i <= stats.length; i++) {
						if (i == stats.length) {
							BaseballChart.Pstats.fetchAll();
							alert(playerName + " not found in database. Please save stats first or try again.");
						} else if (stats[i].team == teamName && stats[i].player == playerName) {
							$("#inningsPitched").val(stats[i].IP);
							$("#wins").val(stats[i].wins);
							$("#losses").val(stats[i].losses);
							$("#saves").val(stats[i].saves);
							$("#earnedRunsAllowed").val(stats[i].earnedrunsallowed);
							$("#runsAllowed").val(stats[i].runsallowed);
							$("#battersStruckOut").val(stats[i].strikeouts);
							$("#walksAllowed").val(stats[i].walksallowed);
							$("#hitsAllowed").val(stats[i].hits);
							$("#wildPitches").val(stats[i].wildpitches);
							$("#pickOffs").val(stats[i].pickoffs);
							$("#stolenBasesAllowed").val(stats[i].stolenbases);
							$("#runnersCaughtStealing").val(stats[i].caughtstealing);
							$("#homeRunsAllowed").val(stats[i].homerunsallowed);
							break;
						}
					}
				}
			},
			deleteStats: function() {
				let teamName = $("#Pstats-teamList option:selected").text();
				let playerName = $("#Pstats-playerList option:selected").text();
				let playerInDB = BaseballChart.Pstats.isPlayerInDB(playerName);
				if (playerInDB === false) {
					alert(playerName + " (" + teamName + ") has no pitching stats in the database");
				} else {
					let deleteConfirm = confirm("Are you sure you want to delete the pitching stats for " + playerName + " (" + teamName + ")?");
					if (deleteConfirm === false) {
						alert("Pitching stats for " + playerName +  " (" + teamName + ") were not deleted.");
					} else {
						let stats = BaseballChart.Pstats.statsList;
						for (let i = 0; i <= stats.length; i++) {
							if (i == length) {
								alert(playerName + " (" + teamName + ") does not have pitching stats in the database");
							} else if (stats[i].team== teamName && stats[i].player == playerName) {
								let deleteData = {team: teamName, player: playerName};
								let deletePlayerStats = $.ajax({
									type: "DELETE",
									url: BaseballChart.API_BASE + "pstats",
									data: JSON.stringify(deleteData),
									contentType: "application/json"
								});
								deletePlayerStats.fail(function() {
									alert("Failed to delete pitching stats for " + playerName + " (" + teamName + "). Please try again");
								});
								BaseballChart.Pstats.clearStats();
								BaseballChart.Pstats.fetchAll();
								alert("Pitching stats for " + playerName +  " (" + teamName + ") were deleted.");
								i += stats.length;
							}
						}
					}
				}
			}
		}
	})
	$("#ratios").on("click", BaseballChart.Pstats.getRatios);
	$("#ksPer9Button").on("click", BaseballChart.Pstats.getK9);
	$("#walksPer9Button").on("click", BaseballChart.Pstats.getBB9);
	$("#csPerButton").on("click", BaseballChart.Pstats.getCSPer);
	$("#savePStats").on("click", BaseballChart.Pstats.saveStats);
	$("#getPStats").on("click", BaseballChart.Pstats.setStats);
	$("#clearPStats").on("click", BaseballChart.Pstats.clearStats);
	$("#deletePStats").on("click", BaseballChart.Pstats.deleteStats);
})