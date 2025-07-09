import React from 'react';

import {TermsConditionsSections} from "@/utils";

import {LegalSectionGrid} from "@/components";

export const TermsSectionGrid = () => {
  return (
    <LegalSectionGrid data={TermsConditionsSections}/>
  );
};
