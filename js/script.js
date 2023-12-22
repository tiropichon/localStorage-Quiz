let numPreguntaActual = 0;
let puntos = 0;
const preguntas = JSON.parse(localStorage.getItem('quiz'));

function redireccionar(){
	console.log('redireccionar');
    location.href='./quiz.html';
}

function redireccionarIndex(){
	location.href='./index.html';
}

function crearDiv(){
	console.log("crearDiv");
	//Creo un nuevo div que contendrá los datos del fetch
	const newDiv = document.createElement('div');
	//Le asigno una clase css
	newDiv.classList.add('contenedor-preguntas');
	//Añado el elemento div al elemento con la clase ".contenedor"
	document.querySelector(".contenedor").appendChild(newDiv);

}

function crearPregunta(indice, pregunta){
	console.log("crearH3");
	const newH3 = document.createElement("h3")
	newH3.innerHTML = `Pregunta ${pregunta}`;
	document.querySelector(".contenedor-preguntas").appendChild(newH3);
}

function crearRespuestas(respuestas,respuestaCorrecta, preguntas){
	console.log("crearP");
	respuestas.forEach(respuesta=>{
		const newP = document.createElement("p");
		newP.innerHTML = respuesta;
		newP.addEventListener("click",function(){
			newP.style.background="red";
			newP.style.color="black";
			if(newP.textContent == respuestaCorrecta){
				newP.style.background="green";
				newP.style.color="white";
				puntos+=1;
				numPreguntaActual+=1;
				//alert(`¡Respuesta correcta! => ${respuestaCorrecta}\nPuntuación actual: ${puntos}`);
				document.querySelector(".puntuacion").innerHTML=`Puntos: ${puntos}`;
				mostrarNuevaPregunta();
			}
		})
		document.querySelector(".contenedor-preguntas").appendChild(newP);
	})
}

function recogerPreguntaslocalStorage(){
	console.log("recogerPreguntaslocalStorage");	
	displayQuestion(preguntas, numPreguntaActual);
}

function displayQuestion(preguntas, numPregunta){
	console.log("displayQuestion");
	console.log(preguntas);
	crearDiv();
	//pregunta.textContent = preguntas[numPregunta].question;
	crearPregunta(numPregunta, preguntas[numPregunta].question);
	crearRespuestas(preguntas[numPregunta].answers, preguntas[numPregunta].correctAnswer, preguntas);

}

function borrarForm(){
	console.log("borrarForm");
	let parent = document.querySelector('.contenedor');
	let child = document.querySelector('.contenedor-preguntas');
	parent.removeChild(child);
}

function mostrarNuevaPregunta(){
	console.log("mostrarNuevaPregunta");
	if( numPreguntaActual === preguntas.length){
		alert(`Puntos totales: ${puntos}`);
		setTimeout("redireccionarIndex()",3000);
	}else{
		borrarForm();
		displayQuestion(preguntas, numPreguntaActual);
	}
}


//Constructor de objeto
function crearElemento(pregunta, respuestas, respuestaCorrecta){
	this.question = pregunta;
	this.answers = respuestas;
	this.correctAnswer = respuestaCorrecta;
}

function crearArrayLocalStorage(datos){
	console.log(`datos: ${datos}`);
	let todasPreguntas = [];

	for(let i=0; i<datos.length; i++){
		let pregunta = `${i+1}. ${datos[i].question}`;
		let respuestaCorrecta = datos[i].correct_answer;
		let respuestas = [];
		respuestas.push(datos[i].correct_answer);
		datos[i].incorrect_answers.forEach(incorrect_answer=>{
			respuestas.push(incorrect_answer);
		});

		//Creo un objeto con la pregunta, las respuestas y la respuesta correcta
		let nuevoElemento = new crearElemento(pregunta, respuestas, respuestaCorrecta);
		todasPreguntas.push(nuevoElemento);
	}

	try{
		localStorage.setItem('quiz',JSON.stringify(todasPreguntas));
		console.log("localStorage creado");
	}catch (error){
		alert(`Se ha producido un error al crear localStorage: ${error}`);
	}
	
}

async function obtenerDatos(url){
	try{
		console.log('obtenerDatos');
		await fetch(url)
  			.then(res => {
  				if(res.ok){
  					console.log('res ok');
  					return res.json();
  				}

  				reject(
  					"No hemos podido recuperar ese json. El código de respuesta es: " + response.status
  				);
  			})
  			.then(json=>{
  				console.log(`El json de respuesta es: ${json}`);
  				crearArrayLocalStorage(json.results);
  			})
  			.catch(error => console.error(error))
	}catch (error){
		alert(`Ha habido un error: ${error}`);
	}

}

//Función que se llama cuando hago click al botón del formulario.
function recogerDatos(){
	const url="https://opentdb.com/api.php?amount=10";
	/*obtenerDatos(url);*/
	if (typeof(Storage) !== "undefined") {
    	obtenerDatos(url);
    	setTimeout("redireccionar()",3000);
    } else {
    	console.log("El navegador no es compatible con localStorage");
    }
}

function borrarLocalStorage(){
	try{
		localStorage.clear();
		console.log("localStorage borrado.");
	} catch (error) {
		console.log("Error: "+error);
	}
}