import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {createClient} from 'pexels'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Jumbotron from 'react-bootstrap/Jumbotron'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
 
import{FaSearch} from 'react-icons/fa'
function App(){

  
  const[foto, setFoto] = useState([])


  function listaFotos(){
      const listagemFotos = foto.map((imagem)=>{
      <img key={imagem.id} src={imagem.src.original}></img>
      })
      
  return (
    <> {listagemFotos} </>
  )
  }


    async function obterFoto(){
      const apiFoto = process.env.REACT_APP_APIFOTO
      let urlFoto= `https://api.pexels.com/v1/search?query=${foto}`
      
      await fetch(urlFoto, {
        headers: {
          Authorization: apiFoto
        }
      })

      .then(response => response.json())
      .then(data => 
        { 
          console.log(data)
        })
        .catch(function(error){
            console.error(`ops, algo deu errado: ${error.message}`)

        })
    }
    



  return(
    <>
 
  

<div class="pagina">

  
    <div class="cabecalho">
      <br></br>
      <h1>Banco de imagens</h1>
      <p>Busque por imagens de forma gratuita!</p> <br>
      </br>

<div class="container h-100">
  <div class="row h-100 justify-content-center align-items-center"></div>
      <div class = "barra">
      <Form >
      <FormControl type="text" value={foto} size="lg" onChange={event=> setFoto(event.target.value)}
      placeholder="Qual imagem você procura?..."></FormControl>
      </Form>
      <br></br>
      <div class="botao">
      <button onClick={()=> obterFoto(foto)}>PESQUISAR <FaSearch/></button>
      <br></br> <br></br>
     

              </div>
</div>
</div>
</div>
</div>
      <br></br> <br></br>
        <listaFotos></listaFotos>
      
    </>
  )
}

export default App