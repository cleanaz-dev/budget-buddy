import React from 'react'

import { Button } from './ui/button';
import {   
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, 
} from './ui/dialog';
import { archiveSingleAnalysis } from '../lib/actions';
import { Input } from './ui/input';
import { ArchiveAnalysisButton } from './SubmitButton';
  

export default function ArchiveAnalysis({analysisId}) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="submit"
            className="bg-green-100 text-muted-foreground hover:bg-transparent hover:text-green-500"
          >
            Archive
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[425px] md:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Archive Report</DialogTitle>
            <DialogDescription>
              <div className="space-y-2">
                <h1>Archive the following report?</h1>
                <p className="font-semibold">{analysisId}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <form action={archiveSingleAnalysis}>
            <Input
              name="analysisId"
              value={analysisId}
              className="col-span-3 border-none"
              type="hidden"
            />

            <DialogFooter>
              <DialogClose>
                <ArchiveAnalysisButton />
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>

  )
}
