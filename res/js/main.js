function login(){


	if (document.getElementById("station").value === "") {
        alert("Station details required");
        abort;
    }
    if (document.getElementById("eid").value === "") {
        alert("username has to be filled");
        abort;
    }
    if (document.getElementById("epw").value === "") {
        alert("please provide the password");
        abort;
    }



	var xhttp = new XMLHttpRequest();
	xhttp.open('POST','webAppLogin.php',true);
	xhttp.onreadystatechange = function(){
		if(this.readyState==4 && this.status==200){
			console.log(xhttp.responseText);
			if(xhttp.responseText.trim()	==='fail'){
				alert("This employee is not authorised for the station, TRY AGAIN!!..");
				abort;
			}else if (xhttp.responseText.trim()==='pass') {
					station=document.getElementById("station").value;
					user=document.getElementById("eid").value;
					password=document.getElementById("epw").value;

				document.getElementById("login").style.display = "none";
				document.getElementById("main").style.display = "block";
				document.getElementById("currStation").innerHTML = "logged in at :"+station;
				alert("logged in at :"+station);
			}
		}
		else if(this.status==404){
			document.getElementById("demo").innerHTML="please try again!!";
		}
		else if(this.status==403){
			document.getElementById("demo").innerHTML="please try again!!";
		}
	};
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("stationid="+document.getElementById("station").value+"&empid="+document.getElementById("eid").value+"&emppw="+document.getElementById("epw").value);
}


 
function updateParking() {
    
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById("time").innerHTML = t;

    var statusJson = new XMLHttpRequest();
    statusJson.open('POST','getStationParkingStatus.php',true);
    statusJson.onreadystatechange = function(){
    	if(this.readyState == 4 && this.status == 200){
    		var parkstat = JSON.parse(statusJson.responseText);
    		document.getElementById("2wTotal").innerHTML=parkstat.tot_2w_park;
    		document.getElementById("2wAvail").innerHTML=parkstat.avail_2w_park;
    		document.getElementById("2wOccupied").innerHTML=parkstat.occ_2w_park;
    		document.getElementById("2wReserv").innerHTML=parkstat.res_2w_park;
    		document.getElementById("4wTotal").innerHTML=parkstat.tot_4w_park;
    		document.getElementById("4wAvail").innerHTML=parkstat.avail_4w_park;
    		document.getElementById("4wOccupied").innerHTML=parkstat.occ_4w_park;
    		document.getElementById("4wReserv").innerHTML=parkstat.res_4w_park;
    	}
    }
    statusJson.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	statusJson.send("stationid="+window.station);

}


function getBooking(){
	var custname=document.getElementById("custname").value;
	var custnum=document.getElementById("custnum").value;
	var custemail=document.getElementById("custemail").value;
	var vehicleno=document.getElementById("vehicleno").value;
	var vehicletype=document.getElementById("vehicletype").value;
	var vehiclename=document.getElementById("vehiclename").value;
	var vehiclecolor=document.getElementById("vehiclecolor").value;




    if (custname == "") {
        alert("NAME has to be filled");
        abort;
    }
    if (custnum == "") {
        alert("please provide the contact number");
        abort;
    }
    if (vehicleno == "") {
        alert("car no has to be filled");
        abort;
    }
    if (vehicletype == "") {
        alert("please provide the type of vehicle");
        abort;
    }




	var getbook = new XMLHttpRequest();
	getbook.open("POST","getBooking.php",true);
	getbook.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			var bookqr = JSON.parse(getbook.responseText);
			document.getElementById("demo").innerHTML = getbook.responseText;
			var myWindow = window.open("", "MsgWindow", "width=200,height=100");
            myWindow.document.write("<p>"+getbook.responseText+"</p>");


    document.getElementById("custname").value="";
	document.getElementById("custnum").value="";
	document.getElementById("custemail").value="";
	document.getElementById("vehicleno").value="";
	document.getElementById("vehicletype").value="";
	document.getElementById("vehiclename").value="";
	document.getElementById("vehiclecolor").value="";



		}
	}

	getbook.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	getbook.send("custname="+custname+"&custnum="+custnum+"&custemail="+custemail
		+"&vehicleno="+vehicleno+"&vehicletype="+vehicletype+"&vehiclename="+vehiclename
		+"&vehiclecolor="+vehiclecolor+"&stationid="+window.station);

}

function reset(){
	document.getElementById("custname").value="";
	document.getElementById("custnum").value="";
	document.getElementById("custemail").value="";
	document.getElementById("vehicleno").value="";
	document.getElementById("vehicletype").value="";
	document.getElementById("vehiclename").value="";
	document.getElementById("vehiclecolor").value="";

}

function scan(){
	document.getElementById('preview').style.display='block';
	 let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
      scanner.addListener('scan', function (content) {
        console.log(content+" kya dekh rahi ho");
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
}
