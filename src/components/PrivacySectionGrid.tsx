import React from 'react';

import {LegalSectionGrid} from "@/components";

import {PrivacyPolicySections} from "@/utils";

export const PrivacySectionGrid = () => {
  return (
    <LegalSectionGrid data={PrivacyPolicySections}/>
  );
};
