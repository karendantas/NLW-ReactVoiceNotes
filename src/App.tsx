import Logo from "./assets/Logo.png"
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

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">

        <div className="rounded-md  bg-slate-700 p-5 space-y-3">
          <span className ="text-sm font-medium text-slate-200">
            Adicionar nota
          </span>
          <p className="text-sm leading-6 text-slate-400">
            Grave uma nota em áudio que será convertida para texto automaticamente.
          </p>
          
        </div>

        <div  className="rounded-md  bg-slate-800 p-5" >

        </div>

        <div  className="rounded-md  bg-slate-800 p-5" >

        </div>

        <div  className="rounded-md  bg-slate-800 p-5" >

        </div>

      </div>


      </div>
    </>
     
  )
}

export default App
