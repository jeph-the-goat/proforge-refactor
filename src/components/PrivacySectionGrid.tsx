import React from 'react';

import {PrivacyPolicySections} from "@/utils";

import {LegalSectionGrid} from "@/components";

export const PrivacySectionGrid = () => {
  return (
    <LegalSectionGrid data={PrivacyPolicySections}/>
  );
};
