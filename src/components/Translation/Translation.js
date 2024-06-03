import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TranslationWrapper = ({ text }) => {
  const { t } = useTranslation();
 return(
  <>
  <span style={{fontStyle:'none'}}>
    {t(text)}
  </span>
  </>
 )
};

export default TranslationWrapper;
