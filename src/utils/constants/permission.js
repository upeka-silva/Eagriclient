export const DEF_ACTIONS = {
  ADD: "ADD",
  VIEW: "VIEW",
  VIEW_LIST: "VIEW_LIST",
  EDIT: "EDIT",
  DELETE: "DELETE",
  APPROVE: "APPROVE",
  ASSIGN: 'ASSIGN',
  GENERATE: 'GENERATE',
};

export const DEF_COMPONENTS = {
    
    AG_INTER_PROVINCE_AREA:'AG_INTER_PROVINCE_AREA',
    AG_PROVINCIAL_AREA:'AG_PROVINCIAL_AREA',
    AI_REGION:'AI_REGION',
    ACTION:'ACTION',
    ADMINISTRATIVE_DIVISION:'ADMINISTRATIVE_DIVISION',
    ADMINISTRATIVE_DIVISION_VALUE:'ADMINISTRATIVE_DIVISION_VALUE',
    AEZ_SOIL_TYPE:'AEZ_SOIL_TYPE',
    AGRICULTURE_SEASON:'AGRICULTURE_SEASON',
    AGRO_ECOLOGICAL_ZONE:'AGRO_ECOLOGICAL_ZONE',
    APP_SERVICE:'APP_SERVICE',
    ARPA:'ARPA',
    ARPA_GN:'ARPA_GN',
    ASC_DIVISION:'ASC_DIVISION',
    AUDIT:'AUDIT',
    AUDIT_ITEM:'AUDIT_ITEM',
    BASIC_ASSESSMENT:'BASIC_ASSESSMENT',
    BASIC_ASSESSMENT_ANSWER:'BASIC_ASSESSMENT_ANSWER',
    BI_WEEK_CROP_CATEGORY_REPORT:'BI_WEEK_CROP_CATEGORY_REPORT',
    BI_WEEK_CROP_REPORT:'BI_WEEK_CROP_REPORT',
    BI_WEEK_DAMAGE_EXTENT:'BI_WEEK_DAMAGE_EXTENT',
    BI_WEEK_DATA:'BI_WEEK_DATA',
    BI_WEEK_REPORT:'BI_WEEK_REPORT',
    BI_WEEK_VARIETY_REPORT:'BI_WEEK_VARIETY_REPORT',
    COMPONENT:'COMPONENT',
    CROP:'CROP',
    CROP_AREA:'CROP_AREA',
    CROP_ARG:'CROP_ARG',
    CROP_CATEGORY:'CROP_CATEGORY',
    CROP_CATEGORY_TARGET:'CROP_CATEGORY_TARGET',
    CROP_CULTIVATION:'CROP_CULTIVATION',
    CROP_DAMAGE_FORECAST:'CROP_DAMAGE_FORECAST',
    CROP_EXTENT:'CROP_EXTENT',
    CROP_FILE_RESOURCE:'CROP_FILE_RESOURCE',
    CROP_LOOK_SEASON:'CROP_LOOK_SEASON',
    CROP_PLAN:'CROP_PLAN',
    CROP_PLAN_ACTIVITY:'CROP_PLAN_ACTIVITY',
    CROP_PLAN_ACTIVITY_OPERATION:'CROP_PLAN_ACTIVITY_OPERATION',
    CROP_PLAN_COMMENT:'CROP_PLAN_COMMENT',
    CROP_REGISTRATION:'CROP_REGISTRATION',
    CROP_REGISTRATION_ITEM:'CROP_REGISTRATION_ITEM',
    CROP_SUB_CATEGORY:'CROP_SUB_CATEGORY',
    CROP_TARGET:'CROP_TARGET',
    SEASONAL_CROP_TARGET: 'SEASONAL_CROP_TARGET',
    CROP_VARIETY:'CROP_VARIETY',
    CROP_ACTIVITY:'CROP_ACTIVITY',
    CROP_CALENDAR:'CROP_CALENDAR',
    CROP_PEST:'CROP_PEST',
    CROP_DISEASE:'CROP_DISEASE',
    DAMAGE_CATEGORY:'DAMAGE_CATEGORY',
    DAMAGE_REPORTING:'DAMAGE_REPORTING',
    DAMAGE_TYPE:'DAMAGE_TYPE',
    DESIGNATION:'DESIGNATION',
    DIRECTOR_DOA:'DIRECTOR_DOA',
    DISTRICT:'DISTRICT',
    DISTRICT_COMMISSIONER_LEVEL:'DISTRICT_COMMISSIONER_LEVEL',
    DO_AGRARIAN_DEVELOPMENT:'DO_AGRARIAN_DEVELOPMENT',
    DS_DIVISION:'DS_DIVISION',
    EXTERNAL_AUDIT:'EXTERNAL_AUDIT',
    EXTERNAL_AUDIT_ANSWER:'EXTERNAL_AUDIT_ANSWER',
    EXTERNAL_AUDIT_PROOF_DOC:'EXTERNAL_AUDIT_PROOF_DOC',
    FARM_BUSINESS:'FARM_BUSINESS',
    FARM_LAND:'FARM_LAND',
    FARM_LAND_MAP_COORDINATE:'FARM_LAND_MAP_COORDINATE',
    FARM_LAND_OWNERSHIP:'FARM_LAND_OWNERSHIP',
    FARM_LAND_SOIL_TYPE:'FARM_LAND_SOIL_TYPE',
    FARMER:'FARMER',
    GAP_CERTIFICATE_REQUEST:'GAP_CERTIFICATE_REQUEST',
    GAP_REQUEST:'GAP_REQUEST',
    GN_DIVISION:'GN_DIVISION',
    INSTITUTION:'INSTITUTION',
    INSTITUTION_CATEGORY:'INSTITUTION_CATEGORY',
    INTER_PROVINCE_DEPUTY_DIRECTOR_LEVEL:'INTER_PROVINCE_DEPUTY_DIRECTOR_LEVEL',
    INTER_PROVINCIAL_ADA_SEGMENT:'INTER_PROVINCIAL_ADA_SEGMENT',
    INTERNAL_AUDIT:'INTERNAL_AUDIT',
    INTERNAL_AUDIT_ANSWER:'INTERNAL_AUDIT_ANSWER',
    INTERNAL_AUDIT_PROOF_DOC:'INTERNAL_AUDIT_PROOF_DOC',
    LAND:'LAND',
    MAHAWELI_AUTHORITY:'MAHAWELI_AUTHORITY',
    MAHAWELI_BLOCK:'MAHAWELI_BLOCK',
    MAHAWELI_SYSTEM:'MAHAWELI_SYSTEM',
    MAHAWELI_UNIT:'MAHAWELI_UNIT',
    MERCHANT:'MERCHANT',
    PERMISSION:'PERMISSION',
    PERSON:'PERSON',
    PERSON_CONTACT:'PERSON_CONTACT',
    PROTECTED_HOUSE_TYPE:'PROTECTED_HOUSE_TYPE',
    PROVINCE:'PROVINCE',
    PROVINCIAL_ADA_SEGMENT:'PROVINCIAL_ADA_SEGMENT',
    PROVINCIAL_DEPUTY_DIRECTOR_LEVEL:'PROVINCIAL_DEPUTY_DIRECTOR_LEVEL',
    PROVINCIAL_DIRECTOR_LEVEL:'PROVINCIAL_DIRECTOR_LEVEL',
    QUESTION:'QUESTION',
    QUESTIONS_FORM_TEMPLATE:'QUESTIONS_FORM_TEMPLATE',
    RESEARCH_ARTICLE:'RESEARCH_ARTICLE',
    RESEARCH_ATTACHMENT:'RESEARCH_ATTACHMENT',
    RESEARCH_COMMENT:'RESEARCH_COMMENT',
    ROLE:'ROLE',
    ROLE_PERMISSION:'ROLE_PERMISSION',
    SEASON:'SEASON',
    SELF_ASSESSMENT:'SELF_ASSESSMENT',
    SELF_ASSESSMENT_ANSWER:'SELF_ASSESSMENT_ANSWER',
    SOIL_SAMPLE:'SOIL_SAMPLE',
    SOIL_SUB_TYPE:'SOIL_SUB_TYPE',
    SOIL_TYPE:'SOIL_TYPE',
    TARGET_CROP_EXTENT:'TARGET_CROP_EXTENT',
    TARGET_EXTENT:'TARGET_EXTENT',
    TARGET_SEASONAL_REGION:'TARGET_SEASONAL_REGION',
    TEMP_FARMER:'TEMP_FARMER',
    TEMP_FARMER_BUSINESS:'TEMP_FARMER_BUSINESS',
    TEMP_FARMER_BUSINESS_BRANCH:'TEMP_FARMER_BUSINESS_BRANCH',
    USER:'USER',
    USER_ACCESS_LOG:'USER_ACCESS_LOG',
    USER_APP_SERVICE:'USER_APP_SERVICE',
    USER_FAVORITE_CROP:'USER_FAVORITE_CROP',
    USER_ROLE:'USER_ROLE',
    USER_TYPE:'USER_TYPE',
    VARIETY_TARGET:'VARIETY_TARGET',
    WATER_SAMPLE:'WATER_SAMPLE',
    SELF_ASSESSMENT_FORM:'SELF_ASSESSMENT_FORM',
    BASIC_ASSESSMENT_FORM:'BASIC_ASSESSMENT_FORM',
    INTERNAL_AUDIT_FORM:'INTERNAL_AUDIT_FORM',
    EXTERNAL_AUDIT_FORM:'EXTERNAL_AUDIT_FORM',
    CROP_LOOK_CROP_CONFIGURATION: 'CROP_LOOK_CROP_CONFIGURATION',
    AGGREGATE_BI_WEEK_REPORT: 'AGGREGATE_BI_WEEK_REPORT',
    AGGREGATE_BI_WEEK_REPORT_DD_LEVEL: 'AGGREGATE_BI_WEEK_REPORT_DD_LEVEL',
    AGGREGATE_BI_WEEK_REPORT_AI_LEVEL:'AGGREGATE_BI_WEEK_REPORT_AI_LEVEL',
    AGGREGATE_BI_WEEK_REPORT_ADA_LEVEL: 'AGGREGATE_BI_WEEK_REPORT_ADA_LEVEL',
    AGGREGATE_BI_WEEK_REPORT_AIByCrop_LEVEL: 'AGGREGATE_BI_WEEK_REPORT_AIByCrop_LEVEL',
    MAP: 'MAP',
    PRIVATE_COMPANY: 'PRIVATE_COMPANY',
    SELF_ASSESSMENT_TEMPLATE: 'SELF_ASSESSMENT_TEMPLATE',
    BASIC_ASSESSMENT_TEMPLATE: 'BASIC_ASSESSMENT_TEMPLATE',
    INTERNAL_AUDIT_TEMPLATE: 'INTERNAL_AUDIT_TEMPLATE',
    EXTERNAL_AUDIT_TEMPLATE: 'EXTERNAL_AUDIT_TEMPLATE',
    GAP_BY_DD: 'GAP_BY_DD',
    EXTERNAL_AUDITORS: 'EXTERNAL_AUDITORS',
    GAP_CERTIFICATE: 'GAP_CERTIFICATE',
    AGRICULTURE_POST:'AGRICULTURE_POST',
    AGRICULTURE_PROJECT:'AGRICULTURE_PROJECT',
    SCS_REGION: 'SCS_REGION',
    SCS_SERVICE: 'SCS_SERVICE',
    GAP_BY_SCS: 'GAP_BY_SCS',
    GAP_BY_MAIN_SCS: 'GAP_BY_MAIN_SCS',
    COMMODITY_GROUP:'COMMODITY_GROUP',
    GAP_BY_AI: 'GAP_BY_AI',
    COMMODITY_ITEM:'COMMODITY_ITEM',
    ECONOMIC_CENTER:'ECONOMIC_CENTER',
    EARLY_WARNING_RANGES:'EARLY_WARNING_RANGES',
    VEGITABLE_EARLY_WARNING_RANGES:'VEGITABLE_EARLY_WARNING_RANGES',
    CROP_LOOK_BY_ADA: 'CROP_LOOK_BY_ADA',
    CROP_LOOK_BY_DD: 'CROP_LOOK_BY_DD',
    LATEST_PRODUCER_PRICE:'LATEST_PRODUCER_PRICE',
    ISO_UNIT: 'ISO_UNIT',
    PROJECT_ACTIVITY: 'PROJECT_ACTIVITY',
    PROJECT_SUB_ACTIVITY: 'PROJECT_SUB_ACTIVITY',
    INDICATOR: 'INDICATOR',
    PROJECT_REPORT: 'PROJECT_REPORT',
    INDICATIVE_CROP_SETTINGS: 'INDICATIVE_CROP_SETTINGS',
    INDICATIVE_DD_SUMMARY: 'INDICATIVE_DD_SUMMARY',
    INDICATIVE_AI_SUMMARY: 'INDICATIVE_AI_SUMMARY',
    VEGETABLE_EARLY_WARNING: 'VEGETABLE_EARLY_WARNING',
}