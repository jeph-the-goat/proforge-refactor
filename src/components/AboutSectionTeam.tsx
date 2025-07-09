import styles from "@/styles/AboutSectionTeam.module.scss"
import {IcnArrowUpRight, IcnUsers} from "@assets/icons";

import React from 'react';
import {clsx} from "clsx";

import {AboutTeamMembers} from "@/utils";

import {Avatar, ButtonLink, Section} from "@/components";

export const AboutSectionTeam = () => {
  return (
    <Section
      extraClassName={clsx(styles.cAboutSectionTeam, "c-about-section-team")}
      badgeIcon={<IcnUsers/>}
      badgeText="Meet the team"
      headingClass="h3"
      title="The People Behind the Platform"
      paragraph="Our diverse team of experts is united by one vision: to simplify Web3 development."
    >

      <div className="c-about-section-team-grid">

        {AboutTeamMembers.map((member, memberIdx) => (
          <article key={memberIdx} className="c-about-section-team-grid-card">

            <Avatar
              image="https://i.pravatar.cc/150?img=49"
              alt={member.name}
              size="lg"
            />

            <div className="c-about-section-team-grid-card-text">
              <p className="h6">
                {member.name}
              </p>

              <p>{member.role}</p>
            </div>

          </article>
        ))}

        <article className="c-about-section-team-grid-card empty">

          <i className="c-avatar-empty">
            <span className="h6">You</span>
          </i>

          <div className="c-about-section-team-grid-card-text">
            <p className="h6">
              Want to join us?
            </p>

            <ButtonLink
              href="#"
              btnText="See Open Roles"
              btnVariant="link"
              icon={<IcnArrowUpRight/>}
            />


          </div>

        </article>

      </div>

    </Section>
  );
};
