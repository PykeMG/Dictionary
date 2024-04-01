import './App.css'
import { useState, useEffect } from 'react'
import Book from './icons/book-2.svg'
import Sound from './icons/volume.svg'

function App() {

  const [searchTerm, setSearchTerm] = useState('')
  const [definition, setDefinition] = useState([])
  const [isloading, setIsloading] = useState(true)

  const playAudio = (audioURL) => {
    const audio = new Audio(audioURL)
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    })
  }

  useEffect(() => {
    const fetchDefinition = async () => {
      if (!searchTerm) return
      setIsloading(true)
      try{
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
        if (!response.ok) {
          throw new Error('Word not found')
        }
        const data = await response.json()
        setDefinition(data)
      } catch (error) {
        console.error('Error fetching definitions', error)
      } finally {
        setIsloading(false)
      }
    }
    fetchDefinition()
  },[searchTerm])

  return (
    <>
      <div className='w-full bg-blue-100 py-4 px-6 flex items-center gap-2'>
        <img src={Book} alt="Book" className='size-8'/>
        <h2 className='font-bold'>Dictionary</h2>
      </div>
      <input 
      type="text" 
      placeholder='Enter a word to find the correct definition...' 
      onChange={(e) => setSearchTerm(e.target.value)} 
      value={searchTerm}
      className='w-full border-y py-4 px-6 outline-none'
      />
      <div className="container mx-auto py-8">
      {isloading && <div>Loading...</div>}
      {definition.length === 0 && !isloading && searchTerm && <div>Word not found...</div>}
      {definition.length > 0 && (
        <ul>
          {definition.map((entry, index) => (
            <li key={index}>
              <div className='flex items-center gap-5 my-4'>
                <h2 className='text-3xl font-bold'>{entry.word}</h2>
                <p className='font-light text-slate-500'>{entry.phonetic}</p>
                {entry.phonetics.map((phonetic, o) => (
                  <ul key={o} className='flex items-center'>
                    {phonetic.audio &&
                            <button onClick={() => playAudio(phonetic.audio)}>
                            <img src={Sound} alt="Sound" className='size-8'/>
                          </button>
                          }
                  </ul>
                ))}
              </div>
              <ul>
                {entry.meanings.map((meaning, idx) => (
                 <li key={idx}>
                  <h3 className='text-slate-500 font-light'>{meaning.partOfSpeech}</h3>
                  <ul>
                    {meaning.definitions.map((definition, i) => (
                      <li key={i} className='flex items-start gap-4 my-5'>
                        <p className='border rounded-full w-[40px] h-[40px] flex items-center justify-center'>{i + 1}</p>
                        <div className='flex flex-col gap-1'>
                          <p className='max-w-[1000px]'>{definition.definition}</p>
                          {definition.example && 
                          <div className='flex flex-col gap-1'>
                            <p className='text-slate-500'>Example</p>
                            <p>{definition.example}</p>
                          </div>}
                        </div>
                      </li>
                      
                    ))}
                  </ul>
                 </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      </div>
    </>
  )
}

export default App
