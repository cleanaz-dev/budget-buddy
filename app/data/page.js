import React from 'react'
import RecieptSummary from '../../components/RecieptSummary'
import Image from 'next/image'
import logo from "../../public/logo1.png"
import { Button } from '../../components/ui/button'
import { AtomIcon, Brain, BrainCircuit } from 'lucide-react'



export default function DataPage() {
  return (
    <>
    <div className="flex flex-col h-screen justify-center items-center bg-slate-200">
    
        <Image src={logo} width={100} height={100} />
     <p className='text-muted-foregroun' >coming. soon.</p>
      <RecieptSummary />
    </div>
    </>
  )
}
