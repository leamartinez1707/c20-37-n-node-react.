/* eslint-disable react/prop-types */
import { createContext, useEffect } from "react";
import { useGeneralContext } from "../hooks/useGeneralContext";
import { useAuth } from "../hooks/useAuthContext";
import { deleteUser, getAllUsers, updateUser, createPrescription, deletePrescription } from "../api/users"
import { getMedicalHistory, updateMedicalHistory } from "../api/medicalHistory"
import toast from "react-hot-toast";


export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const { loading, setLoading, users, setUsers, medicalHistory, setMedicalHistory } = useGeneralContext()
    const { logued } = useAuth()

    const getUsers = async () => {
        try {
            setLoading(true)
            const response = await getAllUsers()
            if (!response) {
                return toast.error('No se pudo obtener los usuarios')
            }
            setUsers(response.data.playload)
        } catch (error) {
            toast.error('No se pudo obtener los usuarios')
        }
        finally {
            setLoading(false)
        }
    }

    const updateUserById = async (id, user) => {
        setLoading(true)
        try {
            const update = await updateUser(id, user)
            if (update.status === 400 || update.status === 404) {
                return toast.error('No se pudo actualizar el usuario, verifique que los datos sean correctos')
            }
            toast.success('Usuario actualizado correctamente')
            setUsers(users.map(user => user._id === id ? update.data.playload : user))
        } catch (error) {
            toast.error('No se pudo actualizar el usuario')
            toast.error(error.response.data.msg)
        }
        finally {
            setLoading(false)
        }
    }

    const deleteUserByDni = async (dni) => {
        try {
            setLoading(true)
            const response = await deleteUser(dni)
            console.log(response)
            setUsers(users.filter(user => user.dni !== dni))
            toast.success('Usuario eliminado correctamente')
            return response.data.playload
        } catch (error) {
            toast.error(error.response.data.msg)
            toast.error('No se pudo eliminar el usuario')
        }
        finally {
            setLoading(false)
        }
    }

    const getMedicalHistoryById = async (id) => {
        try {
            setLoading(true)
            const response = await getMedicalHistory(id)
            if (!response) {
                setMedicalHistory([])
                return toast.error('No se pudo obtener la historia clínica')
            }
            setMedicalHistory(response.data.playload)
        } catch (error) {
            if (error.status === 404) {
                setMedicalHistory([])
                return toast.error('El usuario no existe o aun no posee historia clínica asociada')
            }
            toast.error('No se pudo obtener la historia clínica, pruebe refrescando la pagina, en caso de persisitir contactar al administrador')
            setMedicalHistory([])
        }
        finally {
            setLoading(false)
        }
    }
    const updateMedicalHistoryById = async (id, data) => {
        setLoading(true)
        try {
            const update = await updateMedicalHistory(id, data)
            if (update.status === 400 || update.status === 404) {
                return toast.error('No se pudo actualizar la historia clínica, verifique que los datos sean correctos')
            }
            toast.success('Historia clínica actualizada correctamente')
            setMedicalHistory(update.data.playload)
        } catch (error) {
            toast.error('No se pudo actualizar la historia clínica')
            setMedicalHistory([])
        }
        finally {
            setLoading(false)
        }
    }


    const addPrescription = async (dni, prescriptions) => {
        try {
            setLoading(true)
            const response = await createPrescription(dni, prescriptions)
            if (!response) {
                return toast.error('No se pudo crear la receta')
            }
            toast.success('Receta creada correctamente')
            console.log(response.data)
            return response.data.playload
        } catch (error) {
            toast.error('No se pudo crear la receta')
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (logued.role === 'admin' || logued.role === 'doctor' || logued.role === 'user') {
            getUsers()
        }
        if (logued.role === 'user') {
            getMedicalHistoryById(logued.dni)
        }
    }, [logued])
    return (
        <UsersContext.Provider value={{
            users,
            setUsers,
            getUsers,
            updateUserById,
            loading,
            getMedicalHistoryById,
            updateMedicalHistoryById,
            medicalHistory,
            deleteUserByDni,
            addPrescription
        }}>
            {children}
        </UsersContext.Provider>
    )
}
