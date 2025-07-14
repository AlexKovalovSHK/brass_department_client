import axios from "axios"
import { Department, NewDepartment } from "./type"
import { apiUrl } from "../../App"

export async function fetchNewDepartment(
  dto: NewDepartment,
): Promise<Department> {
  const res = await axios.post(
    `${apiUrl}/api/v1/departments`,
    {
        departName: dto.departName
    },
    { headers: { "Content-Type": "application/json" }, withCredentials: true },
  )
  return res.data
}

export async function fetchDepartmentId(id: number): Promise<Department> {
  const res = await axios.get(`${apiUrl}/api/v1/departments/${id}`, {
    withCredentials: true,
  })
  console.log(res.data)
  return res.data
}

export async function fechDepartmentsByCompanyId(
  id: number,
): Promise<Department[]> {
  const res = await axios.get(`${apiUrl}/api/v1/departments/company/${id}`, {
    withCredentials: true,
  })
  console.log(res.data)
  return res.data
}

export async function fechRemoveDepartmentId(id: number): Promise<Department> {
  const res = await axios.delete(`${apiUrl}/api/v1/departments/${id}/isDeleted/true`, {
    withCredentials: true,
  })
  console.log(res.data)
  return res.data
}

export const fetchAllDepartments = async (): Promise<Department[]> => {
  const res = await fetch(`${apiUrl}/api/v1/departments`)
  if (!res.ok) throw new Error("Ошибка загрузки")
  return res.json()
}
