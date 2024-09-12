import consultationServices from "./consultation.services.js";

const getConsultationByID = async (req, res) => {
    try {
        const {id} = req.params;
        const consultation = await consultationServices.getByID(id);
        return res.status(200).json({ status: "ok", playload:consultation })
    } catch (error) {
        res.status(500).json({status:"error", msg:"Internal server error"});
    }
}

const getConsultationByDoctorAndRangeTime = async (req, res) => {
    try {
        const {doctorId, start, end} = req.params;
        const consultation = await consultationServices.getByDoctorAndRangeTime(doctorId, start, end);
        return res.status(200).json({ status: "ok", playload:consultation })
    } catch (error) {
        res.status(500).json({status:"error", msg:"Internal server error"});
    }
}

const getConsultationByPatientAndRangeTime = async (req, res) => {
    try {
        const {doctorId, start, end} = req.params;
        const consultation = await consultationServices.getByPatientAndRangeTime(doctorId, start, end);
        return res.status(200).json({ status: "ok", playload:consultation })
    } catch (error) {
        res.status(500).json({status:"error", msg:"Internal server error"});
    }
}

const create = async (req, res) => {
    try {
        const body = req.body;
        const consultation = await consultationServices.create(body);
        return res.status(201).json({ status: "ok", msg: "consultation created", playload: consultation });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const updateByID = async (req, res) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const consultation = await consultationServices.updateByID(id, body);
        return res.status(201).json({ status: "ok", msg: "consultation updated", playload: consultation });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Internal server error" });
    }
}

const removeByID= async (req , res) => {
    try {
        const {id} = req.params;
        const response = await consultationServices.removeByID(id);
        return res.status(200).json({ status: "ok", msg: response.message })
    } catch (error) {
        res.status(500).json({status:"error", msg:"Internal server error"});
    }
}

export default {getConsultationByID, getConsultationByDoctorAndRangeTime, getConsultationByPatientAndRangeTime ,create, updateByID, removeByID}