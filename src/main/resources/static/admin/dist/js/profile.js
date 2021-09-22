var profileBaseURL =getBaseURL() +'/admin/profile'
$(function () {
    //edit personal information
    $('#updateUserNameButton').click(function () {
        $("#updateUserNameButton").attr("disabled",true);
        var email = $('#email').val();
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        if (validUserNameForUpdate(email, firstName,lastName)) {
            //ajax submit data
            var params = $("#userNameForm").serialize();
            $.ajax({
                type: "POST",
                url: profileBaseURL+"/update",
                data: params,
                success: function (r) {
                    if (r == 'success') {
                        alert('Successfully modified');
                    } else {
                        alert('fail to edit');
                        $("#updateUserNameButton").prop("disabled",false);
                    }
                }
            });
        } else {        	
            $("#updateUserNameButton").prop("disabled",false);
        }
    });
    //change Password
    $('#updatePasswordButton').click(function () {
        $("#updatePasswordButton").attr("disabled",true);
        var originalPassword = $('#originalPassword').val();
        var newPassword = $('#newPassword').val();
        var newPasswordConfirm = $('#newPasswordConfirm').val();
        if (validPasswordForUpdate(originalPassword, newPassword,newPasswordConfirm)) {
            var params = $("#userPasswordForm").serialize();          
            $.ajax({
                type: "POST",
                url: profileBaseURL+"/password",
                data: params,
                success: function (r) {
                    console.log(r);
                    if (r == 'success') {
                        alert('Successfully modified');
                        window.location.href = '/admin/login';
                    } else {
                        alert('fail to edit');
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
function validUserNameForUpdate(email, firstName,lastName) {
    if (isNull(email) || email.trim().length < 1) {
        $('#updateUserName-info').css("display", "block");
        $('#updateUserName-info').html("Please enter email！");
        return false;
    }
    if (isNull(firstName) || firstName.trim().length < 1) {
        $('#updateUserName-info').css("display", "block");
        $('#updateUserName-info').html("Please enter firstName！");
        return false;
    }
    if (isNull(lastName) || lastName.trim().length < 1) {
        $('#updateUserName-info').css("display", "block");
        $('#updateUserName-info').html("Please enter lastName！");
        return false;
    }
    if (!validEmail(email)) {
        $('#updateUserName-info').css("display", "block");
        $('#updateUserName-info').html("Please enter a qualified email！");
        return false;
    }   
    return true;
}

/**
 * Password validation
 */
function validPasswordForUpdate(originalPassword, newPassword,newPasswordConfirm) {
    if (isNull(originalPassword) || originalPassword.trim().length < 1) {
        $('#updatePassword-info').css("display", "block");
        $('#updatePassword-info').html("Please enter the original password！");
        return false;
    }
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
