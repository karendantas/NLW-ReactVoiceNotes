import Logo from "./assets/Logo.png"
import { NewCard } from "./components/new-card"
import { NoteCards } from "./components/note-card"
import { ChangeEvent, useState } from "react"


interface Note {
  id: string,
  date: Date,
  content: string
}

function App() {



//--- criação, salvamento de notas e filtragem de notas


  //Criando uma lista com os objetos de uma nota 
  const [notes, setNotes] =  useState<Note[]>( () => {
    const notesOnLocalStorage = localStorage.getItem('notes')

      if (notesOnLocalStorage){
        return JSON.parse('notes')
      }

      return []
  } )
  
  //essa função pega o conteudo de uma nova nota do componente 'NewCard' e cria um novo objeto na lista 
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

  function onDeletedNote(id: string){

    const notesArray = notes.filter((note) => {
      return note.id != id
    })
    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))


  }

  const [search, setSearch] = useState('')

  function handleSearch(event: ChangeEvent<HTMLInputElement>){
      const query = event.target.value
      setSearch(query)

     
  }

  //Criando um novo array de notas que retorna as notas procuradas ou nao
  const filteredNotes = search != '' 
      ?
      notes.filter( note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      :
      notes

  //--- criação, salvamento e filtragem de notas 





  
  return (
    <>
      <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
          <img src={Logo} alt="NLW logo" />

          <form className="w-full">
            <input 
              type="text" 
              placeholder="Procure em suas notas..." 
              className= "w-full bg-transparent text-3xl font-semibold tracking-tighter outline-none placeholder:text-slate-500"
              onChange = {handleSearch}
            />
          </form>

        <div className="h-px bg-slate-700"/>


        {/* Note Cards */}
        <div className="grid grid-cols-1 gap-6 auto-rows-[250px] md:grid-cols-2 lg:grid-cols-3">
          <NewCard onCreatedNote = {onCreatedNote}/>


        {/*lendo o array das notas filtradas(podem estar filtradas ou nao) dentro do useState e retornando o objeto dentro de cada posicao na prop */}
        {filteredNotes.map( note => {
          return<NoteCards key = {note.id} note = {note} onDeletedNotes={onDeletedNote}/>
        
        }) }
        
    
        </div>

        

      </div>
    </>
     
  )
}

export default App
