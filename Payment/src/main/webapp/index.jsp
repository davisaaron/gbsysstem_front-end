
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<link rel="stylesheet" href="Views/styles.css">
</head>
<body>
<header>
    <div class="header-banner">
        <h1>GB SYSTEM</h1>
    </div>
    <div class="clear"></div>
   
    </nav>
</header>
<div class="container">
<div class="row">
	<div class="col-sm-4">
    
     
    </div>

	<div class="col-sm-4">
	<form id="formPayment" name="formPayment" method="post" action="Payment.jsp" ><br>
	
		<h3 class="text-center">Payment Page</h3><br>
		<input type="text" id="PID" name="PID" class="form-control form-control-sm" placeholder= "PID"><br>
	
		<input type="text" id="cardName" name="cardName" class="form-control form-control-sm" placeholder="Card Name" ><br>
		<input type="text" id="cardNo" name="cardNo" class="form-control form-control-sm" placeholder="Card No"><br>
		<input type="text" id="zipCode" name="zipCode" class="form-control form-control-sm" placeholder="ZipCode"><br>
		<input type="text" id="bid" name="bid" class="form-control form-control-sm" placeholder= "bid"><br>
		<input type="text" id="cid" name="cid" class="form-control form-control-sm" placeholder= "cid"><br>
		
		
			
		<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-info my-4 btn-block">
		
	</form>
	</div>
	

	<div class="container text-center">
			<div id="alertSuccess" class="alert alert-success"></div>
			<div id="alertError" class="alert alert-danger"></div>
	</div>

	


			


   </div>
	<ul style="list-style: none;" id="apps" class="row" ></ul>
</div>

<script src="Components/jquery-3.5.0.min.js"></script>
<script src="Components/main.js"></script>
<script>
$(window).scroll(function(){
    if ($(window).scrollTop() >= 300) {
        $('nav').addClass('fixed-header');
        $('nav div').addClass('visible-title');
    }
    else {
        $('nav').removeClass('fixed-header');
        $('nav div').removeClass('visible-title');
    }
});
</script>

</body>
</html>
