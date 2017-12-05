$(function(){let t=function(t,e){return{API_BASE:"https://baseball-charting-api.herokuapp.com/api/",setAuthHeader:function(e){window.localStorage.setItem("sessionToken",e),t.ajaxSetup({headers:{Authorization:e}})}}}(jQuery);$(".nav-tabs a[data-toggle='tab']").on("click",function(t){let e=window.localStorage.getItem("sessionToken");if($(this).hasClass("disabled")&&!e)return t.preventDefault(),!1}),$('a[data-toggle="tab"]').on("shown.bs.tab",function(e){let a=$(e.target).attr("href");"#teams"===a&&t.team.setTeams("team"),"#players"===a&&(t.team.setTeams("player"),t.player.setPlayers("player")),"#Hstats"===a&&(t.team.setTeams("Hstats"),t.player.setPlayers("Hstats"),t.hstats.statsList.length<1&&t.hstats.fetchAll()),"#Pstats"===a&&(t.team.setTeams("Pstats"),t.player.setPlayers("Pstats"),t.Pstats.statsList.length<1&&t.Pstats.fetchAll())});let e=window.localStorage.getItem("sessionToken");e&&t.setAuthHeader(e),window.BaseballChart=t}),$(function(){$.extend(BaseballChart,{player:{playerList:[],create:function(){let t=Number.parseInt($("#playerNumber").val()),e={player:{teamName:$("#player-teamList option:selected").text(),name:$("#playerName").val(),number:t}};$.ajax({type:"POST",url:BaseballChart.API_BASE+"player",data:JSON.stringify(e),contentType:"application/json"}).done(function(t){BaseballChart.player.playerList.push(t.player),$("#playerName").val(""),$("#playerNumber").val("")})},cancel:function(){$("#playerName").val(""),$("#playerNumber").val("")},fetchAll:function(){$.ajax({type:"GET",url:BaseballChart.API_BASE+"player",headers:{authorization:window.localStorage.getItem("sessionToken")}}).done(function(t){BaseballChart.player.playerList=t}).fail(function(t){alert("Get Player Failed: "+t)})},setPlayers:function(t){BaseballChart.player.fetchAll;let e,a=BaseballChart.player.playerList,s=a.length;for(let t=0;t<s;t++)e+="<option value='"+a[t].id+"'>"+a[t].name+"</option>";$("#"+t+"-playerList").children().remove(),$("#"+t+"-playerList").append(e)},delete:function(){let t=$("#player-playerList option:selected").text(),e={player:t},a=$.ajax({type:"DELETE",url:BaseballChart.API_BASE+"player",data:JSON.stringify(e),contentType:"application/json"});for(let e=0;e<BaseballChart.player.playerList.length;e++)BaseballChart.player.playerList[e].name==t&&BaseballChart.player.playerList.splice(e,1);BaseballChart.player.setPlayers("player"),a.fail(function(){alert("Failed to delete")})}}}),$("#playerSave").on("click",BaseballChart.player.create),$("#playerCancel").on("click",BaseballChart.player.cancel),$("#playerDelete").on("click",BaseballChart.player.delete),window.localStorage.getItem("sessionToken")&&BaseballChart.player.fetchAll()}),$(function(){$.extend(BaseballChart,{team:{teamList:[],create:function(){let t={teamName:$("#teamName").val()};$.ajax({type:"POST",url:BaseballChart.API_BASE+"team",data:JSON.stringify(t),contentType:"application/json"}).done(function(t){BaseballChart.team.teamList.push(t.team),$("#teamName").val("")})},fetchAll:function(){$.ajax({type:"GET",url:BaseballChart.API_BASE+"team",headers:{authorization:window.localStorage.getItem("sessionToken")}}).done(function(t){BaseballChart.team.teamList=t}).fail(function(t){alert("Get Teams Failed: "+t)})},setTeams:function(t){BaseballChart.team.fetchAll;let e,a=BaseballChart.team.teamList,s=a.length;for(let t=0;t<s;t++)e+="<option value='"+a[t].id+"'>"+a[t].teamName+"</option>";$("#"+t+"-teamList").children().remove(),$("#"+t+"-teamList").append(e)},delete:function(){let t=$("#team-teamList option:selected").text(),e={team:t},a=$.ajax({type:"DELETE",url:BaseballChart.API_BASE+"team",data:JSON.stringify(e),contentType:"application/json"});for(let e=0;e<BaseballChart.team.teamList.length;e++)BaseballChart.team.teamList[e].teamName==t&&BaseballChart.team.teamList.splice(e,1);BaseballChart.team.setTeams("team"),a.fail(function(){alert("Failed to delete")})},cancel:function(){$("#teamName").val("")}}}),$("#teamSave").on("click",BaseballChart.team.create),$("#teamCancel").on("click",BaseballChart.team.cancel),$("#teamDelete").on("click",BaseballChart.team.delete),window.localStorage.getItem("sessionToken")&&BaseballChart.team.fetchAll()}),$(function(){$.extend(BaseballChart,{hstats:{statsList:[],fetchAll:function(){$.ajax({type:"GET",url:BaseballChart.API_BASE+"hstats",headers:{authorization:window.localStorage.getItem("sessionToken")}}).done(function(t){BaseballChart.hstats.statsList.splice(0),BaseballChart.hstats.statsList=t}).fail(function(t){alert("Get player stats Failed: "+t)})},getTripleSlash:function(){let t=Number.parseInt($("#at-bats").val()),e=Number.parseInt($("#singles").val()),a=Number.parseInt($("#doubles").val()),s=Number.parseInt($("#triples").val()),l=Number.parseInt($("#home-runs").val()),n=Number.parseInt($("#walks").val()),i=Number.parseInt($("#sac-flies").val()),r=Number.parseInt($("#hit-by-pitches").val()),o=e+a+s+l,h=o/t,c=(o+n+r)/(t+n+i+r),u=(e+2*a+3*s+4*l)/t,d=h+c;$("#avg").val(h.toFixed(3)),$("#obp").val(c.toFixed(3)),$("#slg").val(u.toFixed(3)),$("#ops").val(d.toFixed(3)),document.getElementById("statsP").textContent="Also known as the Triple Slash line. The average (AVG) is calculated by taking the number of hits and divding them by the total number of at bats (H/AB). The on base percentage (OBP) is calculated by adding the number of hits, walks, and hit by pitches, then dividing that number by the total number of at bats, walks, hit by pitches, and sacrifice flies (H+BB+HBP/AB+BB+HBP+SF). The slugging percentage (SLG) is calculated by adding the total number of bases, then dividing by the total number of at bats. When finding the total number of bases, a single equals 1 base, a double 2 bases, a triple 3 bases, and a home run 4 bases ( (1B + (2B * 2) + (3B * 3) + (HR * 4))/(AB) ). On base Plus Slugging (OPS) is exactly as it sounds: add the OBP and SLG numbers together."},getISO:function(){let t=Number.parseInt($("#at-bats").val()),e=Number.parseInt($("#singles").val()),a=Number.parseInt($("#doubles").val()),s=Number.parseInt($("#triples").val()),l=Number.parseInt($("#home-runs").val()),n=(e+2*a+3*s+4*l)/t-(e+a+s+l)/t;$("#isoField").val(n.toFixed(3)),document.getElementById("statsP").textContent="Isolated Power (ISO) is a stat that tries to quantify the power of a hitter. It is calculated by subtracting a player's batting average (AVG) from their slugging percentage (SLG). (SLG-AVG) A high ISO means that a player has more extra-base hits."},getKPer:function(){let t=Number.parseInt($("#strikeouts").val())/(Number.parseInt($("#at-bats").val())+Number.parseInt($("#walks").val())+Number.parseInt($("#sac-flies").val())+Number.parseInt($("#hit-by-pitches").val()));$("#kPerField").val(100*t.toFixed(3)),document.getElementById("statsP").textContent="Strikeout Percentage (K%) is the percent of plate appearances where a batter strikes out. ( K/(AB+BB+SF+HBP) ) The lower the number, the better."},getBBPer:function(){let t=Number.parseInt($("#at-bats").val()),e=Number.parseInt($("#walks").val()),a=e/(t+e+Number.parseInt($("#sac-flies").val())+Number.parseInt($("#hit-by-pitches").val()));$("#bbPerField").val(100*a.toFixed(3)),document.getElementById("statsP").textContent="Walk Percentage (BB%) is the percent of plate appearances where a batter walks. ( BB/(AB+BB+SF+HBP) ) The higher the number, the better"},getSBPer:function(){let t=Number.parseInt($("#stolen-bases").val()),e=t/(t+Number.parseInt($("#caught-stealing").val()));$("#sbPerField").val(100*e.toFixed(3)),document.getElementById("statsP").textContent="Stolen Base Percentage (SB%) is the percent of successful stolen base by a runner. The higher the number, the better."},saveStats:function(){let t=$("#Hstats-teamList option:selected").text(),e=$("#Hstats-playerList option:selected").text(),a=$("#at-bats").val(),s=$("#singles").val(),l=$("#doubles").val(),n=$("#triples").val(),i=$("#home-runs").val(),r=$("#strikeouts").val(),o=$("#walks").val(),h=$("#hit-by-pitches").val(),c=$("#sac-flies").val(),u=$("#runs-batted-in").val(),d=$("#runs").val(),p=$("#stolen-bases").val(),b=$("#caught-stealing").val();if(!1===BaseballChart.hstats.isPlayerInDB(e)){let g={team:t,player:e,abs:a,singles:s,doubles:l,triples:n,hrs:i,strikeouts:r,walks:o,hbp:h,sf:c,rbis:u,runs:d,sb:p,cs:b};$.ajax({type:"POST",url:BaseballChart.API_BASE+"hstats",data:JSON.stringify(g),contentType:"application/json"}).fail(function(){alert("Failed to add "+e+"'s hitting stats. Please try again.")}),alert(e+"'s hitting stats added to database")}else{let t={player:e,abs:a,singles:s,doubles:l,triples:n,hrs:i,strikeouts:r,walks:o,hbp:h,sf:c,rbis:u,runs:d,sb:p,cs:b};$.ajax({type:"PUT",url:BaseballChart.API_BASE+"hstats",data:JSON.stringify(t),contentType:"application/json"}).fail(function(){alert("Failed to update "+e+"'s hitting stats. Please try again.")}),BaseballChart.hstats.fetchAll(),alert(e+"'s hitting stats have been updated.")}},isPlayerInDB:function(t){BaseballChart.hstats.fetchAll();let e=BaseballChart.hstats.statsList,a=!1;for(let s=0;s<=e.length&&s!=e.length;s++)if(e[s].player==t)return a=!0;return a},setStats:function(){BaseballChart.hstats.clearStats();let t=BaseballChart.hstats.statsList,e=$("#Hstats-playerList option:selected").text();if(t.length<1)BaseballChart.hstats.fetchAll(),alert("Failed to get hitting stats. Please try again");else for(let a=0;a<=t.length;a++)if(a==t.length)BaseballChart.hstats.fetchAll(),alert("Player not found in database. Please save hitting stats first or try again.");else if(t[a].player==e){$("#at-bats").val(t[a].atbats),$("#singles").val(t[a].singles),$("#doubles").val(t[a].doubles),$("#triples").val(t[a].triples),$("#home-runs").val(t[a].homeruns),$("#strikeouts").val(t[a].strikeouts),$("#walks").val(t[a].walks),$("#hit-by-pitches").val(t[a].hitbypitches),$("#sac-flies").val(t[a].sacflies),$("#runs-batted-in").val(t[a].rbis),$("#runs").val(t[a].runs),$("#stolen-bases").val(t[a].stolenbases),$("#caught-stealing").val(t[a].caughtstealing);break}},clearStats:function(){$("#at-bats").val(""),$("#singles").val(""),$("#doubles").val(""),$("#triples").val(""),$("#home-runs").val(""),$("#strikeouts").val(""),$("#walks").val(""),$("#hit-by-pitches").val(""),$("#sac-flies").val(""),$("#runs-batted-in").val(""),$("#runs").val(""),$("#stolen-bases").val(""),$("#caught-stealing").val("")},deleteStats:function(){let t=$("#Hstats-playerList option:selected").text();if(!1===BaseballChart.hstats.isPlayerInDB(t))alert(t+" has no hitting stats in the database");else if(!1===confirm("Are you sure you want to delete hitting stats for "+t+"?"))alert(t+"'s hitting stats were not deleted.");else{let e=BaseballChart.hstats.statsList;for(let a=0;a<=e.length;a++)if(a==length)alert(t+" has hitting no stats in the database");else if(e[a].player==t){let s={player:t};$.ajax({type:"DELETE",url:BaseballChart.API_BASE+"hstats",data:JSON.stringify(s),contentType:"application/json"}).fail(function(){alert("Failed to delete "+t+"'s hitting stats. Please try again")}),BaseballChart.hstats.clearStats(),BaseballChart.hstats.fetchAll(),alert(t+"'s hitting stats were deleted."),a+=e.length}}}}}),$("#tripSlash").on("click",BaseballChart.hstats.getTripleSlash),$("#isoButton").on("click",BaseballChart.hstats.getISO),$("#kPerButton").on("click",BaseballChart.hstats.getKPer),$("#bbPerButton").on("click",BaseballChart.hstats.getBBPer),$("#sbPerButton").on("click",BaseballChart.hstats.getSBPer),$("#saveHStats").on("click",BaseballChart.hstats.saveStats),$("#getHStats").on("click",BaseballChart.hstats.setStats),$("#clearHStats").on("click",BaseballChart.hstats.clearStats),$("#deleteHStats").on("click",BaseballChart.hstats.deleteStats)}),$(function(){$.extend(BaseballChart,{Pstats:{statsList:[],getRatios:function(){let t=Number.parseInt($("#earnedRunsAllowed").val()),e=Number.parseInt($("#runsAllowed").val()),a=Number.parseInt($("#inningsPitched").val()),s=9*t/a,l=9*e/a,n=(Number.parseInt($("#walksAllowed").val())+Number.parseInt($("#hitsAllowed").val()))/a;$("#era").val(s.toFixed(2)),$("#ra").val(l.toFixed(2)),$("#whip").val(n.toFixed(2)),document.getElementById("PstatsP").textContent="A pitcher's Earned Run Average (ERA) is calculated by taking the number of earned runs allowed (ER) multiplied by 9, and dividing it by the number of innings pitched (IP) ( (ERA * 9)/IP ). Their  WHIP (Walks + Hits per Inning Pitched) is as simple as it sounds: (BB+H)/IP. Finally, while not used as often, the Run Average is the total number of runs allowed (RA) multiplied by 9, then divided by the number of innings pitched ( (RA * 9)/ IP )."},getK9:function(){let t=Number.parseInt($("#inningsPitched").val()),e=9*Number.parseInt($("#battersStruckOut").val())/t;$("#ksPer9").val(e.toFixed(2)),document.getElementById("PstatsP").textContent="Strikeouts per 9 innings (K/9) shows the number of batters struck out by a pitcher every 9 innings, or every game. ( (K * 9) / IP ). The higher the number, the better."},getBB9:function(){let t=Number.parseInt($("#inningsPitched").val()),e=9*Number.parseInt($("#walksAllowed").val())/t;$("#walksPer9").val(e.toFixed(2)),document.getElementById("PstatsP").textContent="Walks per 9 innings (BB/9) shows the number of walks allowed by a pitcher every 9 innings, or every game. ( (BB * 9) / IP ). The lower the number, the better."},getCSPer:function(){let t=Number.parseInt($("#stolenBasesAllowed").val()),e=Number.parseInt($("#runnersCaughtStealing").val()),a=e/(t+e);$("#csPerField").val(100*a.toFixed(3)),document.getElementById("PstatsP").textContent="Stolen Base Percentage (SB%) is the percent of successful stolen bases against a pitcher. The lower the number, the better. *NOTE: This stat is heavily affected by the catcher behind the plate, and may not be a quality method of ranking pitchers.*"},isPlayerInDB:function(t){BaseballChart.Pstats.fetchAll();let e=BaseballChart.Pstats.statsList,a=!1;for(let s=0;s<=e.length&&s!=e.length;s++)if(e[s].player==t)return a=!0;return a},saveStats:function(){let t=$("#Pstats-teamList option:selected").text(),e=$("#Pstats-playerList option:selected").text(),a=$("#inningsPitched").val(),s=$("#wins").val(),l=$("#losses").val(),n=$("#saves").val(),i=$("#earnedRunsAllowed").val(),r=$("#runsAllowed").val(),o=$("#battersStruckOut").val(),h=$("#walksAllowed").val(),c=$("#hitsAllowed").val(),u=$("#wildPitches").val(),d=$("#pickOffs").val(),p=$("#stolenBasesAllowed").val(),b=$("#runnersCaughtStealing").val(),g=$("#homeRunsAllowed").val();if(!1===BaseballChart.Pstats.isPlayerInDB(e)){let m={team:t,player:e,ip:a,wins:s,losses:l,saves:n,er:i,r:r,strikeouts:o,walksallowed:h,hits:c,wp:u,po:d,sb:p,cs:b,hr:g};$.ajax({type:"POST",url:BaseballChart.API_BASE+"pstats",data:JSON.stringify(m),contentType:"application/json"}).fail(function(){alert("Failed to add "+e+"'s pitching stats. Please try again.")}),alert(e+"'s pitching stats added to database")}else{let t={player:e,ip:a,wins:s,losses:l,saves:n,er:i,r:r,strikeouts:o,walksallowed:h,hits:c,wp:u,po:d,sb:p,cs:b,hr:g};$.ajax({type:"PUT",url:BaseballChart.API_BASE+"pstats",data:JSON.stringify(t),contentType:"application/json"}).fail(function(){alert("Failed to update "+e+"'s pitching stats. Please try again.")}),alert(e+"'s pitching stats were updated.")}},clearStats:function(){$("#inningsPitched").val(""),$("#wins").val(""),$("#losses").val(""),$("#saves").val(""),$("#earnedRunsAllowed").val(""),$("#runsAllowed").val(""),$("#battersStruckOut").val(""),$("#walksAllowed").val(""),$("#hitsAllowed").val(""),$("#wildPitches").val(""),$("#pickOffs").val(""),$("#stolenBasesAllowed").val(""),$("#runnersCaughtStealing").val(""),$("#homeRunsAllowed").val("")},fetchAll:function(){$.ajax({type:"GET",url:BaseballChart.API_BASE+"pstats",headers:{authorization:window.localStorage.getItem("sessionToken")}}).done(function(t){BaseballChart.Pstats.statsList.splice(0),BaseballChart.Pstats.statsList=t}).fail(function(t){alert("Get player stats Failed: "+t)})},setStats:function(){BaseballChart.Pstats.clearStats();let t=BaseballChart.Pstats.statsList,e=$("#Pstats-playerList option:selected").text();if(t.length<1)BaseballChart.Pstats.fetchAll(),alert("Failed to get stats. Please try again");else for(let a=0;a<=t.length;a++)if(a==t.length)BaseballChart.Pstats.fetchAll(),alert(e+" not found in database. Please save stats first or try again.");else if(t[a].player==e){$("#inningsPitched").val(t[a].IP),$("#wins").val(t[a].wins),$("#losses").val(t[a].losses),$("#saves").val(t[a].saves),$("#earnedRunsAllowed").val(t[a].earnedrunsallowed),$("#runsAllowed").val(t[a].runsallowed),$("#battersStruckOut").val(t[a].strikeouts),$("#walksAllowed").val(t[a].walksallowed),$("#hitsAllowed").val(t[a].hits),$("#wildPitches").val(t[a].wildpitches),$("#pickOffs").val(t[a].pickoffs),$("#stolenBasesAllowed").val(t[a].stolenbases),$("#runnersCaughtStealing").val(t[a].caughtstealing),$("#homeRunsAllowed").val(t[a].homerunsallowed);break}},deleteStats:function(){let t=$("#Pstats-playerList option:selected").text();if(!1===BaseballChart.Pstats.isPlayerInDB(t))alert(t+" has no pitching stats in the database");else if(!1===confirm("Are you sure you want to delete the pitching stats for "+t+"?"))alert(t+"'s pitching stats were not deleted.");else{let e=BaseballChart.Pstats.statsList;for(let a=0;a<=e.length;a++)if(a==length)alert(t+" does not have pitching stats in the database");else if(e[a].player==t){let s={player:t};$.ajax({type:"DELETE",url:BaseballChart.API_BASE+"pstats",data:JSON.stringify(s),contentType:"application/json"}).fail(function(){alert("Failed to delete "+t+"'s pitching stats. Please try again")}),BaseballChart.Pstats.clearStats(),BaseballChart.Pstats.fetchAll(),alert(t+"'s pitching stats were deleted."),a+=e.length}}}}}),$("#ratios").on("click",BaseballChart.Pstats.getRatios),$("#ksPer9Button").on("click",BaseballChart.Pstats.getK9),$("#walksPer9Button").on("click",BaseballChart.Pstats.getBB9),$("#csPerButton").on("click",BaseballChart.Pstats.getCSPer),$("#savePStats").on("click",BaseballChart.Pstats.saveStats),$("#getPStats").on("click",BaseballChart.Pstats.setStats),$("#clearPStats").on("click",BaseballChart.Pstats.clearStats),$("#deletePStats").on("click",BaseballChart.Pstats.deleteStats)}),$(function(){$.extend(BaseballChart,{position:{positionList:[],setPositions:function(t,e){console.log("Hstats2"),BaseballChart.position.fetchAll(t);let a,s=BaseballChart.position.positionList,l=s.length;for(let t=0;t<l;t++)a+="<option>"+s[t].position+"</option>";$("#"+e+"-positionList").children().remove(),$("#"+e+"-positionList").append(a)},fetchAll:function(t){console.log(t);$.ajax({type:"GET",url:BaseballChart.API_BASE+"position",headers:{authorization:window.localStorage.getItem("sessionToken")}}).done(function(t){BaseballChart.position.positionList=t}).fail(function(t){alert("Get Positions Failed: "+t)})}}})}),$(function(){$.extend(BaseballChart,{signup:function(){let t=$("#su_email").val().trim(),e=$("#su_username").val().trim(),a=$("#su_password").val().trim();if(""===t||""===e||""===a)$("#su_error").text("Please enter a username and password").show();else{let s={user:{email:t,username:e,password:a}};$.ajax({type:"POST",url:BaseballChart.API_BASE+"signup",data:JSON.stringify(s),contentType:"application/json"}).done(function(t){t.sessionToken&&(BaseballChart.setAuthHeader(t.sessionToken),$("#userName").text(s.username)),$("#signup-modal").modal("hide"),$(".disabled").removeClass("disabled"),$(".nav").removeClass("hidden"),$(".nav").show(),$("#loginPage").removeClass("active"),$("#home").addClass("active"),$("#su_email").val(""),$("#su_username").val(""),$("#su_password").val(""),$("#su_error").hide(),$('a[href="#home"]').tab("show")}).fail(function(){$("#su_error").text("There was an issue with sign up").show(),$("#su_email").val(""),$("#su_username").val(""),$("#su_password").val("")})}},login:function(){let t=$("#li_email").val().trim(),e=$("#li_password").val().trim();if(""===t||""===e)$("#li_error").text("Please enter a username and password").show();else{let a={user:{email:t,password:e}};$.ajax({type:"POST",url:BaseballChart.API_BASE+"signin",data:JSON.stringify(a),contentType:"application/json"}).done(function(t){t.sessionToken&&(BaseballChart.setAuthHeader(t.sessionToken),BaseballChart.team.fetchAll(),BaseballChart.player.fetchAll(),$("#userName").text(a.username)),$("#login-modal").modal("hide"),$(".disabled").removeClass("disabled"),$(".nav").removeClass("hidden"),$(".nav").show(),$("#loginPage").removeClass("active"),$("#home").addClass("active"),$("#li_email").val(""),$("#li_password").val(""),$("#li_error").hide(),$('a[href="#home"]').tab("show")}).fail(function(){$("#li_error").text("There was an issue with the login").show(),$("#li_email").val(""),$("#li_password").val("")})}},logout:function(){window.localStorage.getItem("sessionToken")&&window.localStorage.removeItem("sessionToken"),$(".nav").hide().addClass("disabled"),$('a[href="#loginPage"]').tab("show")}}),$("#login").on("click",BaseballChart.login),$("#signup").on("click",BaseballChart.signup),$("#logout").on("click",BaseballChart.logout)});
//# sourceMappingURL=maps/bundle.js.map
