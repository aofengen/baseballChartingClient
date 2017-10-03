$(function() {
	$.extend(BaseballChart, {
		position: {
			positionList: [],
			setPositions: function(pitcher, type) {
				console.log("Hstats2");
				BaseballChart.position.fetchAll(pitcher);
				let pList = BaseballChart.position.positionList;
				let len = pList.length;
				let opts;
				for (let i = 0; i < len; i++) {
					opts += "<option>" + pList[i].position + "</option>";
				}
				$("#" + type + "-positionList").children().remove();
				$("#" + type + "-positionList").append(opts);
			},
			fetchAll: function(p) {
				console.log(p);
				let pitcherValue = p;
				let fetchPositions = $.ajax({
 					type: "GET",
 					url: BaseballChart.API_BASE + "position",
 					headers: {
 						"authorization": window.localStorage.getItem("sessionToken")
 					}
 				})
 				.done(function(data) {
 					BaseballChart.position.positionList = data;
 				})
 				.fail(function(err) {
 					alert("Get Positions Failed: " + err);
 				});
			}
		}
	})
})