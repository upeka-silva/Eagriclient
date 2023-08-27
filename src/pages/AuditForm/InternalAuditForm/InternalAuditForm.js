import React, { useState, useEffect } from "react";

import CommonAuditForm from "../CommonAuditForm";

const InternalAuditForm = () => {

    return (
        <CommonAuditForm auditFormType={'INTERNAL_AUDIT'} />
    );
};

export default InternalAuditForm;
