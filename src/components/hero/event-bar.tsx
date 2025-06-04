import LinkedButton from '../ui/LinkedButton';
import Avatar from '../ui/Avatar';



export type EventBarProps = {
  infoText: string;
  linkText: string;
  linkHref: string;
}

const EventBar = ({infoText, linkText, linkHref}: EventBarProps) => {
  return (
    <div className="flex flex-row items-center justify-center bg-[rgba(153,160,174,0.10)] rounded-xl px-4 py-2 gap-4">
        {/* Avatars */}
        <div className="flex flex-row items-center -space-x-3">
          <Avatar image="/avatars/avatar1.svg" size="sm" alt="avatar" />
          <Avatar image="/avatars/avatar2.svg" size="sm" alt="avatar" />
          <Avatar image="/avatars/avatar3.svg" size="sm" alt="avatar" />
          <div className="w-7 h-7 rounded-full relative bg-white flex items-center justify-center text-xs font-semibold text-neutral-950 border-2 border-white">+10</div>
        </div>
        {/* Info Text */}
        <span className="text-[14px] leading-[24px] font-normal text-[#99a0ae] tracking-[-0.28px] ml-3">{infoText}</span>
        {/* Link Button */}
        <LinkedButton variant="white" size="small" className="ml-3 font-medium" href={linkHref}>{linkText}</LinkedButton>
    </div>
  )
}

export default EventBar;