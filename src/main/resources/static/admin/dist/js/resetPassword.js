var resetPasswordbaseURL=window.location.href.split('reset-password')[0];
$(function () {
    //reset Password
    $('#updatePasswordButton').click(function () {
        $("#updatePasswordButton").attr("disabled",true);      
        var newPassword = $('#newPassword').val();
        var newPasswordConfirm = $('#newPasswordConfirm').val();
        if (validPasswordForUpdate(newPassword,newPasswordConfirm)) {
            var params = $("#userPasswordForm").serialize(); 
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');           
            $.ajax({
                type: "POST",
                url: resetPasswordbaseURL+"/reset-password/resetPassword/"+token,
                data: params,
                success: function (r) {
                    console.log(r);
                    if (r.resultCode == 200) {
                    	swal("Password has updated successfully", {
                            icon: "success",
                        });  
                    	$("#updatePasswordButton").attr("disabled",true);
                        //window.location.href = 'https://vendapp.co/';
                    } else {
                        alert('fail to update password');
                        $("#updatePasswordButton").attr("disabled",false);
                    }
                }
            });
        } else {
            $("#updatePasswordButton").attr("disabled",false);
        }
    });
})

/**
 *Name verification
 */


/**
 * Password validation
 */
function validPasswordForUpdate(newPassword,newPasswordConfirm) {   
    if (isNull(newPassword) || newPassword.trim().length < 1) {
        $('#updatePassword-info').css("display", "block");
        $('#updatePassword-info').html("New password cannot be empty！");
        return false;
    }
    if (isNull(newPasswordConfirm) || newPasswordConfirm.trim().length < 1) {
        $('#updatePassword-info').css("display", "block");
        $('#updatePassword-info').html("New password Confirm cannot be empty！");
        return false;
    }
    if (!validPassword(newPassword)) {
        $('#updatePassword-info').css("display", "block");
        $('#updatePassword-info').html("Please enter  password that meets the specifications！");
        return false;
    }    

    if (newPassword != newPasswordConfirm) {
    	 $('#updatePassword-info').css("display", "block");
         $('#updatePassword-info').html("Passwords do not match.");
		 return false;
	}
    return true;
}
