// ==UserScript==
// @name        E-shop.gr on steroids
// @description Shows ratings without opening the product page, completely new interface and features,removal of adds and anything space consuming.
// @version     1.1
// @author      mhtsos
// @include     http*www.e-shop.gr/*
// @icon        https://media.licdn.com/media/AAEAAQAAAAAAAABGAAAAJGI2MWY0MjE1LTA1MzMtNDVhNi1hMjc3LThmYzk1ZTY1MTU3Yg.png
// @grant       none
// @run-at document-start
// @downloadURL https://raw.githubusercontent.com/JimTortex/E-shop.gr_on_steroids/master/E-shop.gr_on_steroids.user.js
// ==/UserScript==


if (window.top == window.self) {

	document.getElementsByTagName("html")[0].style.visibility = "hidden";							//first things first :D
	window.addEventListener ("load", main, false);
}																									//end if



function main(){
	document.getElementsByTagName("html")[0].style.visibility = "visible";							//restore visibility

	document.getElementById("dock").remove();														//remove adds and useless stuff
	document.getElementById("left_panel_social").remove();
	if (document.getElementById("web_footer").getElementsByTagName("img")[0]){
		document.getElementById("web_footer").getElementsByTagName("img")[0].remove();
	}
	if ( document.getElementById("legoplaymobil_side") ){
		document.getElementById("legoplaymobil_side").remove()
	}

	var frames = document.getElementsByTagName("iframe");											//remove right frame
	for (var i = 0; i < frames.length; i++) {
		if (frames[i].height === "486") {
			frames[i].remove();
		}
	};

	if(document.getElementById("web_body")) {														//remove annoying table :D
		var annoyingTable = document.getElementById("web_body").getElementsByTagName("table");
		for (var i = 0; i < annoyingTable.length; i++) {
			if (annoyingTable[i].width === "97%") {
				annoyingTable[i].remove();
			}
		};
	}


	var link = document.createElement("link");														//load custom css
	link.href = "http://83.212.125.86/style.css";
	link.type = "text/css";
	link.rel = "stylesheet";
	cssLinks = document.getElementsByTagName('link');
	for (var i = 0; i < cssLinks.length; i++) {
		if (cssLinks[i].href == "http://www.e-shop.gr/style.css") {
			cssLinks[i].remove();
			document.getElementsByTagName("head")[0].appendChild(link);

		};
		
	};



	var headerTable = document.getElementById("web_header").getElementsByTagName("table")[0];		//change top background
	headerTable.style.background = "url(http://83.212.125.86/images/background.jpg)";

	var logoImg = headerTable.getElementsByTagName("img")[0];
	logoImg.src = "http://83.212.125.86/images/logo.png";
	logoImg.removeAttribute("height");
	logoImg.parentNode.parentNode.style.verticalAlign = "bottom";

	var searchInput                                       = headerTable.getElementsByTagName("input")[0];	//searchinput
	searchInput.style.visibility                          = "hidden";
	searchInput.style.background                          = "rgba(0, 0, 0, 0.66)";
	searchInput.style.fontSize                            = "27px";
	searchInput.style.marginTop                           = "1em";
	searchInput.style.width                               = "90%";
	searchInput.style.boxShadow                           = "";
	searchInput.parentNode.parentNode.style.verticalAlign = "top";
	searchInput.parentNode.parentNode.style.textAlign     = "center";
	searchInput.parentNode.parentNode.style.width         = "90%";


	var magnifier                            = headerTable.getElementsByTagName("input")[1];				//magnifier
	magnifier.src                            = "http://83.212.125.86/images/search.png";
	magnifier.parentNode.style.verticalAlign = "bottom";
	magnifier.parentNode.style.width         = "";

	magnifier.onclick = function toggleSearch(){
	    if(searchInput.style.visibility === "visible"){
		  searchInput.style.visibility = "hidden";
		  headerTable.style.height = "0em";
	     }
	    else{
		  searchInput.style.visibility = "visible";
		  headerTable.style.height = "15em";
		  setTimeout(function (){searchInput.focus();} , 50);
	    }
	};
	document.body.onkeydown = function(event){																//press s and search appers
		if (event.keyCode == 83) {
			if (searchInput.style.visibility === "hidden") {

				magnifier.onclick();
			};
		}
	};


	headerDiv = document.getElementById("web_header").getElementsByTagName("div")[0];						//newsletter & login
	headerDiv.getElementsByTagName("img")[0].src                                      = "http://83.212.125.86/images/newsletter.png";
	headerDiv.getElementsByTagName("div")[1].style.background                         = "#273341";
	headerDiv.getElementsByTagName("div")[1].style.height                             = "27px";
	headerDiv.getElementsByTagName("div")[1].style.padding                            = "4px 0px 0px 28px";
	headerDiv.getElementsByTagName("div")[1].getElementsByTagName("a")[0].style.color = "rgba(255, 255, 255, 0.93)";
	headerDiv.getElementsByTagName("div")[1].getElementsByTagName("a")[1].style.color = "rgba(255, 255, 255, 0.93)";
	headerDiv.getElementsByTagName("div")[2].style                                    = "float:left;border-style: solid;border-width: 31px 29px 0 0;border-color: #273341 transparent transparent transparent;" ;
	headerDiv.getElementsByTagName("div")[2].getElementsByTagName("img")[0].remove();


	spans = headerDiv.getElementsByTagName("span");															//replace > with an arrow image
	var img = document.createElement("img");img.src = "http://83.212.125.86/images/right_arrow.png";img.style = "position: relative; top: 4px; margin-left: 0.4em;";

	for (var i = 0; i < spans.length/2-1; i++) {
	    spans[2*i].appendChild(img.cloneNode(false));
	}
	headerDiv.getElementsByTagName("div")[3].innerHTML = headerDiv.getElementsByTagName("div")[3].innerHTML.replace(/&gt;/g, "");





	var menu = document.getElementById("web_menu");															//hide left menu
	menu.style.visibility = "hidden";

	var img = document.createElement("img");img.src = "https://i.stack.imgur.com/avjHH.png";img.title = "Show Secret menu";
	var link = document.createElement("a");link.href = "#";
	link.appendChild(img);

	menu.parentNode.insertBefore(link , menu.parentNode.childNodes[0]);

	link.onmouseover = function(){																			//show left menu
		this.style.display = "none";
		menu.style.visibility = "visible";
	};



	var table_title = document.getElementsByClassName("shop_table_title");									//replace "deite ola ta prointa" with an image
	for (var i = 0; i < table_title.length; i++) {
    if (table_title[i].getElementsByTagName("a")[0]) {
	table_title[i].getElementsByTagName("a")[0].innerHTML = "<img src='http://83.212.125.86/images/list.png'>"
    }
	};

	if (document.getElementById("web_body")) {              
	  
		var web_body = document.getElementById("web_body");


		if (web_body.getElementsByTagName("td")[0].getElementsByTagName("font")[0]) {						//change filters color

			var green_web_body = web_body.getElementsByTagName("td")[0].getElementsByTagName("font");

			for (var i = 0; i < green_web_body.length; i++) {
				green_web_body[i].color = "#8AC007";
			};
		};
	};



	//TO DO:if eimaste se item find td text-align: left; padding: 5px 0px 0px; border-bottom: 2px solid rgb(255, 212, 28); change it //anoying yellow line :D



	var current_url = window.location.href;
	if (current_url.indexOf("list?") > 0){																	//if we are on list mode
		
	  function processProductsList(){

			    function httpGet(url , td)
			    {
				  var xmlhttp=new XMLHttpRequest();
				  xmlhttp.onreadystatechange=function()
				  {
					if (xmlhttp.readyState==4 && xmlhttp.status==200){
					    var parser = new DOMParser();

					    doc        = parser.parseFromString(xmlhttp.responseText, "text/html");
					    txt        = doc.getElementsByClassName("comments_table_title")[1].getElementsByTagName("img")[0];
					    if (txt != undefined){
						  var src        = txt.getAttribute("src");
						  var title = doc.getElementsByClassName("comments_table_title")[2].textContent.slice(14,-1);
						  
						  var reviewers = doc.getElementById("reviewid_1").getElementsByClassName("comments_table_comment1");
						  var comments = doc.getElementById("reviewid_1").getElementsByClassName("comments_table_comment2");

						  title = title + " Reviews" + " and " + comments.length + " Comments:";
						  for (var i = 0; i < comments.length; i++) {
						  		j = i + 1;
						 		title = title +"\n\n"+ reviewers[i].textContent + ":\n" + comments[i].textContent;
						  };

						  var img = document.createElement('img');
						  img.src = src;
						  img.title = "";

						  var link = document.createElement('a');
						  link.style = "margin-left:0.3em;margin-right:0.3em;float:right;";
						  link.title = title;
						  link.classList.add("tooltip");


						  link.appendChild(img);
						  td.appendChild(link);
					    }
					}
				  }
				  xmlhttp.open("POST", url);
				  xmlhttp.overrideMimeType('text/xml; charset=iso-8859-7');
				  xmlhttp.send();
			    }


		  tdlist = document.getElementById("web_body").getElementsByTagName("td");

		  for (var i = 0; i < tdlist.length; i++) {
			  if (tdlist[i].getAttribute("style") === "text-align:left;vertical-align:top;padding:5px 0 5px 10px;color:#8a8a8a;font-size:12px;background-color:#F2F2F2;font-family:Tahoma;"){//ratings magic
				  var href = tdlist[i].getElementsByClassName("faint_link3")[0].href;
				  httpGet(href , tdlist[i]);

				  tdlist[i].parentNode.parentNode.getElementsByTagName("td")[3].getElementsByTagName("img")[0].src = "http://83.212.125.86/images/basket.png";
			  }

			  if (tdlist[i].getAttribute("style") === "text-align:center;vertical-align:middle;padding:5px 0 5px 0;font-size:11px;font-weight:bold;font-family:Verdana;color:555555;line-height:12pt;background-color:#CCCDCF;"){//change bg color and shit on top
			    tdlist[i].style.background = "#3F4356";
			    tdlist[i].style.color = "white";
			    tdlist[i].style.borderRadius = "5px 5px 0 0";
			  }
		  }
	  }


	  processProductsList();
	  
	}																											//end if products list
	
}

