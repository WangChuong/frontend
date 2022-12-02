export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user', 
        menus: [
            
            {
                name: 'menu.admin.crud-redux', link :'/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link :'/system/manage-doctor'
            },
           
            {
                name: 'menu.doctor.manage-schedule', link :'/doctor/manage-schedule'
            },

            {
                name: 'menu.doctor.manage-patient', link :'/doctor/manage-patient'
            },
            {
                name: 'menu.doctor.manage-medical', link :'/doctor/manage-medical'
            },
            {
                name: 'menu.doctor.manage-support', link :'/doctor/manage-support'
            },
            {
                name: 'menu.admin.manage-users', link :'/system/user-manage'
            },
        ]
    },


    { // quan ly phong kham
        name: 'menu.admin.clinic', 
        menus: [
            {
                name: 'menu.admin.manage-clinic', link :'/system/manage-clinic'
            },
        ]
    },

    { // quan ly chuyen khoa
        name: 'menu.admin.specialty', 
        menus: [
            {
                name: 'menu.admin.manage-specialty', link :'/system/manage-specialty'
            },
        ]
    },  
    
    { // quan ly cam nang
        name: 'menu.admin.handbook', 
        menus: [
            {
                name: 'menu.admin.manage-handbook', link :'/system/manage-handbook'
            },
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link :'/doctor/manage-schedule'
            },
            {
                name: 'menu.doctor.manage-patient', link :'/doctor/manage-patient'
            },
           
        ]
    },
    
];

export const supportMenu = [
    {
        name: 'menu.support.manage-user',
        menus: [
            {
                name: 'menu.doctor.manage-support', link :'/doctor/manage-support1'
            },
        ]
    },
    
];

									