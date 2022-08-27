


$(document).ready(function () {

    var datatable = $('#FoodTable').DataTable({
        language: {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/tr.json"
        },
        "serverSide": true,
        "autoWidth": false,
        "ordering": true,
        "searching": true,
        "paging": true,
        ajax: {
            url: '/Food/GetFoodList',
            type: 'POST',
            dataType: "json"
        },
        columns: [
            {
                "data": "food_name", "title":"Yemek Adı"
            },
            {
                "data": "food_description","title":"Açıklama"
            },
            {
                "data": "unit_portion", "title": "Porsiyon Miktarı"
            },
            {
                "data": "created_at", "name": "Oluşturma Tarihi",
                "render": function (data) {
                    var date = new Date(parseInt(data.substr(6)));
                    return date.toLocaleString();
                }
            },
            {
                'data': null,
                'render': function (data, type, row) {
                    return "<button class='btn btn-warning btnDuzenle' value='" + row.food_id + "'>Düzenle</button> <button class='btn btn-danger btnSil' value='" + row.food_id + "'>Sil</button>"
                }
            }
        ]
    }); 

    //$.ajax({
    //    type: "GET",
    //    url: "/Food/GetFoodList",
    //    success: function (data) {

    //        for (var i = 0; i < data.length; i++) {
    //            datatable.row.add([
    //                data[i].food_name,
    //                data[i].food_name,
    //                data[i].unit_portion,
    //                "<button class='btn btn-warning btnDuzenle' value='" + data[i].food_id + "'>Düzenle</button> <button class='btn btn-danger btnSil' value='" + data[i].food_id + "'>Sil</button>"
    //            ]).draw();
    //        }

    //    },
    //    error: function () {
    //        swal('HATA!', 'Veri eklenirken bir hata oluştu', 'error');
    //    }
    //})

    


    $("#AddFood").click(function () {

        let food = {
            food_name: $("#food_name").val(),
            food_description: $("#food_description").val(),
            unit_portion: $("#unit_portion").val()
        };

        $.ajax({
            type: "POST",
            url: "/Food/AddFood",
            data: food,
            success: function (data) {

                var food_id = '<td>' + data.Result.Food_Id + '</td>';
                var food_name = '<td>' + data.Result.Food_Name + '</td>';
                var food_description = '<td>' + data.Result.Food_Description + '</td>';
                var unit_portion = '<td>' + data.Result.Food_Portion + '</td>';
                var created_at = '<td>' + data.Result.Food_CreatedAt + '</td>';     

                

                swal('Tebrikler!', 'Veri başarı ile eklendi', 'success');


                datatable.draw();
                //datatable.row.add([
                //    data.Result.Food_Name,
                //    data.Result.Food_Description,
                //    data.Result.Food_Portion,
                //    data.Result.Food_CreatedAt,
                //    "<button class='btn btn-warning btnDuzenle' value='" + data.Result.Food_Id + "'>Düzenle</button> <button class= 'btn btn-danger btnSil' value = '" + data.Result.Food_Id + "' > Sil</button > "
                //]).draw();
                $("#add_food_form")[0].reset();

            },
            error: function () {
                swal('HATA!', 'Veri eklenirken bir hata oluştu', 'error');
            }
        })
    })

    $("#EditFood").click(function () {

        let food = {
            food_id: $("#food_id").val(),
            food_name: $("#edit_food_name").val(),
            food_description: $("#edit_food_description").val(),
            unit_portion: $("#edit_unit_portion").val()
            
        };
        var i = $("#edit_row_index").val();

        $.ajax({
            type: "POST",
            url: "/Food/EditFood",
            data: { food,i },
            success: function (data) {
               
                swal('Tebrikler!', 'Veri başarı ile güncellendi.', 'success');
                var dataRow = datatable.row(i).data();

                dataRow[0] = data.Result.Food_Name;
                dataRow[1] = data.Result.Food_Description;
                dataRow[2] = data.Result.Food_Portion;

                datatable.row(i).data(dataRow).draw();
               
            },
            error: function () {
                swal('HATA!', 'Veri güncellenirken bir hata oluştu', 'error');
            }
        })
    })

    $("#SetFoodList").on("click",".btnSil", function () {
        var id = $(this).val();
        var removingRow = $(this).closest('tr');
        var i = removingRow[0].rowIndex;
        $.ajax({
            type: "POST",
            url: "/Food/DeleteFood/" + id,
            data: id,
            success: function (data) {
                if (data == "1") {

                    datatable.row(i).remove().draw();

                    swal('Tebrikler!', 'Veri başarı ile silindi', 'success');
                }
                else {
                    swal('HATA!', 'Veri silinirken bir hata oluştu', 'error');
                }
            },
            error: function () {
                swal('HATA!', 'Veri silinirken bir hata oluştu', 'error');
            }
        })


    })

    $("#SetFoodList").on("click", ".btnDuzenle", function () {
        $('#ModalFoodEdit').modal('show');
        var id = $(this).val();

        var editingRow = $(this).closest('tr');
        var i = editingRow[0].rowIndex;

        var food_name = editingRow.find("td:eq(0)").text(); // get current row 1st TD value
        var food_description = editingRow.find("td:eq(1)").text(); // get current row 2nd TD
        var unit_portion = editingRow.find("td:eq(2)").text(); // get current row 3rd TD
        
        $("#food_id").val(id);
        $("#edit_food_name").val(food_name);
        $("#edit_food_description").val(food_description) ;
        $("#edit_unit_portion").val(unit_portion);
        $("#edit_row_index").val(i);
  
    })
    
});





