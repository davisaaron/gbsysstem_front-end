$(document).ready(function()
{
	 $("#alertSuccess").hide();
	 $("#alertError").hide();
}); 

$(function (){
	var $apps = $('#apps');
	var $PID = $('#PID');
	var $cardName = $('#cardName');
	var $cardNo = $('#cardNo');
	var $zipCode = $('#zipCode');
	var $BID = $('#BID');
	var $CID = $('#CID');
	
	

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/Payment/webapi/Payment/payment',
		success: function(apps){
			//console.log('success',data);
			$.each(apps, function(i, app){
				$apps.append('<li><div class="card shadow-lg p-3 mb-5 bg-white rounded bg-light m-2\" style=\"width: 12rem;float: left;">'
							+'PID:<span class="noedit PID">' + app.PID +'</span><input class="edit PID"/>'+'<br>'
							+'Card Name:<span class="noedit cardName">' + app.cardName +'</span><input class="edit cardName"/>'+'<br>'
							+'Card No:<span class="noedit cardNo">'+ app.cardNo +'</span><input class="edit cardNo"/> '+'<br>'
							+'ZipCode:<span class="noedit cipCode">'+ app.zipCode +'</span><input class="edit zipCode"/> '+'<br>'
							+'BID:<span class="noedit BID">'+ app.BID +'</span><input class="edit BID"/> '+'<br>'
							+'CID:<span class="noedit CID">'+ app.CID +'</span><input class="edit CID"/>'+' <br>'
							+'<input type="button" id="'+ app.PID +'" value="Remove" class="btn btn-outline-danger remove">'+'<br>'
							+'<input type="button" " value="Edit" class="editapp btn btn-outline-primary noedit">'+'<br>'
							+'<input type="button" " value="Save" class="saveedit btn btn-outline-success edit">'+'<br>'
							+'<input type="button" " value="Cancel" class="canceledit btn btn-outline-danger edit"></li>');

			});
		},
		error: function() {
			alert('Payment loading error...');
		}
	});
	
	
	$('#btnSave').on('click', function(){
		
		//clear status messages
		$("#alertSuccess").text("");
		$("#alertSuccess").hide();
		$("#alertError").text("");
		$("#alertError").hide();
		
		//Form validation
		var status = validatePaymentForm(); 
		

		
		//Check not valid
		if (status != true)
		 {
			 $("#alertError").text(status);
			 $("#alertError").show();
			 return;
		 } 
		
		
        //IF valid		
		var app = {
				PID: $PID.val(),
				cardName: $cardName.val(),
				cardNo: $cardNo.val(),
				zipCode: $zipCode.val(),
				BID: $BID.val(),
				CID: $CID.val(),

		};
		

		
		$.ajax({
			headers: { 
		        'Accept': 'application/json',
		        'Content-Type': 'application/json' 
		    },
			type: 'POST',
			url: 'http://localhost:8080/Payment/webapi/Payment/payment/',
			data: JSON.stringify(app),
			dataType: 'json',
			success: function(newPayment){
				console.log("Inserted");
				$apps.append('<li><div class="card shadow-lg p-3 mb-5 bg-white rounded bg-light m-2\" style=\"width: 12rem;float: left;">'
						+'PID:<span class="noedit PID">' + newPayment.PID +'</span><input class="edit PID"/>'+'<br>'
						+'cardName:<span class="noedit cardName">' + newPayment.cardName +'</span><input class="edit cardName"/>'+'<br>'
						+'cardNo:<span class="noedit cardNo">'+ newPayment.cardNo +'</span><input class="edit cardNo"/> '+'<br>'
						+'zipCode:<span class="noedit zipCode">'+ newPayment.zipCode +'</span><input class="edit zipCode"/> '+'<br>'
						+'BID:<span class="noedit BID">'+ newPayment.BID +'</span><input class="edit BID"/>'+'<br>'
						+'CID:<span class="noedit CID">'+ newPayment.CID +'</span><input class="edit CID"/> '+'<br>'
						+'<input type="button" id="'+ newPayment.PID +'" value="Remove" class="btn btn-outline-danger remove">'+'<br>'
						+'<input type="button" " value="Edit" class="editapp btn btn-outline-primary noedit">'+'<br>'
						+'<input type="button" " value="Save" class="saveedit btn btn-outline-success edit">'+'<br>'
						+'<input type="button" " value="Cancel" class="canceledit btn btn-outline-danger edit"></li>');
				
				//Show Success Message
				$("#alertSuccess").text("Your Payement Details Saved Successfully");
				$("#alertSuccess").show();

				$("#formPayment")[0].reset(); 
				
			},
			
			error: function() {
				alert('Payment Saving Error');
			}
		});
		
		function validatePaymentForm()
		{
			// Card NAME
			if ($("#cardName").val().trim() == "")
			 {
			 return "Insert card name.";
			 }

			//Card No
			if ($("#cardNo").val().trim() == "")
			 {
			 return "Insert card no.";
			 }

			//ZipCode
			if ($("#zipCode").val().trim() == "")
			 {
			 return "Insert zipCode.";
			 }

			//BID
			if ($("#BID").val().trim() == "")
			 {
			 return "Insert BID.";
			 }

			if ($("#CID").val().trim() == "")
			 {
			 return "Insert CID.";
			 }

			return true;
		}
		

		
	});
	
	
	$apps.delegate('.remove','click',function(){
		var $li=$(this).closest('li');
		var self = this;
		$.ajax({
			type:'DELETE',
			url:'http://localhost:8080/Payment/webapi/Payment/payment/'+$(this).attr('id'),
			success: function(){
				console.log("Deleted");
				$(self);
				$li.fadeOut(300,function(){
					$(this).remove();
					
					
					
				})
				
			},
		
			error: function() {
				alert('Payment Delete Error');
			}
		});
	});
	
	
