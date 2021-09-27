/*
	Objeto con el cual hacemos la conexion a la api de Pixabay
*/
const Modelo =  async(busqueda,pagina) => {
	try {
		// Aqui nos comectamos a la api
		const web = await fetch(`https://pixabay.com/api/?key=23516401-22926f8a5fd65c152e5795fc9&q=${busqueda}&image_type=photo&page=${pagina}`)
		// Convertimos json
		const r = await web.json()
		//retornamos el resultado
		return r
		
	} catch (error) {
		return error
		
	}
}
// Linea de ejemplo del Modelo 
//Modelo('house',3).then( r=>console.log(r)).catch(e=> console.log(e))
