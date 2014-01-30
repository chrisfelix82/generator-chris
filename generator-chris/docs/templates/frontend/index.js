var selectedTab = "docs";

$("#docsFrame").height($("#docsFrame").contents().height());

function showTab(e){
	$("li.active").removeClass("active");
	$("li." + e).addClass("active");
	
	
	$("#" + selectedTab + "Frame").addClass("hidden");
	$("#" + e + "Frame").removeClass("hidden");
	$("#" + e + "Frame").height($("#" + e + "Frame").contents().height());
	selectedTab = e;
}