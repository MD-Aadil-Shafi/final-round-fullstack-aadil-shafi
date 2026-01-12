import React from 'react'
import { ButtonGroup } from '../ui/button-group'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {BetweenHorizontalEnd, Sheet, Download  } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { useAppDispatch } from '@/redux/useTypedSelectors'
import { fetchVendors } from '@/redux/thunk/vendorThunk'

const TableFilter = () => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = React.useState("");
  
    const debouncedSearch = useDebounce(search, 500);
  
    React.useEffect(() => {
      dispatch(
        fetchVendors({
          page: 1,
          limit: 30,
          search: debouncedSearch || undefined,
          sort_by: "created_at",
          order: "desc",
        })
      );
    }, [debouncedSearch, dispatch]);

  return (
        <div className="flex justify-between items-center py-4 bg-[#fcfbfa]">
        <Input
          placeholder="Search or filter..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="w-50 rounded-full"
        />
        <div className='flex items-center gap-2'>
        <Button variant="outline" size="icon-sm" className='rounded-full'>
          <BetweenHorizontalEnd />
        </Button>
        <Button variant="outline" size="icon-sm" className='rounded-full'>
          <Sheet />
        </Button>
        <Button variant="outline" size="icon-sm" className='rounded-full'>
          <Download />
        </Button>
        </div>

      </div>
  )
}

export default TableFilter