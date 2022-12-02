import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, 
    editUserService, getTopDoctorHomeService, getAllDoctors, saveDetailDoctor, saveDetailSupport,
getAllSpecialty, getAllClinic, getAllMedical, getAllSupports } from '../../services/userService';
import { toast } from "react-toastify"


export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log(' fetchGenderStart error ', e)
        }
    }
}



export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})




export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})




export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})




export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})



export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})


export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log(' fetchPositionFailed error ', e)
        }
    }
}


export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log(' fetchRoleFailed error ', e)
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log(' check ', res)
            if (res && res.errCode === 0) {
                toast.success("create a new user success");
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log(' saveUserFailed error ', e)
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            let res1 = await getTopDoctorHomeService(10)
            let res2 = await getAllDoctors()
            console.log('dasdsadadsas', res1)
            console.log('number2', res2)
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {

                toast.error("Fetch all users error !");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("Fetch all users error !");
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed error', e)
        }
    }

}


export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})




export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {

            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success(" Delete the user succeed ! ");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error(" Delete the user error ! ");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error(" Delete the user error ! ");
            dispatch(deleteUserFailed());
            console.log(' saveUserFailed error ', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})




















export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success(" Upload the user succeed ! ");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error(" Upload the user error ! ");
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error(" Upload the user error ! ");
            dispatch(editUserFailed());
            console.log(' saveUserFailed error ', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})


export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDocTors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED

                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED

            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED

                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
        }
    }
}

export const fetchAllSupports = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllSupports();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_SUPPORTS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_SUPPORTS_FAILED

                })
            }
        } catch (e) {
            console.log('FETCH_ALL_SUPPORTS_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALL_SUPPORTS_FAILED
            })
        }
    }
}

export const saveDetailDoctors = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await saveDetailDoctor(data);
            if (res && res.errCode === 0) {
                toast.success(" save infor doctor detail succeed ! ");

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error("failed save infor doctor detail error ! ");

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED

                })
            }
        } catch (e) {
            toast.error("failed save infor doctor detail error ! ");
            console.log('SAVE_DETAIL_DOCTOR_FAILED', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED

            })
        }
    }
}


export const saveDetailSupports = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await saveDetailSupport(data);
            if (res && res.errCode === 0) {
                toast.success(" save infor support detail succeed ! ");

                dispatch({
                    type: actionTypes.SAVE_DETAIL_SUPPORT_SUCCESS,
                })
            } else {
                toast.error("failed save infor support detail error ! ");

                dispatch({
                    type: actionTypes.SAVE_DETAIL_SUPPORT_FAILED

                })
            }
        } catch (e) {
            toast.error("failed save infor support detail error ! ");
            console.log('SAVE_DETAIL_SUPPORT_FAILED', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_SUPPORT_FAILED

            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED

                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED

            })
        }
    }
}

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START})
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resMedication = await getAllCodeService("MEDICATION");
            let resSpecialty = await getAllSpecialty();
            let resMedical = await getAllMedical();
            let resClinic = await getAllClinic();
            if (resPrice && resPrice.errCode === 0 && resPayment && resPayment.errCode === 0 
                && resProvince && resProvince.errCode === 0 && resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode === 0 && resMedical && resMedical.errCode === 0
                && resMedication && resMedication.errCode === 0) {
               let data = {
                resPrice: resPrice.data,
                resPayment: resPayment.data,
                resProvince: resProvince.data,
                resMedication: resMedication.data,
                resSpecialty: resSpecialty.data,
                resClinic: resClinic.data,
                resMedical: resMedical.data,
               }
               dispatch(fetchRequiredDoctorInforSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInforSuccess());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
        }
    }
}

export const getRequiredSupportInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_REQUIRED_SUPPORT_INFOR_START})
        } catch (e) {
            dispatch(fetchRequiredSupportInforFailed());
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})

export const fetchRequiredSupportInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_SUPPORT_INFOR_FAILED
})
