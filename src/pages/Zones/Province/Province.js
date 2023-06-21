import React, { useState } from 'react';
import {
	Button,
	CircularProgress,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextField,
	Typography,
} from '@mui/material';
import { ActionWrapper } from '../../../components/PageLayout/ActionWrapper';
import ProvinceList from './ProvinceList';
import PermissionWrapper from '../../../components/PermissionWrapper/PermissionWrapper';
import { useUserAccessValidation } from '../../../hooks/authentication';
import {
	DEF_ACTIONS,
	DEF_COMPONENTS,
} from '../../../utils/constants/permission';
import { useNavigate } from 'react-router';
import DialogBox from '../../../components/PageLayout/DialogBox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { deleteProvince } from '../../../redux/actions/province/action';
import { useSnackBars } from '../../../context/SnackBarContext';
import { SnackBarTypes } from '../../../utils/constants/snackBarTypes';
import DeleteMsg from '../../../utils/constants/DeleteMsg';
import { defaultMessages } from '../../../utils/constants/apiMessages';
import { SearchWrapper } from '../../../components/PageLayout/SearchWrapper';
import { Colors } from '../../../utils/constants/Colors';
import { SearchButton } from '../../../components/PageLayout/SearchButton';
import { ClearButton } from '../../../components/PageLayout/ClearButton';
import SearchIcon from '@mui/icons-material/Search';
import SearchImg from '../../../assets/images/Search.png';

