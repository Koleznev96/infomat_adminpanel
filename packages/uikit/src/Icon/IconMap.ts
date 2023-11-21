import {mdiCrown, mdiPin, mdiPinOff} from '@mdi/js';
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
	// MapOutlined,
	////////////
	AddAPhoto,
	AddCircleOutline,
	AddPhotoAlternate,
	ArrowDownward,
	ArrowForwardIosSharp,
	AspectRatio,
	AttachMoney,
	Autorenew,
	Block,
	Cached,
	CallEnd,
	CancelOutlined,
	CancelRounded,
	Check,
	CheckCircleOutline,
	CheckCircleRounded,
	ChevronLeft,
	ChevronRight,
	ConfirmationNumber,
	ConfirmationNumberOutlined,
	ContentCopy,
	Create,
	DeleteOutlined,
	DesktopMac,
	DoneAll,
	Drafts,
	Edit,
	Email,
	Equalizer,
	Error as ErrorIcon,
	ErrorOutline,
	EuroSymbol,
	ExpandLess,
	ExpandMore,
	Face,
	Favorite,
	FavoriteBorder,
	FilterNone,
	FlipCameraIos,
	FolderOutlined,
	Grade,
	GraphicEq,
	Group,
	Hearing,
	Help,
	HelpOutline,
	HighlightOff,
	Home,
	HourglassEmpty,
	Info,
	InfoOutlined,
	InsertDriveFile,
	KeyboardArrowLeft,
	Launch,
	LiveTv,
	LocalOffer,
	Lock,
	LockOpen,
	MeetingRoom,
	Menu,
	Mic,
	MicNone,
	MicOff,
	MoreHoriz,
	MoreVert,
	OndemandVideo,
	OpenInNew,
	Panorama,
	PanoramaOutlined,
	Pause,
	PauseCircleOutline,
	PeopleOutline,
	Percent,
	Person,
	Phone,
	PhoneDisabled,
	PhoneInTalk,
	PhoneLocked,
	PhotoCamera,
	PictureInPicture,
	PlayArrowRounded,
	PlayCircleOutline,
	RadioButtonUncheckedRounded,
	Redeem,
	Refresh,
	RemoveCircle,
	ReportProblem,
	Search,
	Settings,
	ShoppingCart,
	SpeakerNotes,
	Stars,
	Storage,
	SyncAlt,
	TextFields,
	Tune,
	Videocam,
	Visibility,
	VisibilityOff,
	VolumeDown,
	VolumeMute,
	VolumeOff,
	VolumeUp,
	Warning,
	AccessTime,
	Reply,
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
/////////

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
	///////////

	//theme
	[IconType.hearing]: Hearing,
	//mui
	[IconType.dollarSymbol]: AttachMoney,
	[IconType.favorite]: Favorite,
	[IconType.favoriteBorder]: FavoriteBorder,
	[IconType.warning]: Warning,
	[IconType.volumeOff]: VolumeOff,
	[IconType.volumeDown]: VolumeDown,
	[IconType.volumeUp]: VolumeUp,
	[IconType.volumeMute]: VolumeMute,
	[IconType.notes]: SpeakerNotes,
	[IconType.star]: Grade,
	[IconType.person]: Person,
	[IconType.graphicEq]: GraphicEq,
	[IconType.panorama]: Panorama,
	[IconType.panoramaOutlined]: PanoramaOutlined,
	[IconType.stars]: Stars,
	[IconType.ondemandVideo]: OndemandVideo,
	[IconType.shoppingCart]: ShoppingCart,
	[IconType.confirmationNumber]: ConfirmationNumber,
	[IconType.confirmationNumberOutlined]: ConfirmationNumberOutlined,
	[IconType.euroSymbol]: EuroSymbol,
	[IconType.chevronRight]: ChevronRight,
	[IconType.chevronLeft]: ChevronLeft,

	[IconType.moreVert]: MoreVert,
	[IconType.menu]: Menu,
	[IconType.mic]: Mic,
	[IconType.micOff]: MicOff,
	[IconType.micNone]: MicNone,
	[IconType.phone]: Phone,
	[IconType.phoneLocked]: PhoneLocked,
	[IconType.phoneDisabled]: PhoneDisabled,
	[IconType.phoneInTalk]: PhoneInTalk,
	[IconType.callEnd]: CallEnd,
	[IconType.peopleOutline]: PeopleOutline,
	[IconType.group]: Group,
	[IconType.hourglassEmpty]: HourglassEmpty,
	[IconType.openInNew]: OpenInNew,
	[IconType.help]: Help,
	[IconType.helpOutline]: HelpOutline,
	[IconType.autorenew]: Autorenew,
	[IconType.error]: ErrorIcon,
	[IconType.errorOutline]: ErrorOutline,
	[IconType.search]: Search,
	[IconType.addCircleOutline]: AddCircleOutline,
	[IconType.liveTv]: LiveTv,
	[IconType.removeCircle]: RemoveCircle,
	[IconType.cancelOutlined]: CancelOutlined,
	[IconType.cancelRounded]: CancelRounded,
	[IconType.check]: Check,
	[IconType.checkCircleOutline]: CheckCircleOutline,
	[IconType.checkCircleRounded]: CheckCircleRounded,
	[IconType.radioButtonUncheckedRounded]: RadioButtonUncheckedRounded,
	[IconType.localOffer]: LocalOffer,
	[IconType.percent]: Percent,
	[IconType.meetingRoom]: MeetingRoom,
	[IconType.visibility]: Visibility,
	[IconType.visibilityOff]: VisibilityOff,
	[IconType.aspectRatio]: AspectRatio,
	[IconType.face]: Face,
	[IconType.textFields]: TextFields,
	[IconType.block]: Block,
	[IconType.expandMore]: ExpandMore,
	[IconType.expandLess]: ExpandLess,
	[IconType.arrowForward]: ArrowForwardIosSharp,

	[IconType.folderOutlined]: FolderOutlined,
	[IconType.reportProblem]: ReportProblem,
	[IconType.playArrowRounded]: PlayArrowRounded,
	[IconType.playCircleOutline]: PlayCircleOutline,
	[IconType.pauseCircleOutline]: PauseCircleOutline,
	[IconType.pause]: Pause,
	[IconType.drafts]: Drafts,
	[IconType.email]: Email,
	[IconType.desktopMac]: DesktopMac,
	[IconType.highlightOff]: HighlightOff,
	[IconType.deleteOutlined]: DeleteOutlined,
	[IconType.keyboardArrowLeft]: KeyboardArrowLeft,
	[IconType.lock]: Lock,
	[IconType.lockOpen]: LockOpen,
	[IconType.info]: Info,
	[IconType.infoOutlined]: InfoOutlined,
	[IconType.addPhotoAlternate]: AddPhotoAlternate,
	[IconType.arrowDownward]: ArrowDownward,
	[IconType.doneAll]: DoneAll,
	[IconType.refresh]: Refresh,
	[IconType.settings]: Settings,
	[IconType.videoCam]: Videocam,
	[IconType.storage]: Storage,
	[IconType.equalizer]: Equalizer,
	[IconType.home]: Home,
	[IconType.syncAlt]: SyncAlt,
	[IconType.filterNone]: FilterNone,
	[IconType.cached]: Cached,
	[IconType.edit]: Edit,

	[IconType.insertDriveFile]: InsertDriveFile,
	[IconType.addAPhoto]: AddAPhoto,
	[IconType.redeem]: Redeem,
	[IconType.tune]: Tune,
	[IconType.photoCamera]: PhotoCamera,
	[IconType.contentCopy]: ContentCopy,
	[IconType.pictureInPicture]: PictureInPicture,
	[IconType.launch]: Launch,
	[IconType.create]: Create,
	[IconType.time]: AccessTime,
	[IconType.flipCamera]: FlipCameraIos,
	[IconType.reply]: Reply,
	//mdi
	[IconType.pin]: mdiPin,
	[IconType.pinOff]: mdiPinOff,
	[IconType.crown]: mdiCrown,
};
