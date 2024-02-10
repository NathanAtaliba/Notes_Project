import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast} from 'sonner'

interface newNoteCardProps{
  onNoteCreated: (content: string ) => void
}
export function NewNoteCard({onNoteCreated}: newNoteCardProps){
const [shouldShowOnboarding, setShouldShowOnBoarding] = useState(true)
const [content, setContent] = useState('')
const [isRecording, setIsRecording] = useState(false)
    function handleStartEditor(){
        setShouldShowOnBoarding(false)
    }

    function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>){
        setContent(event.target.value)

        if(event.target.value === ''){
            setShouldShowOnBoarding(true)
        }
    }

    function handleSaveNote(event: FormEvent){
        event.preventDefault()

        toast.success('Nota criada com sucesso!')

        setContent('')
        
        setShouldShowOnBoarding(true)

        onNoteCreated(content)
    }
    function handleStartRecording(){
      setIsRecording(true)
    }
    function handleStopRecording(){
      setIsRecording(false)
    }
    return (
    <Dialog.Root>
    <Dialog.Trigger className="rounded-md flex flex-col bg-slate-700 outline-none text-left p-5 gap-3 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
            Adicionar Nota
        </span>
        <p className="text-sm leading-6 text-slate-400 ">
            Grave uma nota em aúdio que sera convertida para texto automaticamente.
        </p>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className=" inset-0 fixed bg-black/60"/>
        <Dialog.Content className=" fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.DialogClose className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.DialogClose>
        <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
        <div className="flex flex-1 flex-col gap-3 p-5">
          <span className="text-sm font-medium text-slate-200">
            Adicionar nota
          </span>
        {shouldShowOnboarding ? (
              <p className="text-sm leading-6 text-slate-300 ">
              Comece <button type="button" onClick={handleStartRecording} className="font-medium text-lime-400 hover:underline">gravando uma nota </button> em aúdio ou se preferir <button type="button" onClick={handleStartEditor} className="font-medium text-lime-400 hover:underline"> utilize apenas texto </button>
             </p>
        ): (
            <textarea 
            autoFocus 
            className="text-sm leadin-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
            onChange={handleContentChanged}
            value={content}
            />
        )}
        </div>


        {isRecording ? (
          <button 
        type="button" 
        onClick={handleStopRecording}
        className="w-full bg-slate-900 flex items-center justify-center gap-2 font-medium py-4 text-slate-300 text-center text-sm outline-none hover:text-slate-100">
           <div className="size-3 rounded-full bg-red-500 animate-pulse"> 
            Gravando! (clique p/ interromper)
            </div>
        </button>
        ):(

          <button 
          type="button" 
          onClick={handleSaveNote}
          className="w-full bg-lime-400 font-medium py-4 text-lime-950 text-center text-sm outline-none hover:bg-lime-500">
              Salvar nota
          </button>  
        )}
        
        </form>
      </Dialog.Content>
    </Dialog.Portal>
    </Dialog.Root>
    )
}