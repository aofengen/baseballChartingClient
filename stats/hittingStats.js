$(function() {
	$.extend(BaseballChart, {
		hstats: {
			statsList: [],
			fetchAll: function() {
				//BUG: requires fetchAll to run twice before info will appear. Will run first time when tab is clicked, second when button is clicked
				let fetchStat = $.ajax({
					type: "GET",
					url: BaseballChart.API_BASE + "hstats",
					headers: {
						"authorization": window.localStorage.getItem("sessionToken")
					}
				})
				.done(function(data) {
					BaseballChart.hstats.statsList.splice(0);
					BaseballChart.hstats.statsList = data;
				})
				.fail(function(err) {
					alert("Get player stats Failed: " + err);
				});
			},
			getTripleSlash: function() {
				let AB = Number.parseInt($("#at-bats").val());
				let SI = Number.parseInt($("#singles").val());
				let DO = Number.parseInt($("#doubles").val());
				let TR = Number.parseInt($("#triples").val());
				let HR = Number.parseInt($("#home-runs").val());
				let BB = Number.parseInt($("#walks").val());
				let SF = Number.parseInt($("#sac-flies").val());
				let HBP = Number.parseInt($("#hit-by-pitches").val());
				let hits = (SI+DO+TR+HR);
				
				let AVG = (hits/AB);
				let OBP = (hits+BB+HBP)/(AB+BB+SF+HBP);
				let SLG = (SI + (DO * 2) + (TR * 3) + (HR * 4))/(AB);

				let OPS = AVG + OBP;

				$("#avg").val(AVG.toFixed(3));
				$("#obp").val(OBP.toFixed(3));
				$("#slg").val(SLG.toFixed(3));
				$("#ops").val(OPS.toFixed(3));

				document.getElementById("statsP").textContent = 'Also known as the Triple Slash line. The average AVG is calculated by taking the number of hits and divding ' +
				'them by the total number of at bats (H/AB). The on base percentage (OBP) is calculated by adding the number of hits, walks, and ' +
				'hit by pitches, then dividing that number by the total number of at bats, walks, hit by pitches, and sacrifice flies (H+BB+HBP' +
				'/AB+BB+HBP+SF). The slugging percentage (SLG) is calculated by adding the total number of bases, then dividing by the total ' +
				'number of at bats. When finding the total number of bases, a single equals 1 base, a double 2 bases, a triple 3 bases,' +
				' and a home run 4 bases ( (1B + (2B * 2) + (3B * 3) + (HR * 4))/(AB) ). On base Plus Slugging (OPS) is exactly as it sounds: ' +
				'add the OBP and SLG numbers together.';
			},
			getISO: function() {
				let AB = Number.parseInt($("#at-bats").val());
				let SI = Number.parseInt($("#singles").val());
				let DO = Number.parseInt($("#doubles").val());
				let TR = Number.parseInt($("#triples").val());
				let HR = Number.parseInt($("#home-runs").val());

				let hits = (SI+DO+TR+HR);
				
				let AVG = (hits/AB);
				let SLG = (SI + (DO * 2) + (TR * 3) + (HR * 4))/(AB);

				let ISO = (SLG-AVG);

				$("#isoField").val(ISO.toFixed(3));

				document.getElementById("statsP").textContent = "Isolated Power (ISO) is a stat that tries to quantify the power of a hitter." +
				" It is calculated by subtracting a player's batting average (AVG) from their slugging percentage (SLG). (SLG-AVG) A high ISO " +
				"means that a player has more extra-base hits.";
			},
			getKPer: function() {
				let K = Number.parseInt($("#strikeouts").val());
				let AB = Number.parseInt($("#at-bats").val());
				let BB = Number.parseInt($("#walks").val());
				let SF = Number.parseInt($("#sac-flies").val());
				let HBP = Number.parseInt($("#hit-by-pitches").val());

				let KPer = K/(AB+BB+SF+HBP);

				$("#kPerField").val((KPer.toFixed(3)) * 100);

				document.getElementById("statsP").textContent = "Strikeout Percentage (K%) is the percent of plate appearances where a " +
				"batter strikes out. ( K/(AB+BB+SF+HBP) ) The lower the number, the better.";
			},
			getBBPer: function() {
				let AB = Number.parseInt($("#at-bats").val());
				let BB = Number.parseInt($("#walks").val());
				let SF = Number.parseInt($("#sac-flies").val());
				let HBP = Number.parseInt($("#hit-by-pitches").val());

				let BBPer = BB/(AB+BB+SF+HBP);

				$("#bbPerField").val((BBPer.toFixed(3)) * 100);

				document.getElementById("statsP").textContent = "Walk Percentage (BB%) is the percent of plate appearances where a " +
				"batter walks. ( BB/(AB+BB+SF+HBP) ) The higher the number, the better";
			},
			getSBPer: function() {
				let SB = Number.parseInt($("#stolen-bases").val());
				let CS = Number.parseInt($("#caught-stealing").val());

				let SBPer = SB/(SB+CS);

				$("#sbPerField").val((SBPer.toFixed(3)) * 100);

				document.getElementById("statsP").textContent = "Stolen Base Percentage (SB%) is the percent of successful stolen base " +
				"by a runner. The higher the number, the better."
			},
			saveStats: function() {
				let team = $("#Hstats-teamList option:selected").text();
				let player = $("#Hstats-playerList option:selected").text();
				let atbats = $("#at-bats").val();
				let singles = $("#singles").val();
				let doubles = $("#doubles").val();
				let triples = $("#triples").val();
				let homeruns = $("#home-runs").val();
				let strikeouts = $("#strikeouts").val();
				let walks = $("#walks").val();
				let hitbypitches = $("#hit-by-pitches").val();
				let sacflies = $("#sac-flies").val();
				let rbis = $("#runs-batted-in").val();
				let runs = $("#runs").val();
				let stolenbases = $("#stolen-bases").val();
				let caughtstealing = $("#caught-stealing").val();
				
				let playerInDB = BaseballChart.hstats.isPlayerInDB(player);
				if (playerInDB === false) {
					let postData = {
						team: team,
						player: player,
						abs: atbats,
						singles: singles,
						doubles: doubles,
						triples: triples,
						hrs: homeruns,
						strikeouts: strikeouts,
						walks: walks,
						hbp: hitbypitches,
						sf: sacflies,
						rbis: rbis,
						runs: runs,
						sb: stolenbases,
						cs: caughtstealing
					}
					let newStats = $.ajax({
						type: "POST",
						url: BaseballChart.API_BASE + "hstats",
						data: JSON.stringify(postData),
						contentType: "application/json"
					});
					alert(player + "\'s stats added to database");
				} else {
					alert(player + " already has stats in database");
				}
			},
			isPlayerInDB: function(playerName) {
				BaseballChart.hstats.fetchAll();
				let stats = BaseballChart.hstats.statsList;
				let playerInDB = false;
				for (let i = 0; i <= stats.length; i++) {
					if (i == stats.length) {
						break;
					} else if (stats[i].player == playerName) {
						return playerInDB = true;
					}
				}
				return playerInDB;
			},
			setStats: function() {
				BaseballChart.hstats.clearStats();
				let hittingStats = BaseballChart.hstats.statsList;
				let playerName = $("#Hstats-playerList option:selected").text();
				if (hittingStats.length < 1) {
					BaseballChart.hstats.fetchAll();
					alert("Failed to get stats. Please try again");
				} else {
					for (let i = 0; i <= hittingStats.length; i++) {
						if (i == hittingStats.length) {
							BaseballChart.hstats.fetchAll();
							alert("Player not found in database. Please save stats first or try again.");
						} else if (hittingStats[i].player == playerName) {
							$("#at-bats").val(hittingStats[i].atbats);
							$("#singles").val(hittingStats[i].singles);
							$("#doubles").val(hittingStats[i].doubles);
							$("#triples").val(hittingStats[i].triples);
							$("#home-runs").val(hittingStats[i].homeruns);
							$("#strikeouts").val(hittingStats[i].strikeouts);
							$("#walks").val(hittingStats[i].walks);
							$("#hit-by-pitches").val(hittingStats[i].hitbypitches);
							$("#sac-flies").val(hittingStats[i].sacflies);
							$("#runs-batted-in").val(hittingStats[i].rbis);
							$("#runs").val(hittingStats[i].runs);
							$("#stolen-bases").val(hittingStats[i].stolenbases);
							$("#caught-stealing").val(hittingStats[i].caughtstealing);
							break;
						}
					}
				}
			},
			clearStats: function() {
				$("#at-bats").val("");
				$("#singles").val("");
				$("#doubles").val("");
				$("#triples").val("");
				$("#home-runs").val("");
				$("#strikeouts").val("");
				$("#walks").val("");
				$("#hit-by-pitches").val("");
				$("#sac-flies").val("");
				$("#runs-batted-in").val("");
				$("#runs").val("");
				$("#stolen-bases").val("");
				$("#caught-stealing").val("");
			},
			deleteStats: function() {
				let playerName = $("#Hstats-playerList option:selected").text();
				let playerInDB = BaseballChart.hstats.isPlayerInDB(playerName);
				if (playerInDB === false) {
					console.log(playerName + " has no stats in the database");
				} else {
					let deleteConfirm = confirm("Are you sure you want to delete stats for " + playerName + "?");
					if (deleteConfirm === false) {
						alert(playerName + "\'s stats were not deleted.");
					} else {
						let stats = BaseballChart.hstats.statsList;
						for (let i = 0; i <= stats.length; i++) {
							if (i == length) {
								console.log(playerName + " has no stats in the database");
							} else if (stats[i].player == playerName) {
								let deleteData = {player: playerName};
								let deletePlayerStats = $.ajax({
									type: "DELETE",
									url: BaseballChart.API_BASE + "hstats",
									data: JSON.stringify(deleteData),
									contentType: "application/json"
								});
								deletePlayerStats.fail(function() {
									alert("Failed to delete " + playerName + "\'s stats. Please try again");
								});
								BaseballChart.hstats.clearStats();
								BaseballChart.hstats.fetchAll();
								console.log(playerName + "\'s stats were deleted.");
								i += stats.length;
							}
						}
					}
				}
			}
		}
	})
	$("#tripSlash").on("click", BaseballChart.hstats.getTripleSlash);
	$("#isoButton").on("click", BaseballChart.hstats.getISO);
	$("#kPerButton").on("click", BaseballChart.hstats.getKPer);
	$("#bbPerButton").on("click", BaseballChart.hstats.getBBPer);
	$("#sbPerButton").on("click", BaseballChart.hstats.getSBPer);
	$("#saveHStats").on("click", BaseballChart.hstats.saveStats);
	$("#getHStats").on("click", BaseballChart.hstats.setStats);
	$("#clearHStats").on("click", BaseballChart.hstats.clearStats);
	$("#deleteHStats").on("click", BaseballChart.hstats.deleteStats);
})