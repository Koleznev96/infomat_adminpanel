import React, {ElementType, ReactNode, useCallback, useEffect, useState} from 'react';
import {Paper, Typography, Grid, Select, MenuItem, CircularProgress} from '@mui/material';
import classNames from 'classnames';

import Button from '@infomat/uikit/src/Button/Button';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import TextField from '@infomat/uikit/src/Fields/TextField/TextField';
import {Icon, IconSize, IconType, IconColor} from '@infomat/uikit/src/Icon';

import style from './PageListIteration.module.scss';
import {useDebounced} from '@infomat/core/src/Hooks/useDebounced';

const itemsLimit = [10, 20, 30, 40, 50];

const PageListIteration = ({
	children,
	labelAdd = 'Добавить',
	addLink,
	startCrrentPageNumber = 0,
	numberPages = 1,
	isEmptyList = false,
	labelEmptyList = 'У вас пока нет опубликованных объектов :(',
	startValueLimit = itemsLimit[0],
	isLoading,
	FilterComponent,
	startSearch = '',
	getData,
}: TPageListIterationProps) => {
	const [search, setSearch] = useState(startSearch);
	const [currentPageNumber, setCurrentPageNumber] = useState(startCrrentPageNumber);
	const [valueLimit, setValueLimit] = useState(startValueLimit);

	useEffect(() => {
		setSearch(startSearch)
		setCurrentPageNumber(startCrrentPageNumber)
	}, [startSearch, startCrrentPageNumber])

	const decrementFullPage = useCallback(() => {
		setCurrentPageNumber(0);
		getData({page: 0, search});
	}, [setCurrentPageNumber, getData, currentPageNumber, search]);

	const incrementFullPage = useCallback(() => {
		setCurrentPageNumber(numberPages - 1);
		getData({page: numberPages - 1, search});
	}, [setCurrentPageNumber, getData, currentPageNumber, search, numberPages]);

	const decrementPage = useCallback(() => {
		setCurrentPageNumber(currentPageNumber - 1);
		getData({page: currentPageNumber - 1, search});
	}, [setCurrentPageNumber, getData, currentPageNumber, search]);

	const incrementPage = useCallback(() => {
		setCurrentPageNumber(currentPageNumber + 1);
		getData({page: currentPageNumber + 1, search});
	}, [setCurrentPageNumber, getData, currentPageNumber, search]);

	const onChangeValueLimit = useCallback(
		(value: number) => {
			setValueLimit(value);
			setCurrentPageNumber(0);
			getData({page: 0, search, size: value});
		},
		[setValueLimit, getData, search, setCurrentPageNumber],
	);

	const searchDebounce = useDebounced((value: string) => {
		setCurrentPageNumber(0);
		getData({page: 0, search: value, restFilters: true});
	}, 400);

	const chengeSearch = useCallback(
		(value: string) => {
			setSearch(value);
			searchDebounce(value);
		},
		[setSearch, searchDebounce],
	);

	const isShowFooter = !isEmptyList && getData;

	return (
		<Paper classes={{root: classNames(style.container, {[style.isShowFooter]: isShowFooter})}}>
			<Grid container className={style.header} spacing={3} direction="row">
				{chengeSearch && (
					<Grid item xs={12} md={8} className={style.input}>
						<TextField
							placeholder="Поиск"
							value={search}
							onChange={(e) => chengeSearch(e.target.value)}
							className={style.search}
						/>
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

							<Typography className={style.footerLimit}>{`Страница ${
								currentPageNumber + 1
							} из ${numberPages}`}</Typography>

							<Button
								variant="outlined"
								className={style.buttonIteration}
								disabled={currentPageNumber <= 0}
								iconType={IconType.iterationDLeft}
								onClick={decrementFullPage}
							/>
							<Button
								variant="outlined"
								className={style.buttonIteration}
								disabled={currentPageNumber <= 0}
								iconType={IconType.iterationLeft}
								onClick={decrementPage}
							/>
							<Button
								variant="outlined"
								className={style.buttonIteration}
								disabled={currentPageNumber >= numberPages - 1}
								iconType={IconType.iterationRight}
								onClick={incrementPage}
							/>
							<Button
								variant="outlined"
								className={style.buttonIteration}
								disabled={currentPageNumber >= numberPages - 1}
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
	isEmptyList?: boolean;
	labelEmptyList?: string;
	startCrrentPageNumber?: number;
	numberPages?: number;
	startValueLimit?: number;
	isLoading?: boolean;
	FilterComponent?: ReactNode;
	startSearch?: string;
	getData: PropertyHandler<{page?: number; size?: number; search?: string; restFilters?: boolean}>;
};

export default PageListIteration;
