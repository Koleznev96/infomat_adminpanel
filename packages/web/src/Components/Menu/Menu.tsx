import React from 'react';
import {useLocation} from 'react-router-dom';
import {includes} from 'lodash';

import {IconType} from '@infomat/uikit/src/Icon';
import MenuItemWithIcon from '@infomat/uikit/src/Menu/MenuItemWithIcon/MenuItemWithIcon';

import {Routes} from 'src/Routes/Routes';

import style from './Menu.module.scss';

const Menu = ({hasLoader}: TMenuProps) => {
	const location = useLocation();

	return (
		<div className={style.container}>
			<MenuItemWithIcon
				to={Routes.touristObjects}
				label="Туристские объекты"
				iconType={IconType.mapOutlined}
				selected={includes(location.pathname, Routes.touristObjects)}
			/>
			<div className={style.subContainer}>
				<MenuItemWithIcon
					to={Routes.categoriesObjects}
					label="Категории объектов"
					selected={includes(location.pathname, Routes.categoriesObjects)}
				/>
				<MenuItemWithIcon
					to={Routes.subcategoriesObjects}
					label="Подкатегории объектов"
					selected={includes(location.pathname, Routes.subcategoriesObjects)}
				/>
			</div>
			<MenuItemWithIcon
				to={Routes.touristRoutes}
				label="Туристские маршруты"
				iconType={IconType.route}
				selected={includes(location.pathname, Routes.touristRoutes)}
			/>
			<MenuItemWithIcon
				to={Routes.recommend}
				label="Рекомендуем"
				iconType={IconType.like}
				selected={includes(location.pathname, Routes.recommend)}
			/>
			<MenuItemWithIcon
				to={Routes.events}
				label="Мероприятия"
				iconType={IconType.calendar}
				selected={includes(location.pathname, Routes.events)}
			/>
			<MenuItemWithIcon
				to={Routes.information}
				label="Общая информация"
				iconType={IconType.warningBox}
				selected={includes(location.pathname, Routes.information)}
			/>
		</div>
	);
};

type TMenuProps = {
	className?: string;
	hasLoader?: boolean;
	chatId?: string;
	format?: string;
};

export default Menu;
