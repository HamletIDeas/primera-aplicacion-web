const Vista = () =>{
	//Metodos y propiedades publico
	const publico = {}
	// Seleccionamos la etiqueta body
	const body = document.querySelector('body')
	// seleccionamos la etiqueta section
	const section = document.querySelector('section')

	//Crea <img>
	crearIMG = (hit)=>{
		let img = new Image() // <img>
		img.src  = hit.largeImageURL
		return img
	}

	//Crea <a>
	crearA = (enlace) => {
		let a = document.createElement('a')
		a.setAttribute('href',enlace)
		a.setAttribute('target','_blank')
		return a
	}

	// crea <div>
	creardiv = (clase) =>{
		let div = document.createElement('div')
		div.setAttribute('class',clase)
		return div
	}

	// Crear la vista
	crearVista = (hits)=> {
		let cont = creardiv('contenedor')
		hits.map(objImg => {
			console.log(objImg)
			// Crear la etiqueta img
			let img = crearIMG(objImg)
			// crear el cont <a>
			let a = crearA(objImg.largeImageURL)
			// agregamos el cont a la imagen
			a.appendChild(img)
			// Agragamos la etiqueta al body
			cont.appendChild(a)
		}
		)
		section.appendChild(cont)

	}
	_eScroll = (eventos)=>{
		eventos.map(evento =>{
			if(evento.isIntersecting){
				publico.next()
			}
		})


	}
	// Metodo para crear el scroll infinito
	scrollInfinito = ()=>{
		// Opciones de la API
		let opt = {
			root: null,
			rootMargin:'30px',
			threshold: 1
		}
		// Api para observa
		let obs = new IntersectionObserver(_eScroll,opt)
		// Creamos el div scroll
		let div = creardiv('scroll')
		// Selecionmos al elemento que queremos ver
		obs.observe(div)
		// Agregamos el scroll body
		body.appendChild(div)
	}



	// Nuestra funcion inicial
	publico.start = (palabra)=> {
		// Selecionmos todos los contenedores
		let divs = document.querySelectorAll('.contenedor')
		// Y si existe uno o mas
		if(divs.length > 0){
			// Borralos
			for(let i = 0; i < divs.length; i++ )
				section.removeChild(divs[i])
		}
		publico.busqueda = palabra
		publico.pagina = 1
		Modelo(palabra,publico.pagina)
			.then( r=>crearVista(r.hits))
			.catch(e=> console.log(e))
		scrollInfinito()

	}

	// Metodo va avanzar la paginacion
	publico.next = ()=>{
		// Sumamos uno a pagina pagina = pagina + 1
		publico.pagina++
		// Mandamos la peticion
		Modelo(publico.busqueda ,publico.pagina)
			.then( r=>crearVista(r.hits))
			.catch(e=> console.log(e))

	}

	//retonamos metodos publicos
	return publico
}