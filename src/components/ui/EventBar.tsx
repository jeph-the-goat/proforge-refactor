import styles from "@/styles/EventBar.module.scss";
import {IcnChevronRight} from "@assets/icons";

import {clsx} from "clsx";
import {Avatar, ButtonLink} from "@/components";

interface User {
  id: string;
  avatar: string;
  userName?: string;
}

interface EventBarProps {
  text: string;
  linkUrl: string;
  linkText: string;
  users: User[];
}

export const EventBar = ({
  text,
  linkUrl,
  linkText,
  users
}: EventBarProps) => {
  const displayedUsers = users.slice(0, 3);
  const remainingCount = users.length - 3;

  return (
    <aside className={clsx(styles.cEventBar,"c-event-bar")}>
      <div className="c-event-bar-users">
        {displayedUsers.map((user) => (
          <Avatar
            key={user.id}
            image={user.avatar}
            size="xs"
            alt={user.userName || "user-avatar"}
          />
        ))}
        {remainingCount > 0 && (
          <div className="c-event-bar-users-count">
            <span>+{remainingCount}</span>
          </div>
        )}
      </div>

      <p className="c-event-bar-title">
        {text}
      </p>

      <ButtonLink
        href={linkUrl}
        btnText={linkText}
        btnVariant="link"
        icon={<IcnChevronRight/>}
      />
    </aside>
  );
};