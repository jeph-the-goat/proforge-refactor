import React from 'react';

import {CookiePolicySections} from "@/utils";

import {LegalSectionGrid} from "@/components";

export const SecuritySectionGrid = () => {
  return (
    <LegalSectionGrid
      data={CookiePolicySections}
    />
  );
};