const Province = () => {
	useUserAccessValidation();
	const navigate = useNavigate();
	const { addSnackBar } = useSnackBars();

	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [selectedProvinces, setSelectedProvinces] = useState([]);
	const [action, setAction] = useState(DEF_ACTIONS.ADD);
	const [searchData, setSearchData] = useState({
		code: '',
		name: '',
	});
	const [search, setSearch] = useState({});

	const toggleProvinceSelect = (component) => {
		setSelectedProvinces((current = []) => {
			let newList = [...current];
			let index = newList.findIndex((c) => c?.id === component?.id);
			if (index > -1) {
				newList.splice(index, 1);
			} else {
				newList.push(component);
			}
			return newList;
		});
	};

	const selectAllProvinces = (all = []) => {
		setSelectedProvinces(all);
	};

	const resetSelectedProvinces = () => {
		setSelectedProvinces([]);
	};

	const onCreate = () => {
		setAction(DEF_ACTIONS.ADD);
		navigate('/zone/ga-structure/province-form', {
			state: { action: DEF_ACTIONS.ADD },
		});
	};

	const onEdit = () => {
		setAction(DEF_ACTIONS.EDIT);
		navigate('/zone/ga-structure/province-form', {
			state: {
				action: DEF_ACTIONS.EDIT,
				target: selectedProvinces[0] || {},
			},
		});
	};

	const onView = () => {
		setAction(DEF_ACTIONS.VIEW);
		navigate('/zone/ga-structure/province-form', {
			state: {
				action: DEF_ACTIONS.VIEW,
				target: selectedProvinces[0] || {},
			},
		});
	};

	const onDelete = () => {
		setOpen(true);
	};

	const close = () => {
		setOpen(false);
	};

	const renderSelectedItems = () => {
		return (
			<List>
				{selectedProvinces.map((p, key) => {
					return (
						<ListItem>
							<ListItemIcon>
								{loading ? (
									<CircularProgress size={16} />
								) : (
									<RadioButtonCheckedIcon color='info' />
								)}
							</ListItemIcon>
							<ListItemText>
								{p.code} - {p.name}
							</ListItemText>
						</ListItem>
					);
				})}
			</List>
		);
	};

	const onSuccess = () => {
		addSnackBar({
			type: SnackBarTypes.success,
			message: `Successfully Deleted`,
		});
	};

	const onError = (message) => {
		addSnackBar({
			type: SnackBarTypes.error,
			message: message || defaultMessages.apiErrorUnknown,
		});
	};

	const onConfirm = async () => {
		try {
			setLoading(true);
			for (const province of selectedProvinces) {
				await deleteProvince(province?.id, onSuccess, onError);
			}
			setLoading(false);
			close();
			resetSelectedProvinces();
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const advanceSearch = () => {
		setSearch({
			code: `<>${searchData.code}`,
			name: `<>${searchData.name}`,
		});
	};

	const resetSearch = () => {
		setSearchData({
			code: '',
			name: '',
		});
		setSearch({});
	};

	const handleSearchDataChange = (value, target) => {
		setSearchData((current) => ({
			...current,
			[target]: value,
		}));
	};

	return (
		<div>
			<SearchWrapper>
				<TextField
					sx={{
						width: '175px',
						backgroundColor: `${Colors.white}`,
						boxSizing: 'border-box',
						'& .MuiInputBase-root': {
							height: '30px',
							borderRadius: '3px',
							border: '1px solid #D2D2D2',
							fontSize: '11px',
						},
					}}
					value={searchData.code}
					onChange={(e) =>
						handleSearchDataChange(e?.target?.value || '', 'code')
					}
					placeholder='SEARCH BY CODE'
				/>
				<TextField
					sx={{
						width: '175px',
						backgroundColor: `${Colors.white}`,
						boxSizing: 'border-box',
						'& .MuiInputBase-root': {
							height: '30px',
							borderRadius: '3px',
							border: '1px solid #D2D2D2',
							fontSize: '11px',
						},
					}}
					value={searchData.name}
					onChange={(e) =>
						handleSearchDataChange(e?.target?.value || '', 'name')
					}
					placeholder='SEARCH BY DESCRIPTION'
				/>
				<SearchButton onClick={advanceSearch}>SEARCH</SearchButton>
				<ClearButton onClick={resetSearch}>CLEAR FILTER</ClearButton>
			</SearchWrapper>
			<ActionWrapper isLeft>
				<PermissionWrapper
					permission={`${DEF_ACTIONS.ADD}_${DEF_COMPONENTS.PROVINCE}`}>
					<Button
						variant='contained'
						onClick={onCreate}>
						{DEF_ACTIONS.ADD}
					</Button>
				</PermissionWrapper>
				{selectedProvinces.length === 1 && (
					<PermissionWrapper
						permission={`${DEF_ACTIONS.EDIT}_${DEF_COMPONENTS.PROVINCE}`}>
						<Button
							variant='contained'
							color='secondary'
							onClick={onEdit}
							sx={{ ml: '8px' }}>
							{DEF_ACTIONS.EDIT}
						</Button>
					</PermissionWrapper>
				)}
				{selectedProvinces.length === 1 && (
					<PermissionWrapper
						permission={`${DEF_ACTIONS.VIEW}_${DEF_COMPONENTS.PROVINCE}`}>
						<Button
							variant='contained'
							color='info'
							onClick={onView}
							sx={{ ml: '8px' }}>
							{DEF_ACTIONS.VIEW}
						</Button>
					</PermissionWrapper>
				)}
				{selectedProvinces.length > 0 && (
					<PermissionWrapper
						permission={`${DEF_ACTIONS.DELETE}_${DEF_COMPONENTS.PROVINCE}`}>
						<Button
							variant='contained'
							color='error'
							onClick={onDelete}
							sx={{ ml: '8px' }}>
							{DEF_ACTIONS.DELETE}
						</Button>
					</PermissionWrapper>
				)}
			</ActionWrapper>
			<PermissionWrapper
				permission={`${DEF_ACTIONS.VIEW_LIST}_${DEF_COMPONENTS.PROVINCE}`}>
				{loading === false && (
					<ProvinceList
						selectedRows={selectedProvinces}
						onRowSelect={toggleProvinceSelect}
						selectAll={selectAllProvinces}
						unSelectAll={resetSelectedProvinces}
						advancedSearchData={search}
					/>
				)}
			</PermissionWrapper>
			<DialogBox
				open={open}
				title='Delete Province(s)'
				actions={
					<ActionWrapper>
						<Button
							variant='contained'
							color='info'
							onClick={onConfirm}
							sx={{ ml: '8px' }}>
							Confirm
						</Button>
						<Button
							variant='contained'
							color='error'
							onClick={close}
							sx={{ ml: '8px' }}>
							Close
						</Button>
					</ActionWrapper>
				}>
				<>
					<DeleteMsg />
					<Divider sx={{ mt: '16px' }} />
					{renderSelectedItems()}
				</>
			</DialogBox>
		</div>
	);
};

export default Province;
