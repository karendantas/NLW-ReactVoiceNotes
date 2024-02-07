import * as Dialog from "@radix-ui/react-dialog"
import {X} from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner"



interface NewCardProps{
    onCreatedNote: (content:string) => void
}
export function NewCard({onCreatedNote}: NewCardProps){
    
    const [shouldShownOnBoarding, setshouldShownOnBoarding ] = useState(true)
    const [content, setContent] = useState('')
    
    function handleStartEditor(){
        setshouldShownOnBoarding(false)
    
    }


    {/* Essa função esta lendo o que o usuario esta digitando na textarea */}
    function handleChangeText(event: ChangeEvent<HTMLTextAreaElement>){

        setContent(event.target.value)

        if (event.target.value === ''){
            setshouldShownOnBoarding(true)
        }

    }

    function handleSaveNote(event: FormEvent){
        {/*essa funcao faz com que o forms não aja da sua forma padrao, e nao tenta redirecionar 
           o usuario para outra tela ao der submit
        */}
        event.preventDefault()

        {/*Dá função recebida na props, enviamos o conteudo do novo card para ser salvo no array de notas */}
        onCreatedNote(content)

        toast.success('Nota salva com sucesso')
    }

    return (

        <Dialog.Root>
            <Dialog.Trigger className="flex flex-col gap-3 rounded-md text-left bg-slate-700 p-5 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
                <span className ="text-sm font-medium text-slate-200">
                Adicionar nota
                </span>
                <p className="text-sm leading-6 text-slate-400">
                Grave uma nota em áudio que será convertida para texto automaticamente.
                </p>
            </Dialog.Trigger>

        <Dialog.Portal>

            <Dialog.Overlay className = "inset-0 fixed bg-black/60" />
            <Dialog.Content className="flex flex-col max-w-[640px] w-full  h-[70vh] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700 rounded-md outline-none">
                
                <Dialog.Close className="absolute right-0 top-0 text-slate-400 p-1.5 hover:text-slate-100">
                    <X className="size-5 "/>
                </Dialog.Close>

            <form onSubmit={handleSaveNote} className="flex flex-1 flex-col">
                <div className = "flex flex-1 flex-col gap-3 p-5">
                    <span className ="text-sm font-medium text-slate-300">
                        Adicionar Nota
                    </span>
                
                {shouldShownOnBoarding ?
                    (<p className="text-sm leading-6 text-slate-400">
                        Começar <button className = "font-medium text-lime-400 hover:underline">gravando uma nota </button> em audio ou se preferir <button  className = "font-medium text-lime-400 hover:underline" onClick = {handleStartEditor} >utilize apenas texto </button>.
                    </p>
                ):(
                    <textarea
                     placeholder="Digite aqui"
                     className = "text-sm leading-6 text-slate-400 outline-none bg-transparent resize-none flex-1 "
                     onChange = {handleChangeText}
                     ></textarea>
                )}
                </div>
                <button 
                    type= "submit"
                    className=" w-full text-sm text-center py-3 bg-lime-400 text-lime-950 font-medium outline-none hover:bg-lime-500"
                >  
                Salvar nota
                </button>
            </form> 
            </Dialog.Content>
        </Dialog.Portal>


        </Dialog.Root>
    )
}