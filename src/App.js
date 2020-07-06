import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  // state de la app
  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes ] = useState([]);

  // paginador
  const [ paginaactual, guardarPaginaActual ] = useState(1);
  const [ totalpaginas, guardarTotalPaginas ] = useState(1);


  useEffect( () => {
    const consultarAPI = async () => {
      // Para evitar la ejecucion en el arranque de la app
      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = "17352982-2435cd712e17cc97afc8aa972";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      // Calcular el total de paginas que se pueden mostrar
      const calcularTotalPaginas = Math.ceil( resultado.totalHits / imagenesPorPagina );

      guardarTotalPaginas(calcularTotalPaginas);
      
    }
    consultarAPI();
  }, [busqueda])
    

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />
      </div>
    </div>
  );
}

export default App;
