import Logo from "./assets/Logo.png"
import { NewCard } from "./components/new-card"
import { NoteCards } from "./components/note-card"
import { useState } from "react"


interface Note {
  id: string,
  date: Date,
  content: string
}

function App() {


  {/*Criando uma lista com os objetos de uma nota */}
  const [notes, setNotes] =  useState<Note[]>( () => {
    const notesOnLocalStorage = localStorage.getItem('notes')

      if (notesOnLocalStorage){
        return JSON.parse('notes')
      }

      return []
  } )
  
  {/*essa função pega o conteudo de uma nova nota do componente 'NewCard' e cria um novo objeto na lista */}
  function onCreatedNote(content: string){
      const newNote = { 
          id: crypto.randomUUID(), 
          date: new Date(), 
          content
        }

      const notesArray  = [newNote, ...notes]
      setNotes(notesArray)

      localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  return (
    <>
      <div className="mx-auto max-w-6xl my-12 space-y-6">
          <img src={Logo} alt="NLW logo" />

          <form className="w-full">
            <input 
              type="text" 
              placeholder="Procure em suas notas..." 
              className= "w-full bg-transparent text-3xl font-semibold tracking-tighter outline-none placeholder:text-slate-500"
            />
          </form>

        <div className="h-px bg-slate-700"/>


        {/* Note Cards */}
        <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
          <NewCard onCreatedNote = {onCreatedNote}/>


        {/*lendo o array dentro do useState e retornando o objeto dentro de cada posicao na prop */}
        {notes.map( note => {
          return<NoteCards key = {note.id} note = {note}/>
        
        }) }
        
    
        </div>

        

      </div>
    </>
     
  )
}

export default App
