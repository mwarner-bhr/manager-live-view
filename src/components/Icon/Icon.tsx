import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCircleUser,
  faUserGroup,
  faIdBadge,
  faChartPie,
  faFileLines,
  faDollarSign,
  faMagnifyingGlass,
  faInbox,
  faCircleQuestion,
  faGear,
  faPenToSquare,
  faFaceSmile,
  faArrowUpFromBracket,
  faTableCells,
  faFolder,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faChevronUp,
  faArrowDown,
  faTrashCan,
  faFile,
  faFileAudio,
  faImage,
  faCircleInfo,
  faBuilding,
  faMobileScreen,
  faEnvelope,
  faClock,
  faWrench,
  faCalendar,
  faEllipsis,
  faPen,
  faLocationDot,
  faAddressCard,
  faCaretDown,
  faLock,
  faThumbsUp,
  faHeart,
  faSliders,
  faBell,
  faSpa,
  faPalette,
  faDoorOpen,
  faRightToBracket,
  faChartLine,
  faPlane,
  faGraduationCap,
  faShield,
  faCheckCircle,
  faLink,
  faArrowsRotate,
  faWandMagicSparkles,
  faPaperclip,
  faMicrophone,
  faExpand,
  faCompress,
  faDownLeftAndUpRightToCenter,
  faXmark,
  faCircleArrowUp,
  faPaperPlane,
  faEyeSlash,
  faUsers,
  faAlarmClock,
  faChampagneGlasses,
  faCirclePlus,
  faBullseye,
  faBullhorn,
  faClipboard,
  faCompass,
  faEye,
  faTemperatureHalf,
  faStar,
  faCircleXmark,
  faPiggyBank,
  faComputer,
  faPassport,
  faPhone,
  faCircle,
  faCheck,
  faUserLock,
  faUserCheck,
  faBan,
  faAngleLeft,
  faHouse,
  faLaptop,
  faSpinner,
  faArrowLeft,
  faRotateLeft,
  faStopwatch,
  faMugHot,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faCircleUser as faCircleUserRegular,
  faFileLines as faFileLinesRegular,
  faFaceSmile as faFaceSmileRegular,
  faFolder as faFolderRegular,
  faIdBadge as faIdBadgeRegular,
  faCalendar as faCalendarRegular,
  faClock as faClockRegular,
  faCircle as faCircleRegular,
  faCircleQuestion as faCircleQuestionRegular,
} from '@fortawesome/free-regular-svg-icons';
import {
  PanelLeftClose,
  PanelLeftOpen,
  Home,
  UserCircle,
  Users,
  IdCard,
  PieChart,
  FileText,
  CircleDollarSign,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  Grid2x2Plus,
  Inbox,
  Settings,
  CirclePlus,
} from 'lucide-react';

export type IconName =
  | 'home'
  | 'circle-user'
  | 'user-group'
  | 'id-badge'
  | 'chart-pie-simple'
  | 'file-lines'
  | 'circle-dollar'
  | 'arrow-right-from-line'
  | 'arrow-left-from-line'
  | 'magnifying-glass'
  | 'inbox'
  | 'circle-question'
  | 'gear'
  | 'pen-to-square'
  | 'face-smile'
  | 'arrow-up-from-bracket'
  | 'table-cells'
  | 'folder'
  | 'chevron-down'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-up'
  | 'arrow-down-to-line'
  | 'trash-can'
  | 'file'
  | 'file-audio'
  | 'image'
  | 'circle-info'
  | 'building'
  | 'mobile'
  | 'envelope'
  | 'clock'
  | 'wrench'
  | 'calendar'
  | 'linkedin'
  | 'ellipsis'
  | 'pen'
  | 'location-dot'
  | 'address-card'
  | 'caret-down'
  | 'lock'
  | 'thumbs-up'
  | 'heart'
  | 'sliders'
  | 'bell'
  | 'spa'
  | 'palette'
  | 'door-open'
  | 'door-closed'
  | 'chart-line'
  | 'plane'
  | 'graduation-cap'
  | 'shield'
  | 'check-circle'
  | 'link'
  | 'arrows-rotate'
  | 'home-lucide'
  | 'user-circle-lucide'
  | 'users-lucide'
  | 'id-card-lucide'
  | 'pie-chart-lucide'
  | 'file-text-lucide'
  | 'circle-dollar-lucide'
  | 'sun'
  | 'moon'
  | 'zoom-in'
  | 'zoom-out'
  | 'file-export'
  | 'sparkles'
  | 'alarm-clock'
  | 'champagne-glasses'
  | 'paperclip'
  | 'microphone'
  | 'expand'
  | 'compress'
  | 'down-left-and-up-right-to-center'
  | 'xmark'
  | 'circle-arrow-up'
  | 'paper-plane'
  | 'eye-slash'
  | 'users'
  | 'circle-plus'
  | 'circle-plus-lined'
  | 'bullseye'
  | 'bullhorn'
  | 'clipboard'
  | 'compass'
  | 'eye'
  | 'temperature-half'
  | 'star'
  | 'circle-x'
  | 'piggy-bank'
  | 'computer'
  | 'megaphone'
  | 'passport'
  | 'phone'
  | 'circle'
  | 'check'
  | 'grid-2-plus'
  | 'user-lock'
  | 'user-check'
  | 'ban'
  | 'angle-left'
  | 'house'
  | 'laptop'
  | 'house-building'
  | 'house-laptop'
  | 'spinner'
  | 'arrow-left'
  | 'rotate-left'
  | 'stopwatch'
  | 'mug-hot'
  | 'calendar-clock';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  variant?: 'solid' | 'regular';
  style?: React.CSSProperties;
}

