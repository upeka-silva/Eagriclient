import React, { useCallback, useEffect, useState } from 'react';
import styled from "styled-components";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Button,
    Collapse,
    TextField,
    TablePagination,
    Tooltip,
    tooltipClasses,
    IconButton,
    CircularProgress,
    LinearProgress,
    Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PermissionWrapper from '../Permission Wrapper/PermissionWrapper';
import { fetchDataList } from '../../redux/actions/table/table';


export const DataTable = ({
    dataRows = [],
    columns = [],
    searchable = false,
    resetSearchOnHide = false,
    dataEndPoint = null,
    loadingTable = false,
    loaderType = 'circular'
}) => {

    const [rows, setRows] = useState(dataRows);
    const [loading, setLoading] = useState(loadingTable);
    const [order, setOrder] = useState('asc');
    const [orderByTarget, setOrderByTarget] = useState(null);
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        if (dataEndPoint) {
            fetchTableData();
        }
    }, [page, pageSize, dataEndPoint]);

    const fetchTableData = async () => {
        setLoading(true);
        try {
            const dataList = await fetchDataList(dataEndPoint);
            if (dataList) {
                setRows(dataList);
            } else {
                setRows([]);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setRows([]);
            setLoading(false);
        }
    }

    const setOrderBy = (direction, target) => {
        setOrder(direction);
        setOrderByTarget(target);
    }

    const getDataRows = () => {
        let dataList = [...rows];
        if (orderByTarget) {
            dataList = dataList.sort((a, b) => {
                const ta = typeof a[orderByTarget] === 'number' ? a[orderByTarget] : (a[orderByTarget] || '')?.toUpperCase();
                const tb = typeof b[orderByTarget] === 'number' ? b[orderByTarget] : (b[orderByTarget] || '')?.toUpperCase();
                switch (order) {
                    case 'desc':
                        if (tb < ta) {
                            return -1;
                        }
                        if (tb > ta) {
                            return 1;
                        }
                        return 0;
                    case 'asc':
                    default:
                        if (ta < tb) {
                            return -1;
                        }
                        if (ta > tb) {
                            return 1;
                        }
                        return 0;
                }
            })
        }

        if (searchable) {
            let targets = columns.filter(c => c?.searchable).map(c => c?.field);
            let strKeyword = typeof keyword === 'string' ? keyword.toLowerCase() : JSON.stringify(keyword).toLowerCase();
            dataList = dataList.filter(d => {
                return targets.filter(t => {
                    let strData = typeof d[t] === 'string' ? d[t].toLowerCase() : JSON.stringify(d[t]).toLowerCase();
                    return strData === strKeyword || strData.startsWith(strKeyword) || strData.endsWith(strKeyword) || strData.includes(strKeyword);
                }).length > 0;
            });
        }

        if (dataEndPoint) {
            return dataList;
        }

        let start = page * pageSize;
        let end = page * pageSize + pageSize;

        return dataList.length > start ? dataList.slice(start, end) : dataList;
    };

    const toggleSearchInput = () => {
        setShowSearchInput(current => {
            if (current && resetSearchOnHide) setKeyword('');
            return !current;
        });
    }

    const generateSearchInputPlaceHolder = () => {
        let fieldList = columns.filter(c => c?.searchable).map(c => c?.headerName);
        if (fieldList.length === columns.length) {
            return 'Search from all fields';
        }
        return `Search from ${fieldList.join(', ')}`;
    }

    const generateActionButtons = (actions = [], record = {}) => {
        console.log(actions)
        return actions.map((a, key) => {
            switch (a.action) {
                case 'edit':
                    return (
                        <PermissionWrapper
                            {...a.permissions}
                            component={
                                <ActionToolTip key={key} title={a.action} placement="top" arrow>
                                    <IconButton color='info' onClick={() => { if (a.callback) a.callback(record) }}>
                                        <ModeEditIcon />
                                    </IconButton>
                                </ActionToolTip>
                            }
                        />
                    )
                case 'delete':
                    return (
                        <PermissionWrapper
                            {...a.permissions}
                            component={
                                <ActionToolTip key={key} title={a.action} placement="top" arrow>
                                    <IconButton color='error' onClick={() => { if (a.callback) a.callback(record) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ActionToolTip>
                            }
                        />
                    )
                default:
                    return (
                        <PermissionWrapper
                            {...a.permissions}
                            component={
                                <ActionToolTip key={key} title={a.action} placement="top" arrow>
                                    <IconButton onClick={() => { if (a.callback) a.callback(record) }}>
                                        {
                                            a.icon || <MoreVertIcon />
                                        }
                                    </IconButton>
                                </ActionToolTip>
                            }
                        />
                    )
            }
        })
    }

    const renderProgress = () => {
        switch (loaderType) {
            case 'linear':
                return (
                    <div style={{ width: "50%" }}>
                        <Typography>Loading...</Typography>
                        <LinearProgress />
                    </div>
                )
            case 'circular':
            default:
                return (
                    <CircularProgress />
                )
        }
    }

    if (loading) {
        return (
            <LoaderWrapper>
                {renderProgress()}
            </LoaderWrapper>
        )
    }

    return (
        <TableContainer>
            <TableHeaderContainer>
                {
                    searchable && (
                        <>
                            <Collapse
                                key='search-input-collapse'
                                in={showSearchInput}
                                timeout='auto'
                                unmountOnExit
                                orientation='horizontal'
                            >
                                <InputWrapper>
                                    <TextField
                                        sx={{ minWidth: '25vw' }}
                                        value={keyword}
                                        onChange={e => setKeyword(e?.target?.value)}
                                        placeholder={generateSearchInputPlaceHolder()}
                                    />
                                </InputWrapper>
                            </Collapse>
                            <Button
                                sx={{ marginLeft: "10px", minHeight: '56px' }}
                                startIcon={showSearchInput ? <CloseIcon /> : <SearchIcon />}
                                onClick={toggleSearchInput}
                            >
                                {showSearchInput ? 'Hide Search' : 'Search'}
                            </Button>
                        </>
                    )
                }
            </TableHeaderContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((c, key) => (
                                <TableCell key={key} sx={c?.type !== 'actions' ? {} : { textAlign: 'right !important' }}>
                                    {
                                        c?.type !== 'actions' ? (
                                            <TableSortLabel
                                                active={orderByTarget === c.field}
                                                direction={orderByTarget === c.field ? order : 'asc'}
                                                onClick={() => setOrderBy(order === 'asc' ? 'desc' : 'asc', c.field)}
                                            >
                                                {c.headerName}
                                            </TableSortLabel>
                                        ) : c.headerName
                                    }
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        getDataRows().map((r, key) => (
                            <TableRow key={key}>
                                {
                                    columns.map((c, key2) => {
                                        if (c.type === 'actions') {
                                            return (
                                                <TableCell key={`${key}-${key2}`}>
                                                    <ActionWrapper>
                                                        {generateActionButtons(c.actions, r)}
                                                    </ActionWrapper>
                                                </TableCell>
                                            )
                                        }
                                        return (
                                            <TableCell key={`${key}-${key2}`}>
                                                {r[c.field] || ''}
                                            </TableCell>
                                        );
                                    })
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <TableFooterContainer>
                <TablePagination
                    count={rows.length}
                    page={page}
                    rowsPerPage={pageSize}
                    rowsPerPageOptions={[10, 20, 30, ...(rows.length > 30 ? [rows.length] : [])]}
                    onPageChange={(e, newPage) => {
                        console.log(newPage);
                        setPage(newPage || 0)
                    }}
                    onRowsPerPageChange={e => setPageSize(e?.target?.value || 10)}
                />
            </TableFooterContainer>
        </TableContainer>
    );
}

const TableHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const TableFooterContainer = styled(TableHeaderContainer)`
    margin: 16px 0px 8px;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const ActionWrapper = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

const ActionToolTip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: 'black',
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'black',
    },
}));

const LoaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 20vh;
`;