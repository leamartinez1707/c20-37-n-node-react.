/* eslint-disable react/prop-types */
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiCalendar, HiArrowSmLeft, HiArrowSmRight, HiDocumentAdd, HiOutlineCalendar } from "react-icons/hi";
import { FaFilePrescription } from 'react-icons/fa'

export const DoctorSidebar = ({ isSidebarCollapsed,
    setActiveMenu,
    activeMenu,
    toggleSidebar
}) => {

    return (
        <div className={`${isSidebarCollapsed ? 'w-16' : 'w-44'} transition-all duration-300 ease-in-out`}>
            <Sidebar collapsed={isSidebarCollapsed}>

                <div className={`cursor-pointer flex ${isSidebarCollapsed ? 'justify-center' : null}`}>
                    {isSidebarCollapsed ?
                        <HiArrowSmRight onClick={toggleSidebar} className="size-8" /> :
                        <HiArrowSmLeft onClick={toggleSidebar} className="size-8" />}
                </div>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item
                            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                            icon={HiChartPie}
                            onClick={() => setActiveMenu('dashboard')}
                            active={activeMenu === 'dashboard'}
                        >
                            {!isSidebarCollapsed && <span>Tablero</span>}
                            {isSidebarCollapsed && <span>Tablero</span>}
                        </Sidebar.Item>
                        <Sidebar.Item
                            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                            icon={HiDocumentAdd}
                            onClick={() => setActiveMenu('historyForm')}
                            active={activeMenu === 'historyForm'}
                        >
                            {!isSidebarCollapsed && <span>Formulario</span>}
                            {isSidebarCollapsed && <span>Formulario</span>}
                        </Sidebar.Item>
                        <Sidebar.Item
                            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                            icon={HiCalendar}
                            onClick={() => setActiveMenu('agendas')}
                            active={activeMenu === 'agendas'}
                        >
                            {!isSidebarCollapsed && <span>Calendario</span>}
                            {isSidebarCollapsed && <span>Calendario</span>}
                        </Sidebar.Item>
                        <Sidebar.Item
                            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                            icon={HiOutlineCalendar}
                            onClick={() => setActiveMenu('availability')}
                            active={activeMenu === 'availability'}
                        >
                            {!isSidebarCollapsed && <span>Disponibilidad</span>}
                            {isSidebarCollapsed && <span>Disponibilidad</span>}
                        </Sidebar.Item>
                        <Sidebar.Item
                            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                            icon={FaFilePrescription}
                            onClick={() => setActiveMenu('prescription')}
                            active={activeMenu === 'prescription'}
                        >
                            {!isSidebarCollapsed && <span>Crear receta</span>}
                            {isSidebarCollapsed && <span>Crear receta</span>}
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}