const faIconMap = {
  'home': faHome,
  'circle-user': faCircleUser,
  'circle-user-regular': faCircleUserRegular,
  'user-group': faUserGroup,
  'id-badge': faIdBadge,
  'id-badge-regular': faIdBadgeRegular,
  'chart-pie-simple': faChartPie,
  'file-lines': faFileLines,
  'file-lines-regular': faFileLinesRegular,
  'circle-dollar': faDollarSign,
  'magnifying-glass': faMagnifyingGlass,
  'inbox': faInbox,
  'circle-question': faCircleQuestion,
  'circle-question-regular': faCircleQuestionRegular,
  'gear': faGear,
  'pen-to-square': faPenToSquare,
  'face-smile': faFaceSmile,
  'face-smile-regular': faFaceSmileRegular,
  'arrow-up-from-bracket': faArrowUpFromBracket,
  'table-cells': faTableCells,
  'folder': faFolder,
  'folder-regular': faFolderRegular,
  'chevron-down': faChevronDown,
  'chevron-right': faChevronRight,
  'chevron-left': faChevronLeft,
  'chevron-up': faChevronUp,
  'arrow-down-to-line': faArrowDown,
  'trash-can': faTrashCan,
  'file': faFile,
  'file-audio': faFileAudio,
  'image': faImage,
  'circle-info': faCircleInfo,
  'building': faBuilding,
  'mobile': faMobileScreen,
  'envelope': faEnvelope,
  'clock': faClock,
  'stopwatch': faStopwatch,
  'mug-hot': faMugHot,
  'clock-regular': faClockRegular,
  'wrench': faWrench,
  'calendar': faCalendar,
  'calendar-regular': faCalendarRegular,
  'linkedin': faLinkedin,
  'ellipsis': faEllipsis,
  'pen': faPen,
  'location-dot': faLocationDot,
  'address-card': faAddressCard,
  'caret-down': faCaretDown,
  'lock': faLock,
  'thumbs-up': faThumbsUp,
  'heart': faHeart,
  'sliders': faSliders,
  'bell': faBell,
  'spa': faSpa,
  'palette': faPalette,
  'door-open': faDoorOpen,
  'door-closed': faRightToBracket,
  'chart-line': faChartLine,
  'plane': faPlane,
  'graduation-cap': faGraduationCap,
  'shield': faShield,
  'check-circle': faCheckCircle,
  'link': faLink,
  'arrows-rotate': faArrowsRotate,
  'sparkles': faWandMagicSparkles,
  'alarm-clock': faAlarmClock,
  'champagne-glasses': faChampagneGlasses,
  'paperclip': faPaperclip,
  'microphone': faMicrophone,
  'expand': faExpand,
  'compress': faCompress,
  'down-left-and-up-right-to-center': faDownLeftAndUpRightToCenter,
  'xmark': faXmark,
  'circle-arrow-up': faCircleArrowUp,
  'paper-plane': faPaperPlane,
  'eye-slash': faEyeSlash,
  'users': faUsers,
  'circle-plus': faCirclePlus,
  'bullseye': faBullseye,
  'bullhorn': faBullhorn,
  'clipboard': faClipboard,
  'compass': faCompass,
  'eye': faEye,
  'temperature-half': faTemperatureHalf,
  'star': faStar,
  'circle-x': faCircleXmark,
  'piggy-bank': faPiggyBank,
  'computer': faComputer,
  'megaphone': faBullhorn,
  'passport': faPassport,
  'phone': faPhone,
  'circle': faCircle,
  'circle-regular': faCircleRegular,
  'check': faCheck,
  'user-lock': faUserLock,
  'user-check': faUserCheck,
  'ban': faBan,
  'angle-left': faAngleLeft,
  'house': faHouse,
  'laptop': faLaptop,
  'house-building': faBuilding,
  'house-laptop': faLaptop,
  'spinner': faSpinner,
  'arrow-left': faArrowLeft,
  'rotate-left': faRotateLeft,
} as const;

