if (Meteor.isClient) {

  var views = ["navHome", "navProjects"];

////Specified in events.js
  Template.viewMain.events({
//////// On clicking a tab, hide other views, show relevant view
    'click #navHome' : function () {
	Session.set("view", 0);
	$("#divHome").css({"display":"inline"});
	$(".view[id!=divHome]").hide();
    },
    'click #navProjects' : function () {
	Session.set("view", 1);
	$("#divProjects").css({"display":"inline"});
	$(".view[id!=divProjects]").hide();
    },

/////// On clicking li (a tab), do boxshadow (underlining) stuff
    'click li' : function () {
	for(var i = 0; i < views.length; i++){
	  if(Session.get("view") == i){
	    $("#"+views[i] ).css({
	    	"box-shadow": "0 5px 2px -2px rgba(0, 205, 255, 0.95)"
	    });
	  }
	  else{
	    $("#"+views[i] ).css({
	    	"box-shadow": ""
	    });
	  }
	}
    },
//////// On clicking More About Me!, remove cool styling, show the about
    'click #ablbl' : function (){
	normalHome();
    }

  });

////Tab functionality
  Template.viewMain.home = function () {
	return Session.get("view")==0;
  }
  Template.viewMain.projects = function () {
	return Session.get("view")==1;
  }
////Default to Home
  Session.set("view", 0);
////On page load
  Template.viewMain.rendered = function () {
	$("#divProjects").hide();
	$("#navHome").click();
	
	//Dynamic Project List
	Meteor.subscribe("projects", function(e, r){
		Projects = new Meteor.Collection("projects");
		var pArr = Projects.find().fetch();
		for (var i = 0; i < pArr.length; i++){
			var p = "<div class='project'>"+"<a href='"+pArr[i]['link']+"'><img src='"+pArr[i]['image']+"'class='projectImg'/></a>"+"<a href='"+pArr[i]['link']+"'><p class='projectTitle'>"+pArr[i]['name']+"</p></a>"+pArr[i]['description']+"</div>";
			$("#div2Projects").append(p);
		}
	});
	styleHome();
  }

}

function styleHome(){
	///Set up parts
	var a = $($('#divIntro p')[0]);
	var b = $($('#divIntro p')[1]);
	var c = $($('#divIntro p')[2]);
	var d = $($('#divIntro p')[3]);
	
	$('#divIntro p').css({"margin-top":"40px"});
	$('#divIntro').animate({"margin-top":"30px"},600,function(){
		$("#and").animate({"top":"5px"}, 400);})
		a.css({"font-size":"3.6em", "margin-bottom":"-5px", "margin-left":"-30px"}, 700);
		b.css({"font-size":"1.5em", "margin-bottom":"-20px"}, 700);
		c.css({"font-size":"1.5em", "margin-bottom":"-20px" }, 700);
		d.css({"font-size":"2.7em", "margin-left":"-2px"});
}
function normalHome(){
	$("#ablbl").hide();
	var a = $($('#divIntro p')[0]);
	var b = $($('#divIntro p')[1]);
	var c = $($('#divIntro p')[2]);
	var d = $($('#divIntro p')[3]);
	a.animate({"color":"black", "font-size":"1.1em", "margin-bottom":"0px", "margin-left":"0px"}, 500);
	b.animate({"font-size":"1.1em", "margin-bottom":"0px"}, 500);
	c.animate({"font-size":"1.1em", "margin-bottom":"0px" }, 500);
	d.animate({"color":"black", "font-size":"1.1em", "margin-top":"0px", "margin-left":"0px"},500);
	$('#divIntro p').css({"text-shadow":"none"});
	$('#divIntro p').animate({"margin-top":"0px"},260,function(){
	    $("#divIntro").animate({"margin-top":"0"},260);
	    $('#divMore').show(500);});
	
	a.text("Win Wang");
	b.text("Student");
	c.text("Physicist");
	d.text("Computer Scientist");
}



