// ==UserScript==
// @name        E-shop.gr on steroids
// @description Shows ratings without having to open each product's page, removes adds and anything space consuming.
// @version     1.7.2
// @author      JimTortex
// @include     http*www.e-shop.gr/*
// @icon        https://media.licdn.com/media/AAEAAQAAAAAAAABGAAAAJGI2MWY0MjE1LTA1MzMtNDVhNi1hMjc3LThmYzk1ZTY1MTU3Yg.png
// @grant       none
// @run-at document-start
// @downloadURL https://raw.githubusercontent.com/JimTortex/E-shop.gr_on_steroids/master/E-shop.gr_on_steroids.user.js
// ==/UserScript==


if (window.top == window.self) {

	document.getElementsByTagName("html")[0].style.visibility = "hidden";							//show blank page till page loads
	window.addEventListener ("load", main, false);
}



function main(){
	document.getElementsByTagName("html")[0].style.visibility = "visible";							//restore visibility


	if (document.getElementById("web_footer").getElementsByTagName("img")[0]){
		document.getElementById("web_footer").getElementsByTagName("img")[0].remove();
	}
	if (document.getElementById("slides")){
		document.getElementById("slides").remove();
	}

/*	var frames = document.getElementsByTagName("iframe");											//remove right frame
	for (var i = 0; i < frames.length; i++) {
		if (frames[i].height === "486") {
			frames[i].remove();
		}
	};*/

/*	if(document.getElementById("web_body")) {														//remove annoying table :D
		var annoyingTable = document.getElementById("web_body").getElementsByTagName("table");
		for (var i = 0; i < annoyingTable.length; i++) {
			if (annoyingTable[i].width === "97%") {
				annoyingTable[i].remove();
			}
		};
	}*/


	var link = document.createElement("link");														//load custom css
	link.href = "https://rawgit.com/JimTortex/E-shop.gr_on_steroids/master/style.css";
	link.type = "text/css";
	link.rel = "stylesheet";
	
	document.getElementsByTagName("head")[0].appendChild(link);




	document.body.onkeydown = function(event){														//press s and search focuses
		if (event.keyCode == 83) {
			setTimeout(function (){		document.getElementById("autocompletebox").focus();		} , 50);
		}
	};


	var menu = document.getElementById("web_menu");													//hide left menu
	menu.style.visibility = "hidden";

	var img = document.createElement("img");img.src = "https://raw.githubusercontent.com/JimTortex/E-shop.gr_on_steroids/master/images/show.png";img.title = "Show Secret menu";
	var link = document.createElement("a");link.href = "#";
	link.appendChild(img);

	menu.parentNode.insertBefore(link , menu.parentNode.childNodes[0]);

	link.onmouseover = function(){																	//show left menu
		this.style.display = "none";
		menu.style.visibility = "visible";
	};






	var current_url = window.location.href;
	if (current_url.indexOf("list?") > 0){															//if we are on product listing
		
	  function processProductsList(){

			    function httpGet(url , td)
			    {
				  var xmlhttp=new XMLHttpRequest();
				  xmlhttp.onreadystatechange=function()
				  {
					if (xmlhttp.readyState==4 && xmlhttp.status==200){

					    var parser = new DOMParser();

					    doc        = parser.parseFromString(xmlhttp.responseText, "text/html");
					    txt        = doc.getElementsByClassName("comments_table_title")[0].innerHTML;
						
					    if (txt != ""){

								var rating        = txt.slice(11);
								var pixels_width  = rating*104;
									
								var title = doc.getElementsByClassName("comments_table_title")[2].textContent.slice(14,-1);

								var reviewers = doc.getElementById("reviewid_1").getElementsByClassName("comments_table_comment1");
								var comments = doc.getElementById("reviewid_1").getElementsByClassName("comments_table_comment2");

								title = title + " Reviews" + " and " + comments.length + " Comments:";
								for (var i = 0; i < comments.length; i++) {
										j = i + 1;
									title = title +"\n\n"+ reviewers[i].textContent + ":\n" + comments[i].textContent;
								};

								var img = document.createElement('img');

								img.src = "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png";
								img.style = "background: transparent url('http://images.e-shop.gr/images/web-global.png') no-repeat scroll " + "-" + pixels_width + "px" + " -101px;width: 104px; height: 20px;"
								img.title = "";

								var link = document.createElement('a');
								link.style = "margin-left:0.3em;margin-right:0.3em;float:right;";
								link.title = title;
								link.classList.add("tooltip");


								link.appendChild(img);

								td.appendChild(link);
								 
					    }
								if (td.getElementsByTagName("font")[1]){							//"EKPTWSI %" change color from annoying red to calm blue :D
										 td.getElementsByTagName("font")[1].setAttribute("color", "#0858a7");
								}
					}
				  }
				  xmlhttp.open("POST", url);
				  xmlhttp.overrideMimeType('text/xml; charset=iso-8859-7');
				  xmlhttp.send();
			    }


		  tdlist = document.getElementById("web_body").getElementsByTagName("td");

		  for (var i = 0; i < tdlist.length; i++) {
			  if (tdlist[i].getAttribute("class") === "web-product-title"){							//if class is web-product-title
				  var href = tdlist[i].getElementsByClassName("web-title-link")[0].href;
				  httpGet(href , tdlist[i]);

			  }

			  if (tdlist[i].getAttribute("style") === "text-align:center;vertical-align:middle;padding:5px 0 5px 0;font-size:11px;font-weight:bold;font-family:Verdana;color:555555;line-height:12pt;background-color:#CCCDCF;"){//change bg color
			    tdlist[i].style.background = "#3F4356";
			    tdlist[i].style.color = "white";
			    tdlist[i].style.borderRadius = "5px 5px 0 0";
			  }
		  }
	  }


	  processProductsList();
	  
	}																								//end if products listing
	
}
