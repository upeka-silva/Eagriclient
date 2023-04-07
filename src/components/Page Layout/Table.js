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
    Popover,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SquareIcon from '@mui/icons-material/CheckCircle';
import CheckBoxIcon from '@mui/icons-material/CropSquareOutlined';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import PermissionWrapper from '../Permission Wrapper/PermissionWrapper';
import { fetchDataList } from '../../redux/actions/table/table';
import { Colors } from '../../utils/constants/Colors';
import theme from '../../utils/theme/theme.json';


export const DataTable = ({
    dataRows = [],
    columns = [],
    searchable = false,
    resetSearchOnHide = false,
    dataEndPoint = null,
    loadingTable = false,
    loaderType = 'circular',
    enableActionsOnContext = false,
    selectedRows = [],
    selectable = false,
    onRowSelect = (_r) => { },
    selectAll = ([]) => { },
    unSelectAll = () => { }
}) => {

    const [rows, setRows] = useState(dataRows);
    const [loading, setLoading] = useState(loadingTable);
    const [order, setOrder] = useState('asc');
    const [orderByTarget, setOrderByTarget] = useState(null);
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [showPopover, setShowPopover] = useState(null);

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
        // let fieldList = columns.filter(c => c?.searchable).map(c => c?.headerName);
        // if (fieldList.length === columns.length) {
        //     return 'Search from all fields';
        // }
        // return `Search from ${fieldList.join(', ')}`;
        return "Keyword"
    }

    const generateActionButtons = (actions = [], record = {}) => {
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

    const handleRowClick = (e) => {
        if (enableActionsOnContext && e.type === 'contextmenu') {
            e.preventDefault();
            setShowPopover(e.currentTarget || null);
            onRowSelect(JSON.parse(e.currentTarget.getAttribute('data-target')));
        } else if (selectable && e.type === 'click') {
            e.preventDefault();
            onRowSelect(JSON.parse(e.currentTarget.getAttribute('data-target')));
        }
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
                                <CollapseContentWrapper>
                                    <FormControl sx={{ mr: '5px', minWidth: '200px' }} size='small'>
                                        <InputLabel>Target Field</InputLabel>
                                        <Select
                                            // value={age}
                                            label="Target Field"
                                        // onChange={handleChange}
                                        >
                                            {
                                                Object.keys(rows[0] || {}).filter(key => key !== 'id').map((k, key) => {
                                                    return <MenuItem key={key} value={k}>{k.charAt(0).toUpperCase()}{k.slice(1)}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ mr: '5px', minWidth: '200px' }} size='small'>
                                        <InputLabel>Criteria</InputLabel>
                                        <Select
                                            // value={age}
                                            label="Criteria"
                                        // onChange={handleChange}
                                        >
                                            <MenuItem value={'equal'}>Equal =</MenuItem>
                                            <MenuItem value={'contains'}>Contains :</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        value={keyword}
                                        onChange={e => setKeyword(e?.target?.value)}
                                        label={generateSearchInputPlaceHolder()}
                                        size='small'
                                    />
                                </CollapseContentWrapper>
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
            <Table sx={{ borderCollapse: 'unset !important' }}>
                <TableHead>
                    <TableRow>
                        {
                            selectable &&
                            <TableCell sx={{ borderBottom: 'unset !important' }}>
                                <ActionToolTip
                                    title={selectedRows.length === rows.length ? 'Unselect All' : 'Select All'}
                                    placement="top"
                                    arrow
                                >
                                    <IconButton
                                        sx={{ ml: '-5px' }}
                                        onClick={selectedRows.length === rows.length ? unSelectAll : () => selectAll(rows)}
                                    >
                                        {
                                            selectedRows.length > 0 ? 
                                            selectedRows.length < rows.length ? (
                                                <IndeterminateCheckBoxIcon />
                                            ) : (
                                                <CloseIcon />
                                            ) : (
                                                <CheckBoxIcon sx={{ mt: '2px' }} />
                                            )
                                        }
                                    </IconButton>
                                </ActionToolTip>
                            </TableCell>
                        }
                        {
                            columns.map((c, key) => {
                                if (!c?.hidden) {
                                    return (
                                        <TableCell key={key} sx={{ borderBottom: 'unset !important', ...(c?.type !== 'actions' ? {} : { textAlign: 'right !important' }) }}>
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
                                    )
                                }
                                return null;
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        getDataRows().map((r, key) => (
                            <SelectableRow
                                key={key}
                                onClick={handleRowClick}
                                onContextMenu={handleRowClick}
                                data-target={JSON.stringify(r)}
                                contextMenu="none"
                                selected={(selectedRows || []).findIndex(sr => sr?.id === r.id) > -1}
                                firstChild={key === 0}
                            >
                                {
                                    selectable && (
                                        <TableCell>
                                            {
                                                (selectedRows || []).findIndex(sr => sr?.id === r.id) > -1 ? (
                                                    <SquareIcon htmlColor={theme.coreColors.secondary} sx={{ transform: 'scale(1.2)', mt: '2px' }} />
                                                ) : (
                                                    <CheckBoxIcon sx={{ mt: '2px' }} />
                                                )
                                            }
                                        </TableCell>
                                    )
                                }
                                {
                                    columns.map((c, key2) => {
                                        if (!c?.hidden) {
                                            if (c.type === 'actions') {
                                                return (
                                                    <TableCell key={`${key}-${key2}`} contextMenu="none">
                                                        {/* <ActionWrapper> */}
                                                        <ActionToolTip title="actions" placement="top" arrow>
                                                            <IconButton onClick={(e) => { setShowPopover(e.currentTarget) }}>
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                        </ActionToolTip>
                                                        {/* </ActionWrapper> */}
                                                        <PopOver
                                                            id={r.id}
                                                            open={!!showPopover}
                                                            {
                                                            ...showPopover && {
                                                                anchorEl: showPopover
                                                            }
                                                            }
                                                            sx={{
                                                                boxShadow: `${Colors.shadow} !important`
                                                            }}
                                                            onClose={() => { setShowPopover(null) }}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'left',
                                                            }}
                                                        >
                                                            <ActionWrapper>
                                                                {generateActionButtons(c.actions, r)}
                                                            </ActionWrapper>
                                                        </PopOver>
                                                    </TableCell>
                                                )
                                            }
                                            return (
                                                <TableCell key={`${key}-${key2}`}>
                                                    {r[c.field] || ''}
                                                </TableCell>
                                            );
                                        }
                                        return null;
                                    })
                                }
                                {
                                    columns.find(c => c.type === 'actions')?.hidden && (
                                        <PopOver
                                            id={r.id}
                                            open={!!showPopover && r.id === JSON.parse(showPopover.getAttribute('data-target'))['id']}
                                            {
                                            ...showPopover && {
                                                anchorEl: showPopover
                                            }
                                            }
                                            sx={{
                                                boxShadow: `${Colors.shadow} !important`
                                            }}
                                            onClose={() => {
                                                setShowPopover(null);
                                                onRowSelect(r);
                                            }}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <ActionWrapper>
                                                {generateActionButtons(columns.find(c => c?.hidden && c.type === 'actions')?.actions || [], r)}
                                            </ActionWrapper>
                                        </PopOver>
                                    )
                                }
                            </SelectableRow>
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

const CollapseContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const PopOver = styled(Popover)`

    & div:nth-child(3) {
        box-shadow: ${Colors.shadow};
    }
`;

const SelectableRow = styled(TableRow)`
    background: ${props => props.selected ? 'white !important' : 'inehrit'};
    border-width: ${props => props.selected ? '2px 1.5px' : '0px 0px 1px 0px'};
    border-radius: ${props => props.selected ? '10px !important' : 'unset'};
    border: ${props => props.selected ? 'unset !important' : 'inherit'};
    border-collapse: collapse !important;
    transition: 0.3s ease;

    :hover {
        background-color: ${theme.coreColors.primary} !important;
        transform: translateX(-0px) translateY(-7px);
        box-shadow: ${Colors.shadow};
        cursor: pointer;
    }

    :hover td {
        border-top: 1px solid ${theme.coreColors.primary} !important;
        border-bottom: 1px solid ${theme.coreColors.primary} !important;
        transition: 0.3s ease;
    }

    :hover td:first-child {
        border-left: 1px solid ${theme.coreColors.primary} !important;
        border-top-left-radius: 10px !important; 
        border-bottom-left-radius: 10px !important;
    }

    :hover td:last-child {
        border-right: 1px solid ${theme.coreColors.primary} !important;
        border-bottom-right-radius: 10px !important;
        border-top-right-radius: 10px !important;
    }

    & td {
        border-top: ${props => props.selected ? `1px solid ${theme.coreColors.primary} !important` : '1px solid #CCC !important'};
        border-bottom: ${props => props.selected ? `1px solid ${theme.coreColors.primary} !important` : '1px solid #CCC !important'};
    }

    & td:first-child {
        border-left: ${props => props.selected ? `1px solid ${theme.coreColors.primary} !important` : '1px solid transparent'};
        border-top-left-radius: ${props => props.selected ? '10px !important' : 'unset'}; 
        border-bottom-left-radius: ${props => props.selected ? '10px !important' : 'unset'};
    }

    & td:last-child {
        border-right: ${props => props.selected ? `1px solid ${theme.coreColors.primary} !important` : '1px solid transparent'};
        border-bottom-right-radius: ${props => props.selected ? '10px !important' : 'unset'}; 
        border-top-right-radius: ${props => props.selected ? '10px !important' : 'unset'};
    }
`;