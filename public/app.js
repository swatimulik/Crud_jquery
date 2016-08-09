

	

$(function() {

			
			
    $("#delet").click(
        function() {
			
		
				var  del_text1= $("#del_text").val();
				console.log(del_text1);
				$.ajax({
					url: '/jokes',
					type: 'DELETE',
					contentType: 'application/json',
					data: JSON.stringify({'setup': del_text1}),
					success: function(data, status, xhr) {
					dynamic(data);
				} });
				});

				
		$("#insert").click(function(){
			var  setup_text= $("#setup_text").val();
			var  punch_text= $("#punch_text").val();
					$.ajax({
					url: '/jokes',
					type: 'POST',
					contentType: 'application/json',
					data: JSON.stringify({'setup': setup_text, 'punch':punch_text}),
					success: function(data, status, xhr) {
					dynamic(data);
				} });
				});
	
	$("#updat").click(function(){
				var  old_text1= $("#old_text").val();
				var  new_set= $("#new_setup").val();
				var  new_punch= $("#new_punchline").val();
		
					$.ajax({
					url: '/jokes',
					type: 'PUT',
					contentType: 'application/json',
					data: JSON.stringify({ 'setup': old_text1,
					'setup1': new_set,
					'punchline1': new_punch}),
					success: function(data, status, xhr) {
					dynamic(data);
				} });
				});
						
				
				
				function dynamic(data){
					$("p").empty();
					var container = $(document.createElement('ul'));
					
					$.each( data, function( i, item ) {

					$(container).append("<li>  Setup :"+ item.setup+" Punchline :"+item.punchline+"</li>");	
				});
				$("p").append(container);
				};                                                                                                    
				
});

