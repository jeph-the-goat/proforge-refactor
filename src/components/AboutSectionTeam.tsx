import styles from "@/styles/AboutSectionTeam.module.scss"
import {IcnUsers} from "@assets/icons";
import React from 'react';
import {clsx} from "clsx";
import {Avatar, Section} from "@/components/common";
import {AboutTeamMembers} from "@/utils/aboutData";

export const AboutSectionTeam = () => {
  return (
    <Section
      extraClassName={clsx(styles.cAboutSectionTeam, "c-about-section-team")}
      leadIcon={<IcnUsers/>}
      leadText="Meet the team"
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

            <p className="h6">
              {member.name}
            </p>

            <p>{member.role}</p>

          </article>
        ))}

      </div>

    </Section>
  );
};
