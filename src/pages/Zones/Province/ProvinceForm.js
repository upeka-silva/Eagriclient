import React, { useState } from 'react';
import { TextField } from '@mui/material';
import styled from 'styled-components';

const ProvinceForm = ({
    selectedProvince = {
        provinceCode: '',
        name: '',
    },
    updateProvince = (_value, _key) => { }
}) => {

    const handleChange = (e) => {
        updateProvince(e?.target?.value, e?.target?.name);
    }

    return (
        <Wrapper>
            <br />
            <TextField
                variant='outlined'
                fullWidth
                label='Province Code'
                id='provinceCode'
                name='provinceCode'
                value={selectedProvince?.provinceCode}
                onChange={handleChange}
            />
            <br />
            <TextField
                variant='outlined'
                fullWidth
                label='Province Name'
                id='name'
                name='name'
                value={selectedProvince?.name}
                onChange={handleChange}
            />
        </Wrapper>
    );
}

export default ProvinceForm;

const Wrapper = styled.div`
    display: flex !important;
    flex-direction: column;
`;