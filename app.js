$(function() {
	let BaseballChart = (function($, undefined) {
		let API_BASE = "http://localhost:3000/api/";
		let teams = [];
		let setAuthHeader = function(sessionToken) {
			window.localStorage.setItem("sessionToken", sessionToken);
			//set the authorization header
			//this can be done on individual calls
			//here we showcase ajaxSetup as a global tool
			$.ajaxSetup({
				"headers": {
					"Authorization": sessionToken
				}
			});
		};

		//public
		return {
			API_BASE: API_BASE,
			setAuthHeader: setAuthHeader
		};
	})(jQuery);

	//ensure .disabled aren't clickable
	$(".nav-tabs a[data-toggle='tab']").on("click", function(e){
		let token = window.localStorage.getItem("sessionToken");
		if ($(this).hasClass("disabled") && !token) {
			e.preventDefault();
			return false;
		}
	});

	//bind tab change events
	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
		let target = $(e.target).attr("href"); //activated tab
		if (target === "#teams") {
			BaseballChart.team.setTeams("team");
		}
		if (target === "#players") {
			BaseballChart.team.setTeams("player");
			BaseballChart.player.setPlayers("player")
		}
		if (target === "#Hstats") {
			BaseballChart.team.setTeams("Hstats");
			BaseballChart.player.setPlayers("Hstats");
			// BaseballChart.position.setPositions(false, "Hstats");
		}
		if (target === "#Pstats") {
			BaseballChart.team.setTeams("Pstats");
			BaseballChart.player.setPlayers("Pstats");
			// BaseballChart.position.setPositions(true, "Pstats");
		}
	});

	let token = window.localStorage.getItem("sessionToken");
	if (token) {
		BaseballChart.setAuthHeader(token);
	}
	//expose this to the other workout modules
	window.BaseballChart = BaseballChart;
});