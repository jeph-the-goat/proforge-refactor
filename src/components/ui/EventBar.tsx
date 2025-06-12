import {clsx} from "clsx";

interface EventBarProps {
  infoText: string;
  linkText: string;
  linkHref: string;
}

export const EventBar = ({infoText, linkText, linkHref}: EventBarProps) => {
  return (
    <aside className={clsx("c-event-bar")}>
        <div className="c-event-bar-users">
          <Avatar image="/avatars/avatar1.svg" size="sm" alt="avatar" />
          <Avatar image="/avatars/avatar2.svg" size="sm" alt="avatar" />
          <Avatar image="/avatars/avatar3.svg" size="sm" alt="avatar" />
          <div className="c-event-bar-users-count">+10</div>
        </div>

        <span className="c-event-bar-title">
          {infoText}
        </span>

        <ButtonLink
          href={linkHref}
          btnText={linkText}
        />

    </aside>
  )
}
