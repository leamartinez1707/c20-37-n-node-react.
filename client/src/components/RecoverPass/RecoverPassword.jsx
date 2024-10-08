/* eslint-disable react/prop-types */

"use client";
import { Button, Modal } from "flowbite-react";

export const RecoverPassword = ({ openModal, setOpenModal }) => {

    return (
        <>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Acción en mantenimiento</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Esta funcionalidad aún no está disponible. Por favor, contacte a soporte técnico para más información.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="bg-primary hover:bg-primaryHover" onClick={() => setOpenModal(false)}>Acepto</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
