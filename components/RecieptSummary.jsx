import React from 'react'
console.log("hello")

import { getReceiptDataForWebhook } from '../lib/actions'
import { Button } from './ui/button'
import { AtomIcon } from 'lucide-react'
import { ReceiptDataButton } from './SubmitButton'

export default async function RecieptSummary() {
 
  return (
    <div>
         <form action={getReceiptDataForWebhook}>
            <div>
                <ReceiptDataButton />
            </div>
        </form>
    </div>
  )
}
