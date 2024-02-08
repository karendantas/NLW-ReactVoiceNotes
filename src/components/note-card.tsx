import * as Dialog from "@radix-ui/react-dialog"
import { formatDistanceToNow } from "date-fns"
import { ptBR} from "date-fns/locale"
import {X} from "lucide-react"

interface NoteCardProps{

    /*Criando um objeto para note */
    note:{
        id: string,
        date:Date
        content: string
    },
    onDeletedNotes: (id:string) => void
}




export function NoteCards({note, onDeletedNotes}: NoteCardProps){

    return (

    <Dialog.Root>
        <Dialog.Trigger className="flex flex-col gap-3 rounded-md text-left bg-slate-800 p-5 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
                <span className ="text-sm font-medium text-slate-300">
                    {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})}
                </span>
                <p className="text-sm leading-6 text-slate-400">
                    {note.content}
                </p>

                {/* Sombreamento dos cards */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0">

                </div>

        </Dialog.Trigger>
        
        {/* O portal cria uma janela que cobre a tela inteira
            O overlay é uma div que podemos estilizar para dar os efeitos de modal
        */}
        <Dialog.Portal>

            <Dialog.Overlay  className = "inset-0 fixed bg-black/60" />
            <Dialog.Content className="flex flex-col max-w-[640px] w-full h-[70vh] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700 rounded-md outline-none" >
                
            <Dialog.Close className="absolute right-0 top-0 text-slate-400 p-1.5 hover:text-slate-100">
                <X className="size-5 "/>
            </Dialog.Close>
                
                <div className = "flex flex-1 flex-col gap-3 p-5">
                    <span className ="text-sm font-medium text-slate-300">
                        {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})}
                    </span>
                    <p className="text-sm leading-6 text-slate-400">
                        {note.content}
                    </p>
                </div>

                <button 
                    type= "button"
                    onClick = {() => onDeletedNotes(note.id)}
                    className=" w-full text-sm text-center py-3 bg-slate-800 text-slate-300 font-medium outline-none group"
                >  
                Deseja <span className="text-red-400 group-hover:underline">apagar essa nota?</span> 

                </button>
            </Dialog.Content>
        </Dialog.Portal>

    </Dialog.Root>
    )
}