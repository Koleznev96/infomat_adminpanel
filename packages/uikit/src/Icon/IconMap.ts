import {
	KeyboardArrowDown,
	KeyboardArrowUpOutlined,
	Logout,
	Add,
	Close,
	KeyboardDoubleArrowLeftOutlined,
	KeyboardDoubleArrowRightOutlined,
	KeyboardArrowLeftOutlined,
	KeyboardArrowRightOutlined,
	CheckCircleRounded,
	Error as ErrorIcon,
	Home,
	Info,
	InsertDriveFile,
	MoreHoriz,
	Refresh,
	Search,
	Visibility,
	VisibilityOff,
	Warning,
	PlaceOutlined,
} from '@mui/icons-material';

import {ReactComponent as MapOutlined} from '@infomat/uikit/src/Assets/Icons/map.svg';
import {ReactComponent as Route} from '@infomat/uikit/src/Assets/Icons/route.svg';
import {ReactComponent as Like} from '@infomat/uikit/src/Assets/Icons/like.svg';
import {ReactComponent as Calendar} from '@infomat/uikit/src/Assets/Icons/calendar.svg';
import {ReactComponent as WarningBox} from '@infomat/uikit/src/Assets/Icons/warning-box.svg';
import {ReactComponent as Ru} from '@infomat/uikit/src/Assets/Icons/ru.svg';
import {ReactComponent as En} from '@infomat/uikit/src/Assets/Icons/en.svg';
import {ReactComponent as Paragraph} from '@infomat/uikit/src/Assets/Icons/paragraph-spacing.svg';
import {ReactComponent as ChevronsDownUp} from '@infomat/uikit/src/Assets/Icons/chevrons-down-up.svg';
import {ReactComponent as Time} from '@infomat/uikit/src/Assets/Icons/time.svg';
import {ReactComponent as Clock} from '@infomat/uikit/src/Assets/Icons/clock.svg';

import {IconType} from '@infomat/uikit/src/Icon/types';

export const iconsMap = {
	// mui
	[IconType.keyboardArrowDown]: KeyboardArrowDown,
	[IconType.keyboardArrowUp]: KeyboardArrowUpOutlined,
	[IconType.keyboardArrowUpOut]: KeyboardArrowUpOutlined,
	[IconType.logout]: Logout,
	[IconType.close]: Close,
	[IconType.add]: Add,
	[IconType.iterationDLeft]: KeyboardDoubleArrowLeftOutlined,
	[IconType.iterationDRight]: KeyboardDoubleArrowRightOutlined,
	[IconType.iterationLeft]: KeyboardArrowLeftOutlined,
	[IconType.iterationRight]: KeyboardArrowRightOutlined,
	[IconType.moreHoriz]: MoreHoriz,
	[IconType.warning]: Warning,
	[IconType.error]: ErrorIcon,
	[IconType.search]: Search,
	[IconType.checkCircleRounded]: CheckCircleRounded,
	[IconType.visibility]: Visibility,
	[IconType.visibilityOff]: VisibilityOff,
	[IconType.info]: Info,
	[IconType.refresh]: Refresh,
	[IconType.home]: Home,
	[IconType.insertDriveFile]: InsertDriveFile,
	// theme
	[IconType.mapOutlined]: MapOutlined,
	[IconType.route]: Route,
	[IconType.like]: Like,
	[IconType.calendar]: Calendar,
	[IconType.warningBox]: WarningBox,
	[IconType.ru]: Ru,
	[IconType.en]: En,
	[IconType.paragraph]: Paragraph,
	[IconType.chevronsDownUp]: ChevronsDownUp,
	[IconType.time]: Time,
	[IconType.object]: PlaceOutlined,
	[IconType.clock]: Clock,
};
