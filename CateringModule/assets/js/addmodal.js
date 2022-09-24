


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
                "data": "food_name", "title": "Yemek Adı"
            },
            {
                "data": "food_description", "title": "Açıklama"
            },
            {
                "data": "unit_portion", "title": "Porsiyon Miktarı"
            },
            {
                "data": "created_at", "name": "Oluşturma Tarihi",
                "render": function (data) {
                    var date = new Date(parseInt(data.substr(6)));
                    const options = {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    };
                    return date.toLocaleString('tr-TR', options);
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


    var datatable1 = $('#IngredientTable').DataTable({
        language: {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/tr.json"
        },
        "serverSide": true,
        "autoWidth": false,
        "ordering": true,
        "searching": true,
        "paging": true,
        ajax: {
            url: '/Ingredient/GetIngredientList',
            type: 'POST',
            dataType: "json"
        },
        columns: [
            {
                "data": "ingredient_name", "title": "Malzeme Adı"
            },
            {
                "data": "ingredient_description", "title": "Açıklama"
            },
            {
                "data": "ingredient_unit", "title": "Birimi"
            },
            {
                "data": "unit_price", "title": "Birim Fiyat"
            },
            {
                "data": "unit_calorie", "title": "Birim Kalori"
            },
            {
                "data": "min_quantity", "title": "Minimum Miktar"
            },
            {
                "data": "max_quantity", "title": "Maximum Miktar"
            },
            {
                "data": "tax_rate", "title": "Kdv"
            },
            {
                "data": "accounting_code", "title": "Muhasebe Kodu"
            },
            {
                "data": "created_at", "name": "Oluşturma Tarihi",
                "render": function (data) {
                    var date = new Date(parseInt(data.substr(6)));
                    const options = {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    };
                    return date.toLocaleString('tr-TR', options);
                }
            },
            {
                'data': null,
                'render': function (data, type, row) {
                    return "<button class='btn btn-warning btnDuzenle' value='" + row.ingredient_id + "'>Düzenle</button> <button class='btn btn-danger btnSil' value='" + row.ingredient_id + "'>Sil</button>"
                }
            }
        ]
    });
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

                if (data == "1") {
                    swal('Tebrikler!', 'Veri başarı ile eklendi', 'success');
                    datatable.draw();

                    $("#add_food_form")[0].reset();
                }
                else {
                    swal('HATA!', 'Veri eklenirken bir hata oluştu', 'error');

                }

            },
            error: function () {
                swal('HATA!', 'Veri eklenirken bir hata oluştu', 'error');
            }
        })
    })

    $("#CancelFood").click(function () {
     $("#add_food_form")[0].reset();
    })

    $("#CancelIngredient").click(function () {
        $("#add_ingredient_form")[0].reset();
    })

    $("#EditFood").click(function () {

        let food = {
            food_id: $("#food_id").val(),
            food_name: $("#edit_food_name").val(),
            food_description: $("#edit_food_description").val(),
            unit_portion: $("#edit_unit_portion").val()

        };


        $.ajax({
            type: "POST",
            url: "/Food/EditFood",
            data: food,
            success: function (data) {

                if (data == "1") {
                    swal('Tebrikler!', 'Veri başarı ile güncellendi', 'success');
                    datatable.draw();

                    $("#add_food_form")[0].reset();
                }
                else {
                    swal('HATA!', 'Veri güncellenirken bir hata oluştu', 'error');
                }
            },
            error: function () {
                swal('HATA!', 'Veri güncellenirken bir hata oluştu', 'error');
            }
        })
    })

    $("#SetFoodList").on("click", ".btnSil", function () {



        if (confirm("Veriyi silmek istediğinizden emin misiniz?")) {
            var id = $(this).val();
            var removingRow = $(this).closest('tr');
            var i = removingRow[0].rowIndex;
            $.ajax({
                type: "POST",
                url: "/Food/DeleteFood/" + id,
                data: id,
                success: function (data) {
                    if (data == "1") {
                        swal('Tebrikler!', 'Veri başarı ile silindi', 'success');
                        datatable.draw();
                    }
                    else {
                        swal('HATA!', 'Veri silinirken bir hata oluştu', 'error');
                    }
                },
                error: function () {
                    swal('HATA!', 'Veri silinirken bir hata oluştu', 'error');
                }
            })
        }

    })

    $("#SetFoodList").on("click", ".btnDuzenle", function () {
        $('#ModalFoodEdit').modal('show');
        var id = $(this).val();

        var editingRow = $(this).closest('tr');


        var food_name = editingRow.find("td:eq(0)").text(); // get current row 1st TD value
        var food_description = editingRow.find("td:eq(1)").text(); // get current row 2nd TD
        var unit_portion = editingRow.find("td:eq(2)").text(); // get current row 3rd TD

        $("#food_id").val(id);
        $("#edit_food_name").val(food_name);
        $("#edit_food_description").val(food_description);
        $("#edit_unit_portion").val(unit_portion);
    })


    $("#EditIngredient").click(function () {

        let ingredient = {
            ingredient_id: $("#ingredient_id").val(),
            ingredient_name: $("#edit_ingredient_name").val(),
            ingredient_description: $("#edit_ingredient_description").val(),
            ingredient_unit: $("#edit_ingredient_unit").val(),
            unit_price: $("#edit_unit_price").val(),
            unit_calorie: $("#edit_unit_calorie").val(),
            min_quantity: $("#edit_min_quantity").val(),
            max_quantity: $("#edit_ max_quantity").val(),
            tax_rate: $("#edit_tax_rate").val(),
            accounting_code: $("#edit_accounting_code").val()

        };


        $.ajax({
            type: "POST",
            url: "/Ingredient/EditIngredient",
            data: ingredient,
            success: function (data) {

                if (data == "1") {
                    swal('Tebrikler!', 'Veri başarı ile güncellendi', 'success');
                    datatable1.draw();

                    $("#add_ingredient_form")[0].reset();
                }
                else {
                    swal('HATA!', 'Veri güncellenirken bir hata oluştu', 'error');
                }
            },
            error: function () {
                swal('HATA!', 'Veri güncellenirken bir hata oluştu', 'error');
            }
        })
    })

    $("#SetIngredientList").on("click", ".btnSil", function () {
        if (confirm("Veriyi silmek istediğinizden emin misiniz?")) {//SİLMEK İÇİN UYARIYORUZ
            var id = $(this).val();
            var removingRow = $(this).closest('tr');
            var i = removingRow[0].rowIndex;
            $.ajax({
                type: "POST",
                url: "/Ingredient/DeleteIngredient/" + id,
                data: id,
                success: function (data) {
                    if (data == "1") {
                        swal('Tebrikler!', 'Veri başarı ile silindi', 'success');
                        datatable1.draw();
                    }
                    else {
                        swal('HATA!', 'Veri silinirken bir hata oluştu', 'error');
                    }
                },
                error: function () {
                    swal('HATA!', 'Veri silinirken bir hata oluştu', 'error');
                }
            })

        }
    })

    $("#SetIngredientList").on("click", ".btnDuzenle", function () {
        console.log("modal açılcak");
        $('#ModalIngredientEdit').modal('show');
        console.log("modal açıldı");
        var id = $(this).val();

        var editingRow = $(this).closest('tr');


        var ingredient_name = editingrow.find("td:eq(0)").text(); // get current row 1st td value
        var ingredient_description = editingrow.find("td:eq(1)").text(); // get current row 2nd td
        var ingredient_unit = editingrow.find("td:eq(2)").text(); // get current row 3rd td
        var unit_price = editingrow.find("td:eq(3)").text(); // get current row 4rd td
        var unit_calorie = editingrow.find("td:eq(4)").text(); // get current row 5rd td
        var min_quantity = editingrow.find("td:eq(5)").text(); // get current row 6rd td
        var max_quantity = editingrow.find("td:eq(6)").text(); // get current row 7rd td
        var tax_rate = editingrow.find("td:eq(7)").text(); // get current row 8rd td
        var accounting_code = editingrow.find("td:eq(8)").text(); // get current row 9rd td


        $("#ingredient_id").val(id);
        $("#edit_ingredient_name").val(ingredient_name);
        $("#edit_ingredient_description").val(ingredient_description);
        $("#edit_ingredient_unit").val(ingredient_unit);
        $("#edit_unit_price").val(unit_price);
        $("#edit_unit_calorie").val(unit_calorie);
        $("#edit_min_quantity").val(min_quantity);
        $("#edit_max_quantity").val(max_quantity);
        $("#edit_tax_rate").val(tax_rate);
        $("#edit_accounting_code").val(accounting_code);
    })

    $("#AddIngredient").click(function () {

        let ingredient = {
            ingredient_name: $("#ingredient_name").val(),
            ingredient_description: $("#ingredient_description").val(),
            ingredient_unit: $("#ingredient_unit").val(),
            unit_calorie: $("#unit_calorie").val(),
            unit_price: $("#unit_price").val(),
            tax_rate: $("#tax_rate").val(),
            min_quantity: $("#min_quantity").val(),
            max_quantity: $("#max_quantity").val(),
            accounting_code: $("#accounting_code").val()
        };

        $.ajax({
            type: "POST",
            url: "/Ingredient/AddIngredient",
            data: ingredient,
            success: function (data) {


                if (data == "1") {
                    swal('Tebrikler!', 'Veri başarı ile eklendi', 'success');
                    datatable1.draw();

                    $("#add_ingredient_form")[0].reset();
                }
                else {
                    swal('HATA!', 'Veri eklenirken bir hata oluştu', 'error');
                }

            },
            error: function () {
                swal('HATA!', 'Veri eklenirken bir hata oluştu', 'error');
            }
        })
    })
});































 





