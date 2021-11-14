const textoNuevaEntrada = document.getElementById("textoNuevaEntrada");
const formulario = document.getElementById("formulario");
const btnBuscar = document.getElementById("btnBuscar");
const contenedor = document.getElementById("contenedor");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    buscar();   
});

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};
  

const buscar = () => {
    contenedor.innerText = "";

    if(textoNuevaEntrada.value.trim() == ""){
        alert("No se pueda agregar campos vacíos o solo con espacios");

    } else{
        
        let pokemon = textoNuevaEntrada.value.trim();
        pokemon = pokemon.toLowerCase();

        const response = axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        response.then((response) => {

           let imagenPokemon = response.data.sprites.other["official-artwork"].front_default;
           const imagen = document.createElement("img");
           imagen.setAttribute("src", imagenPokemon);
           contenedor.appendChild(imagen);


           let nombrePokemon = response.data.name;
           let nombre = document.createElement("p");
           nombre.innerText = nombrePokemon;
           contenedor.appendChild(nombre);

           let tipoPokemon = response.data.types[0].type.name;
           let tipo = document.createElement("p");
           tipo.innerText = tipoPokemon;
           tipo.style.color = typeColors[tipoPokemon];
           contenedor.appendChild(tipo);

           textoNuevaEntrada.value = "";


        }).catch((error)  => {
            let imagenError = document.createElement("img");
            imagenError.setAttribute("src", 'img/poke-shadow.png');
            contenedor.appendChild(imagenError);

            let mensajeError = document.createElement("p");
            mensajeError.innerText = "Pokémon desconocido";
            contenedor.appendChild(mensajeError);
            
        }).then(()  => {
            console.log("Fin");
        });


    }
}
