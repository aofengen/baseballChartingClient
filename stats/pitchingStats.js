$(function() {
	$.extend(BaseballChart, {
		Pstats: {
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
				", and may not be a quality method of ranking a pitcher.*"
			}
		}
	})
	$("#ratios").on("click", BaseballChart.Pstats.getRatios);
	$("#ksPer9Button").on("click", BaseballChart.Pstats.getK9);
	$("#walksPer9Button").on("click", BaseballChart.Pstats.getBB9);
	$("#csPerButton").on("click", BaseballChart.Pstats.getCSPer);
})