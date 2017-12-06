$(function() {
	$.extend(BaseballChart, {
		position: {
			hPositionList: [],
			pPositionList: [],
			setHitters: function() {
				BaseballChart.position.fetchHitters();
				let hList = BaseballChart.position.hPositionList;
				let len = hList.length;
				let opts;
				for (let i = 0; i < len; i++) {
					opts += "<option>" + hList[i].positionName + "</option>";
				}
				$("#Hstats-positionList").children().remove();
				$("#Hstats-positionList").append(opts);
			},
			fetchHitters: function() {
				let fetchPositions = $.ajax({
 					type: "GET",
 					url: BaseballChart.API_BASE + "hposition",
 					headers: {
 						"authorization": window.localStorage.getItem("sessionToken")
 					}
 				})
 				.done(function(data) {
 					BaseballChart.position.hPositionList = data;
 				})
 				.fail(function(err) {
 					alert("Get Hitter Positions Failed: " + err);
 				});
			},
			setPitchers: function() {
				BaseballChart.position.fetchPitchers();
				let pList = BaseballChart.position.pPositionList;
				let len = pList.length;
				let opts;
				for (let i = 0; i < len; i++) {
					opts += "<option>" + pList[i].positionName + "</option>";
				}
				$("#Pstats-positionList").children().remove();
				$("#Pstats-positionList").append(opts);
			},
			fetchPitchers: function() {
				let fetchPositions = $.ajax({
 					type: "GET",
 					url: BaseballChart.API_BASE + "pposition",
 					headers: {
 						"authorization": window.localStorage.getItem("sessionToken")
 					}
 				})
 				.done(function(data) {
 					BaseballChart.position.pPositionList = data;
 				})
 				.fail(function(err) {
 					alert("Get Pitcher Positions Failed: " + err);
 				});
			}
		}
	})
})