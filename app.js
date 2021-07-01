// const btnObtenerClima= document.querySelector("#btnObtener");
// const lista= document.querySelector("#lista")
// const ciudad= document.querySelector("#ciudad");
const container= document.querySelector(".container");
const resultado= document.querySelector("#resultado");
const formulario= document.querySelector("#formulario");

window.addEventListener("load", ()=> {
    formulario.addEventListener("submit", buscarCLima);
})

function buscarCLima(e){
    e.preventDefault();

    const ciudad= document.querySelector("#ciudad").value;
    const pais= document.querySelector("#pais").value;

    if(ciudad==="" || pais===""){
        mostrarError("Ambos campos son obligatorios");
        return;
    }

    consultarAPI(ciudad, pais);
    document.querySelector("#ciudad").value="";
}

function mostrarError(mensaje){
    const alerta=document.querySelector(".error");

    if(!alerta){
        const div= document.createElement("div");
        div.textContent=mensaje;
        div.classList.add("error", "mt-5");

        formulario.appendChild(div)

        setTimeout(() => {
            div.remove();
        }, 3000);
    } 
}

function consultarAPI(ciudad, pais){
    const idApi= "e1f2d178a1c744f8cdf473b3a3299d71";
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${idApi}`;

    limpiarHTML();
    
    fetch(url)
        .then(respuesta=> respuesta.json())
        .then( resultado => {
            if(resultado.cod==="404"){
                mostrarError("ciudad no encontrada")
                return;
            }
               
            imprimirClima(resultado);
        })
}       

function imprimirClima(datos){
    let {name, main:{temp, temp_max, temp_min} }= datos;

    temp= (temp- 273.15).toFixed(1); //toFixed deja la cantidad de decimales que pase por parametro
    temp_min= (temp_min-273.15).toFixed(1);
    temp_max= (temp_max-273.15).toFixed(1);

    const ciudad= document.createElement("p");
    ciudad.textContent= `Ciudad: ${name}`;
    ciudad.classList.add("text-center", "clima-actual")

    const tempActual= document.createElement("p");
    tempActual.innerHTML=`${temp} &#8451`;
    tempActual.classList.add("text-center", "clima-actual")

    const conetenedorMaxMin= document.createElement("div");
    conetenedorMaxMin.style.display="flex";
    conetenedorMaxMin.style.justifyContent="center"

    const tempMaxima= document.createElement("p");
    tempMaxima.innerHTML=`Máx-${temp_max} &#8451`;
    tempMaxima.classList.add("text-center", "clima")

    const tempMinima= document.createElement("p");
    tempMinima.innerHTML=`Mín- ${temp_min} &#8451`;
    tempMinima.classList.add("text-center", "clima")

    resultado.appendChild(ciudad)
    resultado.appendChild(tempActual)
    conetenedorMaxMin.appendChild(tempMaxima)
    conetenedorMaxMin.appendChild(tempMinima)
    resultado.appendChild(conetenedorMaxMin)
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}