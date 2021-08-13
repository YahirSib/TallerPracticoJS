function iniciar(){
    var btnRegistrar = document.getElementById("btnRegistrar");
    var selectResidencia = document.getElementById("selectResidencia");
    if(btnRegistrar.addEventListener){
        btnRegistrar.addEventListener("click", proceso, false);
    }else if(btnRegistrar.attachEvent){
        btnRegistrar.attachEvent("onclick", proceso)
    }
    if(selectResidencia.addEventListener){
        selectResidencia.addEventListener("change", function(){
        agregarDeps(paises[this.options[this.selectedIndex].value],
        document.frmRegistro.selectDepartamento)
        }, false);
        }else if(selectResidencia.attachEvent) {
        selectResidencia.attachEvent("onchange", function(){
        agregarDeps(paises[this.options[this.selectedIndex].value],document.frmRegistro.selectDepartamento)
        });
    }
}
var paises = new Array(15);
    paises["El Salvador"] = ["Ahuachapán","Santa Ana","Sonsonate","Chalatenango", "La Libertad","San Salvador","Cuscatlán","La Paz","Cabañas",
        "San Vicente","Usulután","San Miguel","Morazán","La Unión"];
    paises["Honduras"] =  ["Comayagua", "Tegucigalpa", "Gracias", "Santa Bárbara", "Yoro", "Olancho", "Choluteca"];
    paises["Costa Rica"] =  ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"];
    paises["Nicaragua"] = ["Atlántico Norte", "Atlántico Sur", "Boaco", "Carazo", "Chinandega", "Chontales", "Esteli", 
        "Granada", "Jinotega", "León", "Madriz", "Managua", "Masaya", "Matagalpa", "Nueva Segovia", "Río San Juan", "Rivas"];
    paises["Guatemala"] = ["Alta Verapaz", "Baja Verapaz","Chimaltenago","Chiquimula","Guatemala","El Progreso","Escuintla",
        "Huehuetenango","Izabal","Jalapa","Jutiapa","Petén","Quetzaltenango", "Quiché", "Retalhuleu",
        "Sacatepequez","San Marcos","Santa Rosa","Sololá","Suchitepequez","Totonicapán","Zacapa"];
function proceso(){
    var error = document.getElementById("Error");
    var nombre = document.frmRegistro.txtNombre.value;
    var apellido = document.frmRegistro.txtApellido.value;
    var nacimientoPais = document.frmRegistro.selectPais.value;
    var correo = document.frmRegistro.txtEmail.value;
    var radiofield = document.frmRegistro.elements["chkgender"];
    var nacimientoFecha = document.frmRegistro.dateFecha.value;
    var residenciaPais = document.frmRegistro.selectResidencia.value;
    var depResidencia = document.frmRegistro.selectDepartamento.value;
    var telefonoCasa = document.frmRegistro.txtNumeroCasa.value;
    var telefonoCelu = document.frmRegistro.txtNumeroCelular.value;
    var domicilio = document.frmRegistro.txtDomicilio.value;
    for(var i=0; i<radiofield.length; i++){
        if(radiofield[i].checked){
            var genero = radiofield[i].value;
        }
    }
    if(nombre && isNaN(nombre)){
        if(apellido && isNaN(apellido)){
                if(correo && !(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)/.test(correo))){
                    if(nacimientoFecha){
                        if(telefonoCasa && !isNaN(telefonoCasa) && (/^\d{8}$/.test(telefonoCasa)) ){
                            if(telefonoCelu && !isNaN(telefonoCelu) && (/^\d{8}$/.test(telefonoCelu)) ){
                                if(domicilio && isNaN){
                                    const candidato = new Candidato(nombre, apellido, nacimientoPais, correo, genero,
                                        nacimientoFecha, residenciaPais, depResidencia, telefonoCasa, telefonoCelu, domicilio);
                                    candidato.Mostrar();
                                }else{
                                    error.innerHTML = "ERROR DOMICILIO VACIO";
                                }
                            }else{
                                error.innerHTML = "ERROR TELEFONO CELULAR VACIO O INCORRECTO";
                            }
                        }else{
                            error.innerHTML = "ERROR TELEFONO CASA VACIO O INCORRECTO";
                        }
                    }else{
                        error.innerHTML = "ERROR FECHA DE NACIMIENTO VACIA";
                    }
                }else{
                    error.innerHTML = "ERROR CORREO VACIO O INCORRECTO";
                }
        }else{
            error.innerHTML = "ERROR APELLIDO VACIO";
        }
    }else{
        error.innerHTML = "ERROR NOMBRE VACIO";
    }
    
}

class Candidato{
    constructor(nombre,apellido,nacimientoPais,correo,genero,nacimientoFecha, 
        residenciaPais, depResidencia, telefonoCasa, telefonoCelu, domicilio){
            this.nombre = nombre;
            this.apellido = apellido;
            this.nacimientoPais = nacimientoPais;
            this.correo = correo;
            this.genero = genero;
            this.nacimientoFecha = nacimientoFecha;
            this.residenciaPais = residenciaPais;
            this.depResidencia = depResidencia;
            this.telefonoCasa = telefonoCasa;
            this.telefonoCelu = telefonoCelu;
            this.domicilio = domicilio;
    }
    Mostrar(){
        var error = document.getElementById("Error");
        error.innerHTML = " ";
        var info = document.getElementById("Resultado");
        var result ="";
        result += "<div class='card'>";
        result += "<h1>Datos del alumno</h1>";
        result += "<p>Nombre: <span>"+this.nombre+" "+this.apellido+"</span></p>";
        result += "<p>Correo: <span>"+this.correo+"</span></p>";
        result += "<p>Genero: <span>"+this.genero+"</span></p>";
        result += "<p>Fecha de Nacimiento: <span>"+this.nacimientoFecha+"</span></p>";
        result += "<p>Pais de Nacimiento: <span>"+this.nacimientoPais+"</span></p>";
        result += "<p>Pais de Residencia: <span>"+this.residenciaPais+"</span></p>";
        result += "<p>Departamento de Residencai: <span>"+this.depResidencia+"</span></p>";
        result += "<p>Telefono Casa: <span>"+this.telefonoCasa+"</span></p>";
        result += "<p>Telefono Celular: <span>"+this.telefonoCelu+"</span></p>";
        result += "<p>Domicilio: <span>"+this.domicilio+"</span></p>";
        result += "</div>";
        info.innerHTML += result;
    }
}

function limpiar(deps){
    for(i=0; i<deps.options.length; i++){
    deps.options[i] = null;
    }
}

function agregarDeps(pais, deps){
    var i=0;
    limpiar(deps); //Limpia las opciones
    for(i=0; i<pais.length; i++){
    deps[i] = new Option(pais[i], pais[i]);
    }
}

if(window.addEventListener){
    window.addEventListener("load", iniciar, false);
    }
    else if(window.attachEvent){
    window.attachEvent("onload", iniciar);
    }