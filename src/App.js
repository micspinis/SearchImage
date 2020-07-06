import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';

function App() {

  // state de la app
  const [ busqueda, guardarBusqueda ] = useState('');


  useEffect( () => {
    const consultarAPI = async () => {
      // Para evitar la ejecucion en el arranque de la app
      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = "17352982-2435cd712e17cc97afc8aa972";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarBusqueda(resultado.hits);
      
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
    </div>
  );
}

export default App;
