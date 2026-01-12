import { AddVendorForm } from '@/components/forms/AddVendorForm'
import TableHeading from '@/components/table/TableHeading'
import { VendorTable } from '@/components/table/VendorTable'
import { useState } from 'react'
import { Button } from '@/components/ui/button'


const Vendors = () => {
    const [formOpen, setFormOpen] = useState(false)

  return (
    <>
    <AddVendorForm formOpen={formOpen} setFormOpen={setFormOpen}/>
    <section className='p-4'>
        <div className='flex justify-between items-center'>
            <TableHeading title='Vendors'/>
            <Button className="rounded-none bg-[#e4f222] text-neutral-900 hover:bg-[#e4f222] hover:underline cursor-pointer"
            onClick={()=>setFormOpen(true)}
            >New Vendor</Button>
        </div>
        <VendorTable/>
    </section>
    </>
  )
}

export default Vendors