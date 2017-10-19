function lacosa() {
    $(document).ready(function () {
        var posicion = " ";
        $.ajax({
            type: 'GET',
            url: 'https://dev.datos.ua.es/uapi/U8xwQtxtdkyr9ZpFYy5v/datasets/39/data',
            dataType: 'jsonp',
            async: false,
            cache: false,
            success: function (data) {
                var cont = 0;
                var array = new Array(30);
                for (var i = 0; i < data.length; i++) {
                    var ided = data[i]["ID_EDIFICIO COD. SIGUA"];
                    array[i] = ided;

                    $.ajax({
                        type: 'GET',
                        url: 'https://dev.datos.ua.es/uapi/U8xwQtxtdkyr9ZpFYy5v/datasets/11/data',
                        dataType: 'jsonp',
                        async: false,
                        cache: false,
                        success: function (data1) {
                            for (var x = 0; x < data1.length; x++) {
                                for (var i = 0; i < array.length; i++) {
                                    if (array[x] == data1[i].id + " ") {
                                        var pos = data1[x].bbox;
                                        var posplit = pos.split(",");
                                        posicion = { lat: parseFloat(posplit[1]), lng: parseFloat(posplit[0]) };
                                        /*document.getElementById("onclick" + cont).setAttribute("onclick", "mapa(" + posicion + ");");
                                        console.log(posicion);
                                        cont++;*/
                                    }
                                }
                            }
                        }
                    });
                    /*tr.append("<td>" + "<a id='onclick" + i + "' class='ui-btn ui-shadow ui-corner-all' href='localizar.html'>Localizar</a>" + "</td>");
                    $('table').append(tr);*/
                    initMap();
                }
            }
        });

    });

    var lat = posicion.lat;
    var lng = posicion.lng;

    function initMap() {
        var uluru = { lat,lng };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }

}
lacosa();