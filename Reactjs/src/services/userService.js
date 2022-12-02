import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}
const getAllUsers = (inputId) => {
    return axios.get(`api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
console.log('check data from service', data)
return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: { 
            id: userId
        }
    });
    }
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);

}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}


const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}

const getAllSupports = () => {
    return axios.get(`/api/get-all-supports`)
}

const saveDetailDoctor = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}

const saveDetailSupport = (data) => {
    return axios.post('/api/save-infor-supports', data)
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const getDetailInforSupport = (inputId) => {
    return axios.get(`/api/get-detail-support-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`)
}


const createNewMedical = (data) => {
    return axios.post('/api/create-new-medical', data)
}

const getAllMedical = () => {
    return axios.get(`/api/get-medical`)
}

const getAllClinic = () => {
    return axios.get(`/api/get-clinic`)
}

const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const getAllDetailMedicalById = (data) => {
    return axios.get(`/api/get-detail-medical-by-id?id=${data.id}&location=${data.location}`)
}

const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const getAllPatientForSupport = (data) => {
    return axios.get(`/api/get-list-patient-for-support?supportId=${data.supportId}&date=${data.date}`)
}

const postSendRemedy = (data) => {
    return axios.post('/api/send-remedy', data)
}
export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService, getDetailInforSupport,
     getAllCodeService, getTopDoctorHomeService, getAllDoctors, saveDetailDoctor, postSendRemedy, getAllSupports,
     getDetailInforDoctor, saveBulkScheduleDoctor, getScheduleDoctorByDate, getExtraInforDoctorById, getAllPatientForSupport,
     getProfileDoctorById, postPatientBookAppointment, postVerifyBookAppointment, createNewSpecialty, getAllSpecialty,
     getAllDetailSpecialtyById, createNewClinic, getAllClinic, getAllDetailClinicById, getAllPatientForDoctor,
     createNewMedical, getAllMedical, getAllDetailMedicalById, saveDetailSupport };