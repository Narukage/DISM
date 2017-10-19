function precios() {
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            url: 'https://dev.datos.ua.es/uapi/U8xwQtxtdkyr9ZpFYy5v/datasets/39/data',
            dataType: 'jsonp',
            async: false,
            cache: false,
            success: function (data) {
                var tr;
                var contentString = '<div data-role="header"><h1>Localización</h1></div>';

                console.log(data);
                tr = $('<th>EDIFICIO</th><th>AGUA 1,5L</th><th>BEBIDAS FRÍAS</th><th>SÓLIDOS</th><th>COMIDA SALUDABLE</th><th>CAFETERA</th><th> </th>');
                $('table').append(tr);
                var array = new Array(30);
                for (var i = 0; i < data.length; i++) {
                    var ided = data[i]["ID_EDIFICIO COD. SIGUA"]; //0702
                    array[i] = ided;
                    tr = $('<tr/>');
                    tr.append("<td>" + data[i].EDIFICIO + "</td>");
                    tr.append("<td>" + data[i]["AGUA 1,5L"] + "</td>");
                    tr.append("<td>" + data[i]["BEBIDAS FRÍAS"] + "</td>");
                    tr.append("<td>" + data[i]["SÓLIDOS"] + "</td>");
                    tr.append("<td>" + data[i]["COMIDA SALUDABLE"] + "</td>");
                    tr.append("<td>" + data[i].CAFETERA + "</td>");

                    $.ajax({
                        type: 'GET',
                        url: 'https://dev.datos.ua.es/uapi/U8xwQtxtdkyr9ZpFYy5v/datasets/11/data',
                        dataType: 'jsonp',
                        async: false,
                        cache: false,
                        success: function (data1) {
                            var cont = 0;
                            for (var x = 0; x < data1.length; x++) {
                                for (var i = 0; i < array.length; i++){
                                    if (array[x] == data1[i].id + " ") {
                                        var pos = data1[x].bbox;
                                        var posplit = pos.split(",");
                                        document.getElementById("onclick" + cont).setAttribute("onclick", "mapa(" + parseFloat(posplit[3]) + "," + parseFloat(posplit[2]) + ");");
                                        cont++;
                                    }
                                }
                            }
                        }
                    });
                    tr.append("<td>" + "<a id='onclick" + i + "' class='ui-btn ui-shadow ui-corner-all'>Localizar</a>" + "</td>");
                    $('table').append(tr);
                }
            }
        });

    });

}
precios();
var marker;
var map;

function mapa(obj, obj1) {
    
    var lat = obj;
    var lng = obj1;

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 15
    });
    var infoWindow = new google.maps.InfoWindow({ map: map });

    document.getElementById('tablaPrecio').style.display = "none";
    document.getElementById('map').style.display = "inherit";
    document.getElementById('volver').style.display = "none";
    document.getElementById('atras').style.display = "inherit";

   marker = new google.maps.Marker({
        position: { lat: parseFloat(lat), lng: parseFloat(lng) },
        map: map,
        animation: google.maps.Animation.DROP,
        title: "Aqui"
    });
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
    marker.addListener('click', toggleBounce);
}

function restaurar() {
    document.getElementById('tablaPrecio').style.display = "inherit";
    document.getElementById('map').style.display = "none";
    document.getElementById('volver').style.display = "inherit";
    document.getElementById('atras').style.display = "none";
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}