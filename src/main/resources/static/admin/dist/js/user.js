
$(function () {
    $("#jqGrid").jqGrid({
        url: '/users',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'id', index: 'id', width: 50, key: true, hidden: true},
            {label: 'Email Address', name: 'email', index: 'email', width: 180},
            {label: 'Name', name: 'name', index: 'name', width: 100},       
        ],
        height: 560,
        rowNum: 10,
        rowList: [10, 20, 50],
        styleUI: 'Bootstrap',
        loadtext: 'Information reading...',
        rownumbers: false,
        rownumWidth: 20,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader: {
            root: "",
            page: "",
            total: "",
            records: ""
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order",
        },
        gridComplete: function () {
            //Hide the scroll bar at the bottom of the grid
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
    $(window).resize(function () {
        $("#jqGrid").setGridWidth($(".card-body").width());
    });
});

/**
 * jqGridReload
 */
function reload() {
    var page = $("#jqGrid").jqGrid('getGridParam', 'page');
    $("#jqGrid").jqGrid('setGridParam', {
        page: page
    }).trigger("reloadGrid");
}

function search() {
    //Title keywords
    var keyword = $('#keyword').val();
    if (!validLength(keyword, 100)) {
        swal("Search field length is too large!", {
            icon: "error",
        });
        return false;
    }
    //Data encapsulation
    var searchData = {keyword: keyword};
    console.log(searchData)
    //Incoming query condition parameters
    $("#jqGrid").jqGrid("setGridParam", {postData: searchData});
    //Click the search button by default to start from the first page
    $("#jqGrid").jqGrid("setGridParam", {page: 1});
    //Submit post and refresh form
    $("#jqGrid").jqGrid("setGridParam", {url: usersBaseURL+'/list'}).trigger("reloadGrid");
}


//Bind the save button on the modal
$('#saveButton').click(function () {
    var id = $("#id").val();
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();   
    var mobile = $("#mobile").val();   
    var userType = $("#userType").val();   
    if (!validCN_ENString2_18(firstName)) {
        $('#edit-error-msg').css("display", "block");
        $('#edit-error-msg').html("Please enter a firstName that meets the specification！");
        return;
    }    
    if (!validCN_ENString2_100(lastName)) {
        $('#edit-error-msg').css("display", "block");
        $('#edit-error-msg').html("Please enter a lastName that meets the specification！");
        return;
    }
    if (!validCN_ENString2_100(userType)) {
        $('#edit-error-msg').css("display", "block");
        $('#edit-error-msg').html("Please enter a userType that meets the specification！");
        return;
    }
    var params = $("#userForm").serialize();
    var url = usersBaseURL+'/save';
    if (id != null && id > 0) {
        url = usersBaseURL+'/update';
    }
    $.ajax({
        type: 'POST',//Method type
        url: url,
        data: params,
        success: function (result) {
            if (result.resultCode == 200 && result.data) {
                $('#userModal').modal('hide');
                swal("Successfully saved", {
                    icon: "success",
                });
                reload();
            }
            else {
                $('#userModal').modal('hide');
                swal("Save failed", {
                    icon: "error",
                });
            }
            ;
        },
        error: function () {
            swal("operation failed", {
                icon: "error",
            });
        }
    });

});

function userEdit() {
    var id = getSelectedRow();
    if (id == null) {
        return;
    }
    reset();
    //Request data
    $.get(usersBaseURL+"/info/" + id, function (r) {
        if (r.resultCode == 200 && r.data != null) {
            //Fill data to modal
            $("#firstName").val(r.data.firstName);
            $("#lastName").val(r.data.lastName);
            $("#email").val(r.data.email); 
            $("#mobile").val(r.data.mobile);           
            $("#userType").val(r.data.userType);
            
        }
    });
    $('.modal-title').html('User data modification');
    $('#userModal').modal('show');
    $("#id").val(id);
}

function deleteUser() {
    var ids = getSelectedRows();
    if (ids == null) {
        return;
    }
    swal({
        title: "Confirm popup",
        text: "Are you sure you want to delete data?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((flag) => {
            if (flag) {
                $.ajax({
                    type: "POST",
                    url: usersBaseURL+"/setDeleted/true",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.resultCode == 200) {
                            swal("successfully deleted", {
                                icon: "success",
                            });
                            $("#jqGrid").trigger("reloadGrid");
                        } else {
                            swal(r.message, {
                                icon: "error",
                            });
                        }
                    }
                });
            }
        }
    );
}

function restorUser() {
    var ids = getSelectedRows();
    if (ids == null) {
        return;
    }
    swal({
        title: "Confirm popup",
        text: "Are you sure you want to restore data?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((flag) => {
            if (flag) {
                $.ajax({
                    type: "POST",
                    url: usersBaseURL+"/setDeleted/false",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.resultCode == 200) {
                            swal("successfully restored", {
                                icon: "success",
                            });
                            $("#jqGrid").trigger("reloadGrid");
                        } else {
                            swal(r.message, {
                                icon: "error",
                            });
                        }
                    }
                });
            }
        }
    );
}

function activateUser() {
    var id = getSelectedRow();
    if (id == null) {
        return;
    }
    swal({
        title: "Confirm popup",
        text: "Are you sure you want to activate user?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((flag) => {
            if (flag) {
                $.ajax({
                    type: "POST",
                    url: usersBaseURL+"/setActive/true",
                    contentType: "application/json",
                    data: JSON.stringify(id),
                    success: function (r) {
                        if (r.resultCode == 200) {
                            swal("Activated successfully", {
                                icon: "success",
                            });
                            $("#jqGrid").trigger("reloadGrid");
                        } else {
                            swal(r.message, {
                                icon: "error",
                            });
                        }
                    }
                });
            }
        }
    );
}

function deactivateUser() {
    var id = getSelectedRow();
    if (id == null) {
        return;
    }
    swal({
        title: "Confirm popup",
        text: "Are you sure you want to deactivate user?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((flag) => {
            if (flag) {
                $.ajax({
                    type: "POST",
                    url: usersBaseURL+"/setActive/false",
                    contentType: "application/json",
                    data: JSON.stringify(id),
                    success: function (r) {
                        if (r.resultCode == 200) {
                            swal("DeAactivated successfully", {
                                icon: "success",
                            });
                            $("#jqGrid").trigger("reloadGrid");
                        } else {
                            swal(r.message, {
                                icon: "error",
                            });
                        }
                    }
                });
            }
        }
    );
}

function resetPassword() {
    var id = getSelectedRow();
    if (id == null) {
        return;
    }
    swal({
        title: "Confirm popup",
        text: "Are you sure you want to reset user password?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((flag) => {
            if (flag) {
                $.ajax({
                    type: "POST",
                    url: usersBaseURL+"/password/reset",
                    contentType: "application/json",
                    data: JSON.stringify(id),
                    success: function (r) {
                        if (r.resultCode == 200) {
                            swal("Reset password Link sent successfully", {
                                icon: "success",
                            });
                            $("#jqGrid").trigger("reloadGrid");
                        } else {
                            swal(r.message, {
                                icon: "error",
                            });
                        }
                    }
                });
            }
        }
    );
}



function reset() {
    $("#firstName").val('');
    $("#lastName").val('');
    $("#email").val(''); 
    $("#mobile").val(''); 
    $("#userType").val(''); 
    $('#edit-error-msg').css("display", "none");   
}