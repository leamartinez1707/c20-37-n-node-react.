import { Card, Avatar, Badge, Table, Button } from 'flowbite-react'
import { useGeneralContext } from '../hooks/useGeneralContext'
import { useUsers } from '../hooks/useUsersContext'
import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuthContext'
import { Link } from "react-router-dom"
import WorkingOnModal from '../components/Modal/WorkingOnModal'

export const ActiveDoctorsPage = () => {
    const [openModal, setOpenModal] = useState(false)
    const { logued } = useAuth();
    const { users } = useGeneralContext()
    const { getUsers } = useUsers()

    useEffect(() => {
        if (users.length === 0) {
            getUsers()
        }
        console.log(users)
    }, [])
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Doctores Activos</h1>
            <div className="overflow-x-auto overflow-y-auto max-h-[70vh] shadow-md sm:rounded-lg">
                <Table striped className="min-w-full">
                    <Table.Head className="sticky top-0 bg-white dark:bg-gray-800">
                        <Table.HeadCell>Nombre</Table.HeadCell>
                        <Table.HeadCell>Especialidad</Table.HeadCell>
                        <Table.HeadCell>Estado</Table.HeadCell>
                        <Table.HeadCell>Acción</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {users
                            .filter((user) => user.role === 'doctor' && user.status === true)
                            .map((doctor) => (
                                <Table.Row key={doctor.dni} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {doctor.firstName} {doctor.lastName}
                                    </Table.Cell>
                                    <Table.Cell>{doctor.specialty}</Table.Cell>
                                    <Table.Cell>
                                        {doctor.status ? (

                                            <Badge className="bg-none w-16" color="success" size="md">
                                                Activo
                                            </Badge>
                                        ) : (
                                            <Badge className='w-18' color="danger" size="sm">
                                                Inactivo
                                            </Badge>
                                        )
                                        }
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link className='bg-green-400 text-white hover:bg-green-600 transition-colors duration-200 px-2 py-1 rounded'
                                            onClick={() => setOpenModal(true)}
                                        >Agendar Cita</Link>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
            </div>
            <WorkingOnModal show={openModal} onClose={() => setOpenModal(false)} />
        </div>
    )
}