$apps.delegate('.editapp','click',function(){
		
		var $li=$(this).closest('li');
		$li.find('input.PID').val($li.find('span.PID').html());
		$li.find('input.cardName').val($li.find('span.cardName').html());
		$li.find('input.cardNo').val($li.find('span.cardNo').html());
		$li.find('input.zipCode').val($li.find('span.zipCode').html());
		$li.find('input.BID').val($li.find('span.BID').html());
		$li.find('input.CID').val($li.find('span.CID').html());
		$li.addClass('edit');
	});
	
	$apps.delegate('.canceledit','click',function(){
		$(this).closest('li').removeClass('edit');
		
	});
	
	$apps.delegate('.saveedit','click',function(){
		var $li=$(this).closest('li');
		var app={
				PID: $li.find('input.PID').val(),
				cardName: $li.find('input.cardName').val(),
				cardNo: $li.find('input.cardNo').val(),
				zipCode: $li.find('input.zipCode').val(),
				BID: $li.find('input.BID').val(),
				CID: $li.find('input.CID').val()
				
		};
		
		$.ajax({
			headers:{
				'Accept':'application/json',
				'Content-Type':'application/json'
					
					
			},
			type: 'PUT',
			url: 'http://localhost:8080/Payment/webapi/Payment/payment',
			data: JSON.stringify(app),
			dataType: 'json',
			
			success: function(){
				$li.find('span.PID').html(app.PID);
				$li.find('span.cardName').html(app.cardName);
				$li.find('span.cardNo').html(app.cardNo);
				$li.find('span.zipCode').html(app.zipCode);
				$li.find('span.BID').html(app.BID);
				$li.find('span.CID').html(app.CID);
				$li.removeClass('edit');
				
				$("#alertSuccess").text("Your Payment Details Updated Successfully");
				$("#alertSuccess").show();
				},
		
				error: function(){
				alert('Payment Update Error');
			}
			
		});
	});
	
	
	
	
	
	
});