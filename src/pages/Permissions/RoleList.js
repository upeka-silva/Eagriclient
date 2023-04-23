import React, { useEffect, useState } from 'react';
import { useSnackBars } from '../../context/SnackBarContext';
import { fetchAllRoles } from '../../redux/actions/permission/actions';
import { SnackBarTypes } from '../../utils/constants/snackBarTypes';
import RoleAccordion from './RoleAccordion';

const RoleList = () => {

    const [roles, setRoles] = useState([]);

    const [formData, setFormData] = useState([]);

    const { addSnackBar } = useSnackBars();

    const onError = (message, callback = () => { }) => {
        addSnackBar({ type: SnackBarTypes.error, message: message || 'Something went wrong' });
        callback();
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = async () => {
        try {
            const result = await fetchAllRoles(() => { }, onError);
            setRoles(result);
            fetchExisitingData(result);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchExisitingData = (rolesList = []) => {
        let newFormData = rolesList.map(r => {
            const { permissionDTOs = [] } = r;
            let newRoleData = {
                roleId: r.id,
                permissions: Array.isArray(permissionDTOs) && permissionDTOs?.length > 0 ?
                    permissionDTOs.map(p => {
                        return {
                            componentId: p?.componentDTO?.id || null,
                            actionId: p?.actionDTO?.id || null
                        };
                    })
                    : []
            }
            return newRoleData;
        })
        setFormData(newFormData);
    }

    const handleChange = (roleFormData) => {
        setFormData(current => {
            let newFormData = [...current];
            let index = current.findIndex(r => r?.roleId === roleFormData?.roleId);
            if (index > -1) {
                newFormData[index] = roleFormData;
                return newFormData;
            }
            return [...newFormData, roleFormData];
        })
    }

    return (
        <div>
            {
                roles.map((role, key) => {
                    return (
                        <RoleAccordion role={role} key={key} roleFormData={formData.find(f => f?.roleId === role?.id)} setRoleFormData={handleChange} />
                    )
                })
            }
        </div>
    );
}

export default RoleList;
