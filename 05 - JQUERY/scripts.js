$(document).ready(function(){
    console.log("Bienvenido");
    $("#formularioInicio").hide();

    $("#registro").click(function(){
        $("#p1").hide();
        $("#formularioInicio").show();
    });

    $("#cancelar").click(function(){
        $("#p1").show();
        $("#formularioInicio").hide();
    });


    $("#idFormulario").submit(function(event){
        let nombre = $("#nombre").val();
        let email = $("#email").val();
        let password = $("#password").val();
        let telefono = $("#telefono").val();

        let nombrePalabras = nombre.trim().split(/\s+/);
        if (nombrePalabras.length < 2) {
            alert("El campo 'Nombre y Apellidos' debe contener al menos dos palabras.");
            event.preventDefault(); // Evita que el formulario se envíe
            return;
        }

        if(email === "" || password === "" || telefono === ""){
            alert("Llene todos los campos");
            event.preventDefault(); // Evita que el formulario se envíe
        } else {
            alert("Registro exitoso");
        }
        
    });
});