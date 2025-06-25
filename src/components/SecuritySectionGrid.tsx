import React from 'react';

import {LegalSectionGrid} from "@/components";

import {CookiePolicySections} from "@/utils";

export const SecuritySectionGrid = () => {
  return (
    <LegalSectionGrid data={CookiePolicySections}/>
  );
};
