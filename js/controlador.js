/*
	Capturar la busqueda del input[buscar]
*/
const b = document.querySelector('#buscar')
b.addEventListener('keypress',e=>{
	if(e.keyCode != 13) return false
	let valor = b.value.replace(' ','+')
	// aqui va la funcion encargada de crear la vista
	Vista().start(valor)
})