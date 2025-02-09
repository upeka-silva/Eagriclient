import React, { useEffect, useState } from 'react';
import { Checkbox, CircularProgress, FormControlLabel, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { ActionWrapper } from '../../components/PageLayout/ActionWrapper';
import { DEF_ACTIONS } from '../../utils/constants/permission';
import styled from 'styled-components';
import theme from '../../utils/theme/theme.json';
import { fetchAllActions, fetchAllComponents } from '../../redux/actions/permission/actions';

const ComponentActionList = ({
    roleId = 0,
    rolePermissions = [],
    setRolePermission = (_component, _action, _state) => { }
}) => {

    const [loading, setLoading] = useState(true);

    const [components, setComponents] = useState([]);
    const [actions, setActions] = useState([]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = async () => {
        setLoading(true);
        await fetchComponents();
        // await fetchActions();
        setLoading(false);
    }

    const fetchComponents = async () => {
        try {
            setComponents(await fetchAllComponents());
        } catch (error) {
            console.log(error);
        }
    }

    // const fetchActions = async () => {
    //     try {
    //         setActions(await fetchAllActions());
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const renderTableBody = () => {
        return components.map((c, key) => {
            return (
                <TableRow key={key}>
                    <TableCell key={`${key}-1`}>{c?.code || c?.name || 'Component Code'}</TableCell>
                    {
                        actions.map((a, k) => {
                            let checked = rolePermissions.findIndex(p => p?.componentId === c?.id && p?.actionId === a?.id) > -1;
                            return (
                                <TableCell key={`${key}${k}`} onClick={() => setRolePermission(c?.id, a?.id, !checked)} >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={checked}
                                                onChange={e => setRolePermission(c?.id, a?.id, e?.target?.checked)}
                                            />
                                        }
                                        label=""
                                    />
                                </TableCell>
                            )
                        })
                    }
                </TableRow>
            );
        });
    }

    if (loading) {
        return (
            <ActionWrapper isCeneter>
                <CircularProgress />
            </ActionWrapper>
        )
    }

    return (
        <div>
            <CustomTable size='small' border>
                <TableHead>
                    <TableRow>
                        <TableCell>Component</TableCell>
                        {
                            actions.length > 0 ? (
                                actions.map((a, key) => <TableCell key={key}>{a?.code || a?.name || 'ACTION_CODE'}</TableCell>)
                            ) : (
                                <>
                                    <TableCell>{DEF_ACTIONS.ADD}</TableCell>
                                    <TableCell>{DEF_ACTIONS.VIEW}</TableCell>
                                    <TableCell>{DEF_ACTIONS.EDIT}</TableCell>
                                    <TableCell>{DEF_ACTIONS.DELETE}</TableCell>
                                    <TableCell>{DEF_ACTIONS.VIEW_LIST}</TableCell>
                                </>
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderTableBody()}
                </TableBody>
            </CustomTable>
        </div>
    );
}

export default ComponentActionList;

const CustomTable = styled(Table)`
    margin-top: 12px;

    & th {
        background: ${theme.coreColors.secondary}CC;
        color: #FFF;
    }

    & td,
    & th {
        border: 1px solid #CCC !important;
        cursor: pointer;
    }
`;