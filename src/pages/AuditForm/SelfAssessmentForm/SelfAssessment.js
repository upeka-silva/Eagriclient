import React, { useState } from "react";

import CommonAudit from "../CommonAudit";
import { useUserAccessValidation } from "../../../hooks/authentication";

const SelfAssessment = () => {
    
    return (
        <CommonAudit auditFormType={'SELF_ASSESSMENT'} />
    );
};

export default SelfAssessment;
