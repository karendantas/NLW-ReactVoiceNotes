import Logo from "./assets/Logo.png"
import { NewCard } from "./components/new-card"
import { NoteCards } from "./components/note-card"


function App() {

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
          <NewCard/>
          {/* dentro da props, já esta inserido diretamente o objeto ao obrir o segundo par de chaves*/}
          <NoteCards note = {{ 
            date: new Date(),
            content: 'Hello Moto'
            }}  />
    
        </div>

        

      </div>
    </>
     
  )
}

export default App
