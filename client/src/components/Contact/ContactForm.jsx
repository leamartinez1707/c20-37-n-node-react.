import { useState } from "react"
import { Button, Label, TextInput, Textarea } from "flowbite-react"

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Aquí iría la lógica para enviar el formulario al backend
        // Simular envio con un delay de 2 segundos
        await new Promise((resolve) => setTimeout(resolve, 2000))

        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "" })

        // Resetear el mensaje de éxito después de 5 segundos
        setTimeout(() => setIsSubmitted(false), 5000)
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Contáctanos</h1>
            <p className="text-center text-gray-500">Envianos un mensaje con cualquier tipo de duda que se te presente y un administrador se pondrá en contacto contigo!</p>
            <div className="mx-auto bg-white p-8 rounded-lg shadow-md">
                {isSubmitted ? (
                    <div className="text-primary text-center mb-4">¡Gracias por tu mensaje! Te contactaremos pronto.</div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="name" value="Nombre" />
                            <TextInput placeholder="Tu nombre" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="email" value="Email" />
                            <TextInput placeholder="Tu correo" id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="subject" value="Asunto" />
                            <TextInput placeholder="Porque nos envias el mensaje?" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="message" value="Mensaje" />
                            <Textarea
                                placeholder="Escribe tu mensaje aquí"
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 font-bold bg-primary text-xs text-white hover:bg-primaryHover  focus:border-black p-2">                            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ContactForm

