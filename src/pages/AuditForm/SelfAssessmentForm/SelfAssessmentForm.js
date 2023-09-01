import React, { useState, useEffect } from "react";

import CommonAuditForm from "../CommonAuditForm";

const SelfAssessmentForm = () => {

    return (
        <>
            <CommonAuditForm auditFormType={'SELF_ASSESSMENT'} />
        </>

    );
};

export default SelfAssessmentForm;
