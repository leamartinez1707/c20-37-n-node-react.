import { Consultation } from "./consultation.model.js";
import calendarServices from "../calendar.services.js";
import userService from "../../session/session.services.js"
import availableTimeServices from "../availableTime/availableTime.services.js";
import { emailTemplate } from "../../../config/emailMessages.js";
import { sendEmail } from "../../../utils/sendEmail.js";

const getByID = async (id) => {
    const consultation = await Consultation.findById(id).populate('patient').populate('doctor');
    return consultation;
}

const getByDoctorAndRangeTime = async (doctorId, start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const consultations = await Consultation.find({
        doctor: doctorId,
        startTime: {
            $gte: startDate,
            $lt: endDate
        }
    }).populate('patient');

    console.log(consultations);
    
    let consultationsSlots = [];

    consultations.forEach(consultation => {
        consultationsSlots.push({
            _id: consultation._id,
            title: consultation.patient? consultation.patient.firstName + ' ' + consultation.patient.lastName : consultation.patientName,
            start: consultation.startTime.toISOString(),
            end: consultation.endTime.toISOString(),
            type: 'consultation'
        });
    });

    return consultationsSlots;
};

const getByPatientAndRangeTime = async (patientId, start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const consultations = await Consultation.find(
        {
            patient: patientId,
            startTime: {
                $gte: startDate,
                $lt: endDate
            }
        }).populate('doctor');

        console.log(consultations);
        
        let consultationsSlots = [];
    
        consultations.forEach(consultation => {
            consultationsSlots.push({
                _id: consultation._id,
                title: consultation.doctor.firstName + ' ' + consultation.doctor.lastName,
                specialty: consultation.doctor.specialty,
                start: consultation.startTime.toISOString(),
                end: consultation.endTime.toISOString(),
                type: 'consultation'
            });
        });
    
    return consultationsSlots;
}

const getByDoctorInSchedule = async (doctorId, startTime) => {
    const consultation = await Consultation.findOne({
        doctor: doctorId,
        startTime: startTime,
    });
    
    return consultation;
}

const create = async (data) => {
    const consultation = await Consultation.create(data);
    if(consultation.patient){

    const patient = await userService.getById(consultation.patient);
    const doctor = await userService.getById(consultation.doctor);

    await sendEmail(patient.email,"Nueva Cita", emailTemplate.consultationCreatedHtml(patient,doctor, consultation));
    await calendarServices.updateCalendarByConsultation(consultation.doctor,consultation);
    await calendarServices.updateCalendarByConsultation(consultation.patient,consultation);
    }

    await calendarServices.updateCalendarByConsultation(consultation.doctor,consultation);

    return consultation;
}

const updateByID = async (id, data) => {
    console.log(data);
    
    const consultation = await Consultation.findByIdAndUpdate(id,
        data,
        { new: true }
    );
    return consultation;
};


const removeByID = async (id) => {
    await Consultation.findByIdAndDelete(id);

    return { success: true, message: 'Consultation deleted successfully' };
};

export default { getByID, getByDoctorAndRangeTime, getByPatientAndRangeTime, create, updateByID, removeByID, getByDoctorInSchedule }