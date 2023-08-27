import React, { useState, useEffect } from "react";

import CommonAuditForm from "../CommonAuditForm";

const ExternalAuditForm = () => {

    return (
        <CommonAuditForm auditFormType={'EXTERNAL_AUDIT'} />
    );
};

export default ExternalAuditForm;
