import React, {ElementType, ReactNode, useCallback} from 'react';
import {Paper, Typography, Grid, Select, MenuItem, CircularProgress} from '@mui/material';
import classNames from 'classnames';

import Button from '@infomat/uikit/src/Button/Button';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import {Icon, IconSize, IconType, IconColor} from '@infomat/uikit/src/Icon';

import style from './PageListIteration.module.scss';

const itemsLimit = [10, 20, 30, 40, 50];

const PageListIteration = ({
	children,
	labelAdd = 'Добавить',
	addLink,
	chengeSearch,
	onLoadPage,
	currentPageNumber = 1,
	numberPages = 1,
	isEmptyList = false,
	labelEmptyList = 'У вас пока нет опубликованных объектов :(',
	changeValueLimit,
	valueLimit = itemsLimit[0],
	isLoading,
	FilterComponent,
}: TPageListIterationProps) => {
	const decrementFullPage = useCallback(() => {
		onLoadPage && onLoadPage(1);
	}, [onLoadPage]);

	const incrementFullPage = useCallback(() => {
		onLoadPage && onLoadPage(numberPages);
	}, [onLoadPage, numberPages]);

	const decrementPage = useCallback(() => {
		onLoadPage && onLoadPage(currentPageNumber - 1);
	}, [onLoadPage, currentPageNumber]);

	const incrementPage = useCallback(() => {
		onLoadPage && onLoadPage(currentPageNumber + 1);
	}, [onLoadPage, currentPageNumber]);

	const onChangeValueLimit = useCallback(
		(value: number) => {
			changeValueLimit && changeValueLimit(value);
		},
		[changeValueLimit],
	);

	const isShowFooter = !isEmptyList && changeValueLimit && onLoadPage;

	return (
		<Paper classes={{root: classNames(style.container, {[style.isShowFooter]: isShowFooter})}}>
			<Grid container className={style.header} spacing={3} direction="row">
				{chengeSearch && (
					<Grid item xs={12} md={8} className={style.input}>
						<TextField onChange={(e) => chengeSearch(e.target.value)} className={style.search} />
						<Icon
							className={style.searchIcon}
							type={IconType.search}
							color={IconColor.lightgrey}
							size={IconSize.small}
						/>
					</Grid>
				)}
				<Grid item container xs={12} md={4} justifyContent="flex-end">
					{addLink && (
						<Button startIconType={IconType.add} iconSize={IconSize.small} variant="contained" component={addLink}>
							{labelAdd}
						</Button>
					)}
				</Grid>
			</Grid>
			{FilterComponent}
			{isLoading && (
				<div className={style.boxEmpty}>
					<CircularProgress size={38} />
				</div>
			)}
			{isEmptyList && !isLoading && (
				<div className={style.boxEmpty}>
					<Typography>{labelEmptyList}</Typography>
				</div>
			)}
			{!isEmptyList && !isLoading && (
				<div className={style.content}>
					{children}
					{isShowFooter && (
						<div className={style.footer}>
							<Typography className={style.footerTitle}>Строк на странице</Typography>

							<Select
								value={valueLimit}
								onChange={(e) => onChangeValueLimit(Number(e.target.value))}
								className={style.select}
							>
								{itemsLimit.map((item, index) => (
									<MenuItem key={index} value={item} classes={{root: style.itemMenu}}>
										<Typography className={style.itemMenuLabel}>{item}</Typography>
									</MenuItem>
								))}
							</Select>

							<Typography className={style.footerLimit}>{`Страница ${currentPageNumber} из ${numberPages}`}</Typography>

							<Button
								variant="outlined"
								className={style.buttonIteration}
								disabled={currentPageNumber <= 1}
								iconType={IconType.iterationDLeft}
								onClick={decrementFullPage}
							/>
							<Button
								variant="outlined"
								className={style.buttonIteration}
								disabled={currentPageNumber <= 1}
								iconType={IconType.iterationLeft}
								onClick={decrementPage}
							/>
							<Button
								variant="outlined"
								className={style.buttonIteration}
								disabled={currentPageNumber >= numberPages}
								iconType={IconType.iterationRight}
								onClick={incrementPage}
							/>
							<Button
								variant="outlined"
								className={style.buttonIteration}
								disabled={currentPageNumber >= numberPages}
								iconType={IconType.iterationDRight}
								onClick={incrementFullPage}
							/>
						</div>
					)}
				</div>
			)}
		</Paper>
	);
};

type TPageListIterationProps = {
	children?: ReactNode;
	labelAdd?: string;
	addLink?: ElementType;
	chengeSearch?: PropertyHandler<string>;
	isEmptyList?: boolean;
	labelEmptyList?: string;
	currentPageNumber?: number;
	numberPages?: number;
	onLoadPage?: PropertyHandler<number>;
	changeValueLimit?: PropertyHandler<number>;
	valueLimit?: number;
	isLoading?: boolean;
	FilterComponent?: ReactNode;
};

export default PageListIteration;
