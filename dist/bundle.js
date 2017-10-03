$(function(){let e=function(e,t){return{API_BASE:"http://localhost:3000/api/",setAuthHeader:function(t){window.localStorage.setItem("sessionToken",t),e.ajaxSetup({headers:{Authorization:t}})}}}(jQuery);$(".nav-tabs a[data-toggle='tab']").on("click",function(e){let t=window.localStorage.getItem("sessionToken");if($(this).hasClass("disabled")&&!t)return e.preventDefault(),!1}),$('a[data-toggle="tab"]').on("shown.bs.tab",function(t){let a=$(t.target).attr("href");"#teams"===a&&e.team.setTeams("team"),"#players"===a&&(e.team.setTeams("player"),e.player.setPlayers("player")),"#Hstats"===a&&(e.team.setTeams("Hstats"),e.player.setPlayers("Hstats")),"#Pstats"===a&&(e.team.setTeams("Pstats"),e.player.setPlayers("Pstats"))});let t=window.localStorage.getItem("sessionToken");t&&e.setAuthHeader(t),window.BaseballChart=e}),$(function(){$.extend(BaseballChart,{player:{playerList:[],create:function(){let e=Number.parseInt($("#playerNumber").val()),t={player:{teamName:$("#player-teamList option:selected").text(),name:$("#playerName").val(),number:e}};$.ajax({type:"POST",url:BaseballChart.API_BASE+"player",data:JSON.stringify(t),contentType:"application/json"}).done(function(e){BaseballChart.player.playerList.push(e.player),$("#playerName").val(""),$("#playerNumber").val("")})},cancel:function(){$("#playerName").val(""),$("#playerNumber").val("")},fetchAll:function(){$.ajax({type:"GET",url:BaseballChart.API_BASE+"player",headers:{authorization:window.localStorage.getItem("sessionToken")}}).done(function(e){BaseballChart.player.playerList=e}).fail(function(e){alert("Get Player Failed: "+e)})},setPlayers:function(e){BaseballChart.player.fetchAll;let t,a=BaseballChart.player.playerList,l=a.length;for(let e=0;e<l;e++)t+="<option value='"+a[e].id+"'>"+a[e].name+" ("+a[e].number+") </option>";$("#"+e+"-playerList").children().remove(),$("#"+e+"-playerList").append(t)},delete:function(){let e=$("#player-playerList option:selected").text(),t={player:e},a=$.ajax({type:"DELETE",url:BaseballChart.API_BASE+"player",data:JSON.stringify(t),contentType:"application/json"});for(let t=0;t<BaseballChart.player.playerList.length;t++)BaseballChart.player.playerList[t].name==e&&BaseballChart.player.playerList.splice(t,1);BaseballChart.player.setPlayers("player"),a.fail(function(){alert("Failed to delete")})}}}),$("#playerSave").on("click",BaseballChart.player.create),$("#playerCancel").on("click",BaseballChart.player.cancel),$("#playerDelete").on("click",BaseballChart.player.delete),window.localStorage.getItem("sessionToken")&&BaseballChart.player.fetchAll()}),$(function(){$.extend(BaseballChart,{team:{teamList:[],create:function(){let e={teamName:$("#teamName").val()};$.ajax({type:"POST",url:BaseballChart.API_BASE+"team",data:JSON.stringify(e),contentType:"application/json"}).done(function(e){BaseballChart.team.teamList.push(e.team),$("#teamName").val("")})},fetchAll:function(){$.ajax({type:"GET",url:BaseballChart.API_BASE+"team",headers:{authorization:window.localStorage.getItem("sessionToken")}}).done(function(e){BaseballChart.team.teamList=e}).fail(function(e){alert("Get Teams Failed: "+e)})},setTeams:function(e){BaseballChart.team.fetchAll;let t,a=BaseballChart.team.teamList,l=a.length;for(let e=0;e<l;e++)t+="<option value='"+a[e].id+"'>"+a[e].teamName+"</option>";$("#"+e+"-teamList").children().remove(),$("#"+e+"-teamList").append(t)},delete:function(){let e=$("#team-teamList option:selected").text(),t={team:e},a=$.ajax({type:"DELETE",url:BaseballChart.API_BASE+"team",data:JSON.stringify(t),contentType:"application/json"});for(let t=0;t<BaseballChart.team.teamList.length;t++)BaseballChart.team.teamList[t].teamName==e&&BaseballChart.team.teamList.splice(t,1);BaseballChart.team.setTeams("team"),a.fail(function(){alert("Failed to delete")})},cancel:function(){$("#teamName").val("")}}}),$("#teamSave").on("click",BaseballChart.team.create),$("#teamCancel").on("click",BaseballChart.team.cancel),$("#teamDelete").on("click",BaseballChart.team.delete),window.localStorage.getItem("sessionToken")&&BaseballChart.team.fetchAll()}),$(function(){$.extend(BaseballChart,{Hstats:{getTripleSlash:function(){let e=Number.parseInt($("#at-bats").val()),t=Number.parseInt($("#singles").val()),a=Number.parseInt($("#doubles").val()),l=Number.parseInt($("#triples").val()),s=Number.parseInt($("#home-runs").val()),n=Number.parseInt($("#walks").val()),r=Number.parseInt($("#sac-flies").val()),i=Number.parseInt($("#hit-by-pitches").val()),o=t+a+l+s,u=o/e,h=(o+n+i)/(e+n+r+i),c=(t+2*a+3*l+4*s)/e,m=u+h;$("#avg").val(u.toFixed(3)),$("#obp").val(h.toFixed(3)),$("#slg").val(c.toFixed(3)),$("#ops").val(m.toFixed(3)),document.getElementById("statsP").textContent="Also known as the Triple Slash line. The average AVG is calculated by taking the number of hits and divding them by the total number of at bats (H/AB). The on base percentage (OBP) is calculated by adding the number of hits, walks, and hit by pitches, then dividing that number by the total number of at bats, walks, hit by pitches, and sacrifice flies (H+BB+HBP/AB+BB+HBP+SF). The slugging percentage (SLG) is calculated by adding the total number of bases, then dividing by the total number of at bats. When finding the total number of bases, a single equals 1 base, a double  2 bases, a triple 3 bases, and a home run 4 bases ( (1B + (2B * 2) + (3B * 3) + (HR * 4))/(AB) ). On base Plus Slugging (OPS) is exactly as it sounds: add the OBP and SLG numbers together."},getISO:function(){let e=Number.parseInt($("#at-bats").val()),t=Number.parseInt($("#singles").val()),a=Number.parseInt($("#doubles").val()),l=Number.parseInt($("#triples").val()),s=Number.parseInt($("#home-runs").val()),n=(t+2*a+3*l+4*s)/e-(t+a+l+s)/e;$("#isoField").val(n.toFixed(3)),document.getElementById("statsP").textContent="Isolated Power (ISO) is a stat that tries to quantify the power of a hitter. It is calculated by subtracting a player's batting average (AVG) from their slugging percentage (SLG). (SLG-AVG) A high ISO means that a player has more extra-base hits."},getKPer:function(){let e=Number.parseInt($("#strikeouts").val())/(Number.parseInt($("#at-bats").val())+Number.parseInt($("#walks").val())+Number.parseInt($("#sac-flies").val())+Number.parseInt($("#hit-by-pitches").val()));$("#kPerField").val(100*e.toFixed(3)),document.getElementById("statsP").textContent="Strikeout Percentage (K%) is the percent of plate appearances where a batter strikes out. ( K/(AB+BB+SF+HBP) ) The lower the number, the better."},getBBPer:function(){let e=Number.parseInt($("#at-bats").val()),t=Number.parseInt($("#walks").val()),a=t/(e+t+Number.parseInt($("#sac-flies").val())+Number.parseInt($("#hit-by-pitches").val()));$("#bbPerField").val(100*a.toFixed(3)),document.getElementById("statsP").textContent="Walk Percentage (BB%) is the percent of plate appearances where a batter walks. ( BB/(AB+BB+SF+HBP) ) The higher the number, the better"},getSBPer:function(){let e=Number.parseInt($("#stolen-bases").val()),t=e/(e+Number.parseInt($("#caught-stealing").val()));$("#sbPerField").val(100*t.toFixed(3)),document.getElementById("statsP").textContent="Stolen Base Percentage (SB%) is the percent of successful stolen base by a runner. The higher the number, the better."}}}),$("#tripSlash").on("click",BaseballChart.Hstats.getTripleSlash),$("#isoButton").on("click",BaseballChart.Hstats.getISO),$("#kPerButton").on("click",BaseballChart.Hstats.getKPer),$("#bbPerButton").on("click",BaseballChart.Hstats.getBBPer),$("#sbPerButton").on("click",BaseballChart.Hstats.getSBPer)}),$(function(){$.extend(BaseballChart,{Pstats:{getRatios:function(){let e=Number.parseInt($("#earnedRunsAllowed").val()),t=Number.parseInt($("#runsAllowed").val()),a=Number.parseInt($("#inningsPitched").val()),l=9*e/a,s=9*t/a,n=(Number.parseInt($("#walksAllowed").val())+Number.parseInt($("#hitsAllowed").val()))/a;$("#era").val(l.toFixed(2)),$("#ra").val(s.toFixed(2)),$("#whip").val(n.toFixed(2)),document.getElementById("PstatsP").textContent="A pitcher's Earned Run Average (ERA) is calculated by taking the number of earned runs allowed (ER) multiplied by 9, and dividing it by the number of innings pitched (IP) ( (ERA * 9)/IP ). Their  WHIP (Walks + Hits per Inning Pitched) is as simple as it sounds: (BB+H)/IP. Finally, while not used as often, the Run Average is the total number of runs allowed (RA) multiplied by 9, then divided by the number of innings pitched ( (RA * 9)/ IP )."},getK9:function(){let e=Number.parseInt($("#inningsPitched").val()),t=9*Number.parseInt($("#battersStruckOut").val())/e;$("#ksPer9").val(t.toFixed(2)),document.getElementById("PstatsP").textContent="Strikeouts per 9 innings (K/9) shows the number of batters struck out by a pitcher every 9 innings, or every game. ( (K * 9) / IP ). The higher the number, the better."},getBB9:function(){let e=Number.parseInt($("#inningsPitched").val()),t=9*Number.parseInt($("#walksAllowed").val())/e;$("#walksPer9").val(t.toFixed(2)),document.getElementById("PstatsP").textContent="Walks per 9 innings (BB/9) shows the number of walks allowed by a pitcher every 9 innings, or every game. ( (BB * 9) / IP ). The lower the number, the better."},getCSPer:function(){let e=Number.parseInt($("#stolenBasesAllowed").val()),t=Number.parseInt($("#runnersCaughtStealing").val()),a=t/(e+t);$("#csPerField").val(100*a.toFixed(3)),document.getElementById("PstatsP").textContent="Stolen Base Percentage (SB%) is the percent of successful stolen bases against a pitcher. The lower the number, the better. *NOTE: This stat is heavily affected by the catcher behind the plate, and may not be a quality method of ranking a pitcher.*"}}}),$("#ratios").on("click",BaseballChart.Pstats.getRatios),$("#ksPer9Button").on("click",BaseballChart.Pstats.getK9),$("#walksPer9Button").on("click",BaseballChart.Pstats.getBB9),$("#csPerButton").on("click",BaseballChart.Pstats.getCSPer)}),$(function(){$.extend(BaseballChart,{position:{positionList:[],setPositions:function(e,t){console.log("Hstats2"),BaseballChart.position.fetchAll(e);let a,l=BaseballChart.position.positionList,s=l.length;for(let e=0;e<s;e++)a+="<option>"+l[e].position+"</option>";$("#"+t+"-positionList").children().remove(),$("#"+t+"-positionList").append(a)},fetchAll:function(e){console.log(e);$.ajax({type:"GET",url:BaseballChart.API_BASE+"position",headers:{authorization:window.localStorage.getItem("sessionToken")}}).done(function(e){BaseballChart.position.positionList=e}).fail(function(e){alert("Get Positions Failed: "+e)})}}})}),$(function(){$.extend(BaseballChart,{signup:function(){let e=$("#su_email").val().trim(),t=$("#su_username").val().trim(),a=$("#su_password").val().trim();if(""===e||""===t||""===a)$("#su_error").text("Please enter a username and password").show();else{let l={user:{email:e,username:t,password:a}};$.ajax({type:"POST",url:BaseballChart.API_BASE+"signup",data:JSON.stringify(l),contentType:"application/json"}).done(function(e){e.sessionToken&&(BaseballChart.setAuthHeader(e.sessionToken),$("#userName").text(l.username)),$("#signup-modal").modal("hide"),$(".disabled").removeClass("disabled"),$(".nav").removeClass("hidden"),$(".nav").show(),$("#loginPage").removeClass("active"),$("#home").addClass("active"),$("#su_email").val(""),$("#su_username").val(""),$("#su_password").val(""),$("#su_error").hide(),$('a[href="#home"]').tab("show")}).fail(function(){$("#su_error").text("There was an issue with sign up").show(),$("#su_email").val(""),$("#su_username").val(""),$("#su_password").val("")})}},login:function(){let e=$("#li_email").val().trim(),t=$("#li_password").val().trim();if(""===e||""===t)$("#li_error").text("Please enter a username and password").show();else{let a={user:{email:e,password:t}};$.ajax({type:"POST",url:BaseballChart.API_BASE+"signin",data:JSON.stringify(a),contentType:"application/json"}).done(function(e){e.sessionToken&&(BaseballChart.setAuthHeader(e.sessionToken),$("#userName").text(a.username)),$("#login-modal").modal("hide"),$(".disabled").removeClass("disabled"),$(".nav").removeClass("hidden"),$(".nav").show(),$("#loginPage").removeClass("active"),$("#home").addClass("active"),$("#li_email").val(""),$("#li_password").val(""),$("#li_error").hide(),$('a[href="#home"]').tab("show")}).fail(function(){$("#li_error").text("There was an issue with the login").show(),$("#li_email").val(""),$("#li_password").val("")})}},logout:function(){window.localStorage.getItem("sessionToken")&&window.localStorage.removeItem("sessionToken"),$(".nav").hide().addClass("disabled"),$('a[href="#loginPage"]').tab("show")}}),$("#login").on("click",BaseballChart.login),$("#signup").on("click",BaseballChart.signup),$("#logout").on("click",BaseballChart.logout)});
//# sourceMappingURL=maps/bundle.js.map