export function Icon({ name, size = 24, className = '', variant = 'solid', style }: IconProps) {
  // Handle Lucide icons (for expand/collapse)
  if (name === 'arrow-right-from-line') {
    return (
      <PanelLeftOpen
        size={size}
        className={className}
        strokeWidth={2.25}
      />
    );
  }

  if (name === 'arrow-left-from-line') {
    return (
      <PanelLeftClose
        size={size}
        className={className}
        strokeWidth={2.25}
      />
    );
  }

  // Handle Lucide nav icons
  if (name === 'home-lucide') {
    return <Home size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'user-circle-lucide') {
    return <UserCircle size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'users-lucide') {
    return <Users size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'id-card-lucide') {
    return <IdCard size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'pie-chart-lucide') {
    return <PieChart size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'file-text-lucide') {
    return <FileText size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'circle-dollar-lucide') {
    return <CircleDollarSign size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'sun') {
    return <Sun size={size} className={className} strokeWidth={2.25} />;
  }

  if (name === 'moon') {
    return <Moon size={size} className={className} strokeWidth={2.25} />;
  }

  if (name === 'zoom-in') {
    return <ZoomIn size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'zoom-out') {
    return <ZoomOut size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'file-export') {
    // Use arrow-up-from-bracket as export icon
    return <FontAwesomeIcon icon={faArrowUpFromBracket} fontSize={size} className={className} />;
  }

  if (name === 'grid-2-plus') {
    return <Grid2x2Plus size={size} className={className} strokeWidth={2.5} style={style} />;
  }

  if (name === 'circle-plus-lined') {
    return <CirclePlus size={size} className={className} strokeWidth={1.5} style={style} />;
  }

  if (name === 'calendar-clock') {
    if (variant === 'solid') {
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          width={size}
          height={size}
          className={className}
          style={style}
          fill="currentColor"
        >
          <path d="M7 2.75a.75.75 0 0 1 .75.75V5h8.5V3.5a.75.75 0 0 1 1.5 0V5h.75A2.5 2.5 0 0 1 21 7.5v11A2.5 2.5 0 0 1 18.5 21h-13A2.5 2.5 0 0 1 3 18.5v-11A2.5 2.5 0 0 1 5.5 5h.75V3.5A.75.75 0 0 1 7 2.75Zm-2.5 6v9.75c0 .552.448 1 1 1h13a1 1 0 0 0 1-1V8.75h-15Zm12.75 3.5a4.25 4.25 0 1 1 0 8.5 4.25 4.25 0 0 1 0-8.5Zm0 1.5a.75.75 0 0 0-.75.75v1.79c0 .267.142.514.373.648l1.3.75a.75.75 0 0 0 .75-1.299l-.923-.533V14.5a.75.75 0 0 0-.75-.75Z" />
        </svg>
      );
    }

    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={className}
        style={style}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.5" y="5.5" width="17" height="15" rx="3" />
        <path d="M7.5 3.5v4" />
        <path d="M16.5 3.5v4" />
        <path d="M3.5 9.5h17" />
        <circle cx="17.25" cy="16.75" r="3.25" fill="var(--surface-neutral-white, white)" />
        <path d="M17.25 14.95v1.95l1.35.8" />
      </svg>
    );
  }

  // Handle icons that need Lucide for regular variant
  if (name === 'inbox' && variant === 'regular') {
    return <Inbox size={size} className={className} strokeWidth={2.25} style={style} />;
  }

  if (name === 'gear' && variant === 'regular') {
    return <Settings size={size} className={className} strokeWidth={2.25} style={style} />;
  }

  if (name === 'home' && variant === 'regular') {
    return <Home size={size} className={className} strokeWidth={2.25} style={style} />;
  }

  if (name === 'user-group' && variant === 'regular') {
    return <Users size={size} className={className} strokeWidth={2.25} style={style} />;
  }

  if (name === 'chart-pie-simple' && variant === 'regular') {
    return <PieChart size={size} className={className} strokeWidth={2.25} style={style} />;
  }

  // Handle Font Awesome icons
  const iconKey = variant === 'regular' && `${name}-regular` in faIconMap
    ? `${name}-regular` as keyof typeof faIconMap
    : name as keyof typeof faIconMap;

  const icon = faIconMap[iconKey];

  if (!icon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <FontAwesomeIcon
      icon={icon}
      style={{ width: size, height: size, ...style }}
      className={className}
    />
  );
}

export default Icon;
