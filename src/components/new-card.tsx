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
    
    
    let SpeechRecognition: SpeechRecognition | null =  null

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
        //funcao faz com que o forms não aja da sua forma padrao, e nao tenta redirecionar o usuario para outra tela ao der submit
        event.preventDefault()


        //funcao impede que a nota seja salva sem conteúdo
        if (content === ''){
            return
        }

        //Dá função recebida na props, enviamos o conteudo do novo card para ser salvo no array de notas no app
        onCreatedNote(content)

        //após a nota ser enviada, o conteudo da textarea é apagado, a mesangem de onboarding aparece novamente 
        setContent('')
        setshouldShownOnBoarding(true)

        toast.success('Nota salva com sucesso')
    }


// --- Conteudo gravado 

    const [isRecording, setIsRecording] = useState(false)

    function  handleStartRecording(){
        setIsRecording(true)
        setshouldShownOnBoarding(false)

        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window 
        || 'webkitSpeechRecognition' in window

        if (!isSpeechRecognitionAPIAvailable){
            alert('Infelizmente o seu navegador não suporta a API de gravação.')
            return
        }

        //configurando API
       
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

        SpeechRecognition = new SpeechRecognitionAPI()
        SpeechRecognition.lang = 'pt-BR'
        SpeechRecognition.continuous = true
        SpeechRecognition.maxAlternatives = 1
        SpeechRecognition.interimResults = true

        SpeechRecognition.onresult = (event) => {
            const transcription = Array.from(event.results).reduce( (text, result) => {
                return text.concat(result[0].transcript)
        } , '')

        setContent(transcription)
       }

       SpeechRecognition.onerror = (event) =>{
        console.log(event.error)
       }

        SpeechRecognition.start()

    }

    function handleStopRecording(){
        setIsRecording(false)

       if (SpeechRecognition != null){ 
        SpeechRecognition.stop
       }
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
            <Dialog.Content className="flex flex-col inset-0 md:max-w-[640px] w-full  md:h-[70vh] fixed md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-slate-700 md:rounded-md outline-none">
                
                <Dialog.Close className="absolute right-0 top-0 text-slate-400 p-1.5 hover:text-slate-100">
                    <X className="size-5 "/>
                </Dialog.Close>

            <form  className="flex flex-1 flex-col">
                <div className = "flex flex-1 flex-col gap-3 p-5">
                    <span className ="text-sm font-medium text-slate-300">
                        Adicionar Nota
                    </span>
                
                {shouldShownOnBoarding ?
                    (<p className="text-sm leading-6 text-slate-400">
                        Começar <button type="button" onClick={handleStartRecording} className = "font-medium text-lime-400 hover:underline">gravando uma nota </button> em audio ou se preferir <button type="button"  className = "font-medium text-lime-400 hover:underline" onClick = {handleStartEditor} >utilize apenas texto </button>.
                    </p>
                ):(
                    <textarea
                     className = "text-sm leading-6 text-slate-400 outline-none bg-transparent resize-none flex-1 "
                     onChange = {handleChangeText}
                     value={content}
                     ></textarea>
                )}
                </div>

                { isRecording ? ( 
                    <button 
                        type = "button"
                        className=" w-full text-sm text-center py-3 bg-lime-400 text-lime-950 font-medium outline-none hover:bg-lime-500"
                    >  
                        Gravando! <button type="button" onClick={handleStopRecording}> (Clique para parar) </button>
                  </button>

                ) : (
                <button 
                    type= "button"
                    onClick={handleSaveNote}
                    className=" w-full text-sm text-center py-3 bg-lime-400 text-lime-950 font-medium outline-none hover:bg-lime-500"
                >  
                    Salvar nota
                </button>
                )}
                
            </form> 
            </Dialog.Content>
        </Dialog.Portal>


        </Dialog.Root>
    )
}