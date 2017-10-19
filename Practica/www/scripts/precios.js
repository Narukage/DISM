function tablaprecios() {
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            url: 'https://dev.datos.ua.es/uapi/U8xwQtxtdkyr9ZpFYy5v/datasets/38/data',
            dataType: 'jsonp',
            async: false,
            cache: false,
            success: function (data) {
                var tr;
                console.log(data);
                tr = $('<th>PRODUCTO</th><th>PRECIO</th>');
                $('#tabla').append(tr);

                for (var i = 0; i < data.length; i++) {
                    tr = $('<tr/>');
                    if (data[i].PRODUCTO != " ") {
                        tr.append("<td>" + data[i].PRODUCTO + "</td>");
                        if (data[i]["PRECIO (\u20ac)/PREU (\u20ac)"] == " ") {
                            tr.append("<td>" + "sin especificar" + "</td>");
                        } else {
                            tr.append("<td>" + data[i]["PRECIO (\u20ac)/PREU (\u20ac)"] + "</td>");
                        }
                    }
                    $('#tabla').append(tr);
                }
            }
        });
    });
}

tablaprecios();