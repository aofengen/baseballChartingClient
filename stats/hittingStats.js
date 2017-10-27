$(function() {
	$.extend(BaseballChart, {
		Hstats: {
			stats: [],
			setStats: function() {
				BaseballChart.Hstats.fetchStats();
				let playerName = $("#Hstats-playerList option:selected").text();
				for (let i = 0; i < stats.length; i++) {
					if (stats[i].player == playerName) {
						$("#at-bats").val(stats[i].atbats)
					}
				}
			},
			fetchStats: function() {
				let fetchStat = $.ajax({
					type: "GET",
					url: BaseballChart.API_BASE + "hstats",
					headers: {
						"authorization": window.localStorage.getItem("sessionToken")
					}
				})
				.done(function(data) {
					BaseballChart.Hstats.stats = data;
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
				'number of at bats. When finding the total number of bases, a single equals 1 base, a double  2 bases, a triple 3 bases,' +
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
				BaseballChart.Hstats.fetchStats()
				let playerInDB = BaseballChart.Hstats.isPlayerInDB;
				if (playerInDB === false) {
					let statsBundle = {
						team: $("#Hstats-teamList option:selected").text(),
						player: $("#Hstats-playerList option:selected").text(),
						atbats: $("#at-bats").val(),
						singles: $("#singles").val(),
						doubles: $("#doubles").val(),
						triples: $("#triples").val(),
						homeruns: $("#home-runs").val(),
						strikeouts: $("#strikeouts").val(),
						walks: $("#walks").val(),
						hitbypitches: $("#hit-by-pitches").val(),
						sacflies: $("#sac-flies").val(),
						rbis: $("#runs-batted-in").val(),
						runs: $("#runs").val(),
						stolenbases: $("#stolen-bases").val(),
						caughtstealing: $("#caught-stealing").val()
					};
					let postData = {hstats: statsBundle};
					let newStats = $.ajax({
						type: "POST",
						url: BaseballChart.API_BASE + "hstats",
						data: JSON.stringify(postData),
						contentType: "application/json"
					});
					alert("Player added to database");
				} else {
					alert("Player already in database");
				}
			},
			isPlayerInDB: function() {
				let stats = BaseballChart.Hstats.stats;
				let playerName = $("#Hstats-playerList option:selected").text()
				let playerInDB = false;
				for (let i = 0; i < stats.length; i++) {
					if (stats[i].player == playerName) {
						playerInDB = true
						break;
					}
				}
				return playerInDB;
			}
		}
	})
	$("#tripSlash").on("click", BaseballChart.Hstats.getTripleSlash);
	$("#isoButton").on("click", BaseballChart.Hstats.getISO);
	$("#kPerButton").on("click", BaseballChart.Hstats.getKPer);
	$("#bbPerButton").on("click", BaseballChart.Hstats.getBBPer);
	$("#sbPerButton").on("click", BaseballChart.Hstats.getSBPer);
	$("#saveHStats").on("click", BaseballChart.Hstats.saveStats);
})