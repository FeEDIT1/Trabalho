import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'

import { FaSearch } from 'react-icons/fa'
function App() {

  const [filtro, setFiltro] = useState('')
  const [foto, setFoto] = useState('')

  async function obterFoto() {

    const apiFoto = process.env.REACT_APP_APIFOTO // Utilizar a API no .env
    let urlFoto = `https://api.pexels.com/v1/search?query=${filtro}&per_page=100` // url base da API

    await fetch(urlFoto, {    
      headers: {
        Authorization: apiFoto
      }
    })  // receber a autorização na API

      .then(response => response.json())    // garantir que a resposta da API virá em json
      .then(data => {
        console.log(data)
        setFoto(data.photos[Math.floor(Math.random() * (data.photos.length + 1))].src.original) // pegar dados da foto 
      })
      .catch(function (error) {
        console.error(`ops, algo deu errado: ${error.message}`)

      })
  }

  return (
    <>
      <div class="pagina">


        <div class="cabecalho">
          <br></br>
          <h1>Banco de imagens</h1>
          <p>Busque por imagens de forma gratuita!</p> <br>
          </br>

          <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center"></div>   
            <div class="barra">
              <Form >
                <FormControl type="text" value={filtro} size="lg" onChange={event => setFiltro(event.target.value)}
                  placeholder="Qual imagem você procura?..."></FormControl>
              </Form>
              <br></br> 
              <div class="botao">  {/*Botao responsável pela procura da imagem */}
                <button onClick={() => obterFoto(filtro)}>PESQUISAR <FaSearch /></button>  
                <br></br> <br></br>
                <Jumbotron> 
                  <img src={foto} width="1000px"></img> {/* Objeto imagem com a definição da fonte e o tamanho */}
                  
                  </Jumbotron>

              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br> <br></br>
    </>
  )
}

export default App