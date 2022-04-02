var UrlMateriales =     'http://52.152.236.67:90/G7_19/controller/materiales.php?op=GetMateriales';
var UrlPostMaterial =   'http://52.152.236.67:90/G7_19/controller/materiales.php?op=InsertMaterial';
var UrlGetMaterial =    'http://52.152.236.67:90/G7_19/controller/materiales.php?op=GetMaterial';
var UrlPutMaterial =    'http://52.152.236.67:90/G7_19/controller/materiales.php?op=UpdateMaterial'; 
var UrlDeleteMaterial = 'http://52.152.236.67:90/G7_19/controller/materiales.php?op=DeleteMaterial';

$(document).ready(function(){   //Cuando el formulario este listo carga la funcion
CargarMateriales();
});

function CargarMateriales(){                //Funcion para cargar los materiales
    $.ajax({
        url: UrlMateriales,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores='';

            for(i=0; i < MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].DESCRIPCION +'</td>'+
                '<td>'+ MiItems[i].UNIDAD +'</td>'+
                '<td>'+ MiItems[i].COSTO +'</td>'+
                '<td>'+ MiItems[i].PRECIO +'</td>'+
                '<td>'+ MiItems[i].APLICA_ISV +'</td>'+
                '<td>'+ MiItems[i].PORCENTAJE_ISV +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                '<td>'+
                '<button class="btn btn-outline-info" onclick="CargarMaterial('+ MiItems[i].ID +')">Editar</button>'+
                '<button class="btn btn-outline-danger" onclick="EliminarMaterial('+ MiItems[i].ID +')">Eliminar</button>'+
                '</td>'+
                '</tr>';
            $('.Materiales').html(Valores);
            }
        }
    });
}

function AgregarMaterial(){                 //Funcion para agregar un material
    var datosmaterial = {
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val()
    };
    var datosmaterialjson = JSON.stringify(datosmaterial);
    $.ajax({
        url: UrlPostMaterial,
        type: 'POST',
        data: datosmaterialjson,    //en este caso si mandamos datos
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al crear material');
        }
    });
    alert('Material Agregado');
}

function CargarMaterial(idmaterial){        //Funcion para cargar un material
    var datosmaterial = {
        ID : idmaterial
    };
    var datosmaterialjson = JSON.stringify(datosmaterial);

    $.ajax({
        url: UrlGetMaterial,
        type: 'POST',
        data: datosmaterialjson,
        datatype: 'JSON',
        contenttype : 'application/json',
        success: function(response) {
            var MiItems = response;
            $('#DESCRIPCION').val(MiItems[0].DESCRIPCION);
            $('#UNIDAD').val(MiItems[0].UNIDAD);
            $('#COSTO').val(MiItems[0].COSTO);
            $('#PRECIO').val(MiItems[0].PRECIO);
            $('#APLICA_ISV').val(MiItems[0].APLICA_ISV);
            $('#PORCENTAJE_ISV').val(MiItems[0].PORCENTAJE_ISV);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            var btnactualizar = ' <input type="submit" id="btn_actualizar" onclick="ActualizarMaterial('+ MiItems[0].ID +')"'+ 'value="Actualizar Material" class="btn btn-outline-primary"></input>';
            $('#btnmaterial').html(btnactualizar);
        }
    });
}

function ActualizarMaterial(idmaterial){    //Funcion para actualizar un material
    var datosmaterial = {
        ID : idmaterial,
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val()
    };
    var datosmaterialjson = JSON.stringify(datosmaterial);

    $.ajax({
        url: UrlPutMaterial,
        type: 'PUT',
        data: datosmaterialjson,    //en este caso si mandamos datos
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        }
    });
    alert('Material Actualizado');
}

function EliminarMaterial(idmaterial){      //Funcion para eliminar un material
    var datosmaterial = {
        ID : idmaterial
    };
    var datosmaterialjson = JSON.stringify(datosmaterial);

    $.ajax({
        url: UrlDeleteMaterial,
        type: 'DELETE',
        data: datosmaterialjson,    //en este caso si mandamos datos
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
        }
    });
    alert('Material Eliminado');
    location.reload();
}