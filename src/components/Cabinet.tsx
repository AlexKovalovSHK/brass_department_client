import  { useEffect } from 'react'
import MiniDrawer from './MiniDrawer'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectUser } from '../features/user/userSlice'
import { getDepartmentByCompany } from '../features/departmen/departmentState'

const Cabinet = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  useEffect(() => {
    if(user) {
      dispatch(getDepartmentByCompany(user?.id))
    }
    
  },[])
  return (
    <div>
        <MiniDrawer/>
    </div>
  )
}

export default Cabinet