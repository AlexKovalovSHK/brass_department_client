import { useAppSelector } from "../app/hooks"
import { selectUser } from "../features/user/userSlice"


const AdminProfilCabinet = () => {
    const user = useAppSelector(selectUser)
  return (
    <div>
        <h3>AdminProfilCabinet</h3>
        <p>{user?.id}</p>
        <p>{user?.role}</p>
        <p>{user?.email}</p>
    </div>
  )
}

export default AdminProfilCabinet