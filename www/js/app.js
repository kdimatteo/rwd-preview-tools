/**
 *
 */

$(document).ready(function(){

	
	
	$.get("/data", function(data, success_code){
		"use strict";

		var headers = _.keys(data["csvRows"][0]),
			skippable = ["Width Measured By", "Allows Auto Scroll", "URL"],
			headerHTML = $("<tr/>"),
			bodyHTML = "";

		_.each(headers, function(el, index){
			if(!_.contains(skippable, el)){
				headerHTML.append("<td data-colid="+index+">"+el+"</td>")
			}
		}, this);


		_.each(data["csvRows"], function(rowData, rowIndex){
			var v, row = $("<tr data-rowid="+rowIndex+"/>");
				
			_.each(rowData, function(v, k){
				if(!_.contains(skippable, k)){

					if (k == "Product Name"){
						v = '<a href="'+rowData["URL"]+'">' + v + '</a>';
					}

					if(parseInt(v) === 1){
						v = '<td class="check"><i class="fui-check"></i></td>';
					} else if(parseInt(v) === 0){
						v = '<td class="cross"><i class="fui-cross"></i></td>';
					} else {
						v = '<td>'+v+'</td>';
					}


					row.append(v);
				}
			}, this);
			$("#data tbody").append(row);
		}, this);



		$("#data thead").append(headerHTML);

	});
});
