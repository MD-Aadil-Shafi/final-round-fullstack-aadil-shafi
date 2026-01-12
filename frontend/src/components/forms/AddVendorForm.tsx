import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppDispatch, useAppSelector } from "@/redux/useTypedSelectors"
import type { VendorFormValues } from "@/utils/vendorFormSchema"
import { departmentTypes, vendorSchema } from "@/utils/vendorFormSchema"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { createVendor } from "@/redux/thunk/vendorThunk"

type AddVendorFormType = {
    formOpen: boolean,
    setFormOpen: Dispatch<SetStateAction<boolean>>
}


export function AddVendorForm({formOpen, setFormOpen}:AddVendorFormType) {
  const dispatch = useAppDispatch()
  const {loading, error} = useAppSelector(state  => state.vendors)

    const form = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      name: "",
      about: "",
      logo: "",
      owner_first_name: "",
      owner_last_name: "",
      description: "",
      department: undefined,
      location: "",
      payment_type: undefined,
      contact: "",
    },
  })

  const onClose = () =>{
    form.reset()
    setFormOpen(false)
  }
  async function onSubmit(values: VendorFormValues) {
    await dispatch(createVendor(values))
    onClose()
  }

  return (
    <Sheet open={formOpen} onOpenChange={onClose}>
      <SheetContent className="w-[320px] md:w-120 p-5 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-3xl">New Vendor</SheetTitle>
          <hr></hr>
        </SheetHeader>
         <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} maxLength={20} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Input {...field} maxLength={20} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="owner_first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner First Name</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={10} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="owner_last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Last Name</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={10} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          {/* <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={20} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
<FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {departmentTypes?.map((item)=>(
                    <SelectItem value={item} key={item}>{item}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={20} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="payment_type"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Payment Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit_card">
                    Credit Card
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center">
            <Button variant="outline" 
            className="rounded-none border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={()=>form.reset()}
            disabled={loading}
            >
          Discard changes
        </Button>
        <Button type="submit" className="rounded-none bg-[#e4f222] text-neutral-900 hover:bg-[#e4f222] hover:underline cursor-pointer"
        disabled={loading}>
          Submit
        </Button>
        </div>
      </form>
    </Form>
      </SheetContent>
    </Sheet>
  )
}
