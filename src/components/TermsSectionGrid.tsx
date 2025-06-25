import React from 'react';

import {LegalSectionGrid} from "@/components";

import {TermsConditionsSections} from "@/utils";

export const TermsSectionGrid = () => {
  return (
    <LegalSectionGrid data={TermsConditionsSections}/>
  );
};
