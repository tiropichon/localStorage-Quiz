function crearDiv(){
	//Creo un nuevo div que contendrá los datos del fetch
	const newDiv = document.createElement('div');
	//Le asigno una clase css
	newDiv.classList.add('contenedor-preguntas');
	//Añado el elemento div al elemento con la clase ".contenedor"
	document.querySelector(".contenedor").appendChild(newDiv);
}

function crearPregunta(indice, pregunta){
	const newH3 = document.createElement("h3")
	newH3.textContent = `Pregunta ${indice+1}. ${pregunta}`;
	document.querySelector(".contenedor-preguntas").appendChild(newH3);
}

function crearRespuestaCorrecta(respuestaCorrecta){
	const newPCorrect = document.createElement("p");
	newPCorrect.classList.add('bold');
	newPCorrect.textContent = `${respuestaCorrecta}`;
	newPCorrect.addEventListener("click",function(){
		newPCorrect.style.background = "lightgreen";
		newPCorrect.style.color = "black";
	})

	document.querySelector(".contenedor-preguntas").appendChild(newPCorrect);
}

function crearRespuestasIncorrectas(respuestasIncorrectas){
	respuestasIncorrectas.forEach(incorrect_answer=>{
		const newP = document.createElement("p");
		newP.textContent = incorrect_answer;
		newP.addEventListener("click",function(){
			newP.style.background="red";
			newP.style.color="black";
		})
		document.querySelector(".contenedor-preguntas").appendChild(newP);
	})
}

async function obtenerDatos(url){
 	await fetch(url)
  		.then(res => res.json())
  		/*.then(json => console.log(json.results))*/
  		.then(json=>{
  			for(let i=0; i<json.results.length; i++){
  				crearPregunta(i, json.results[i].question);
  				crearRespuestaCorrecta(json.results[i].correct_answer);
  				crearRespuestasIncorrectas(json.results[i].incorrect_answers);
  			}
  		})
  		.catch(error => console.error(error))
}

//Función que se llama cuando hago click al botón del formulario.
function generarFormulario(){
	const url="https://opentdb.com/api.php?amount=10";
	crearDiv();
	obtenerDatos(url);
}