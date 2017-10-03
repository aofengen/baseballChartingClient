$(function(){
	$.extend(BaseballChart, {
		//signup method
		signup: function() {
			let email = $("#su_email").val().trim();
			let username = $("#su_username").val().trim();
			let password = $("#su_password").val().trim();
			
			if (email === "" || username === "" || password === "" ) {
				$("#su_error").text("Please enter a username and password").show();
			} else {
				
				//user object
				let user = {
					user: {
						email: email,
						username: username,
						password: password
					}
				};

				//signup post
				let signup = $.ajax({
					type: "POST",
					url: BaseballChart.API_BASE + "signup",
					data: JSON.stringify(user),
					contentType: "application/json"
				});

				//signup done/fail
				signup.done(function(data){
					if (data.sessionToken) {
						BaseballChart.setAuthHeader(data.sessionToken);
						$("#userName").text(user.username);				
					};
					$("#signup-modal").modal("hide");
					$(".disabled").removeClass("disabled");
					$(".nav").removeClass("hidden");
					$(".nav").show();
					$("#loginPage").removeClass("active");
					$("#home").addClass("active");
					$("#su_email").val("");
					$("#su_username").val("");
					$("#su_password").val("");
					$("#su_error").hide();
					$('a[href="#home"]').tab("show"); //routing
				}).fail(function() {
					$("#su_error").text("There was an issue with sign up").show();
					$("#su_email").val("");
					$("#su_username").val("");
					$("#su_password").val("");
				})
			}
		},

		//login method
		login: function() {
			let email = $("#li_email").val().trim();
			let password = $("#li_password").val().trim();
			if (email === "" || password === "") {
				$("#li_error").text("Please enter a username and password").show();
			} else {
				//login variables				
				let user = {
					user: {
						email: email,
						password: password
					}
				};

				//login POST
				let login = $.ajax({
					type: "POST",
					url: BaseballChart.API_BASE + "signin",
					data: JSON.stringify(user),
					contentType: "application/json"
				})
				//login done/fail
				login.done(function(data) {
					if (data.sessionToken) {
						BaseballChart.setAuthHeader(data.sessionToken);
						$("#userName").text(user.username);
					}
					$("#login-modal").modal("hide");
					$(".disabled").removeClass("disabled");
					$(".nav").removeClass("hidden");
					$(".nav").show();
					$("#loginPage").removeClass("active");
					$("#home").addClass("active");
					$("#li_email").val("");
					$("#li_password").val("");
					$("#li_error").hide();
					$('a[href="#home"]').tab("show");
				}).fail(function (){
					$("#li_error").text("There was an issue with the login").show();
					$("#li_email").val("");
					$("#li_password").val("");
				});
			}
		},
		//loginoutmethod
		logout: function() {
			if (window.localStorage.getItem("sessionToken")) {
				window.localStorage.removeItem("sessionToken");
			}
			$(".nav").hide().addClass("disabled");
			$('a[href="#loginPage"]').tab("show");
		}
	});
		//bind events
		$("#login").on("click", BaseballChart.login);
		$("#signup").on("click", BaseballChart.signup);
		$("#logout").on("click", BaseballChart.logout);
})