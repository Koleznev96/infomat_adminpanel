import React, {lazy, Suspense} from 'react';
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

import LoginPage from 'src/Routes/Pages/Desktop/LoginPage';
import ProtectedRoute from 'src/Routes/ProtectedRoute/ProtectedRoute';
import PublicRoute from 'src/Routes/PublicRoute/PublicRoute';
import store from 'src/Redux/store';
import {pageLoader} from 'src/Routes/PageLoaders';
import {EnumRouteSlugs} from 'src/Routes/EnumRouteSlugs';
import BaseChatPage from './Pages/Desktop/BaseChatPage';
import GeneralInformationPage from './Pages/Desktop/GeneralInformationPage/GeneralInformationPage';
import EditEventPage from './Pages/Desktop/EditEventPage/EditEventPage';
import EventsListPage from './Pages/Desktop/EventsListPage/EventsListPage';
import RecommendListPage from './Pages/Desktop/RecommendListPage/RecommendListPage';
import TouristRoutPage from './Pages/Desktop/TouristRoutPage/TouristRoutPage';
import TouristRoutesListPage from './Pages/Desktop/TouristRoutesListPage/TouristRoutesListPage';
import SubcategoryObjectPage from './Pages/Desktop/SubcategoryObjectPage/SubcategoryObjectPage';
import SubcategoryObjectsListPage from './Pages/Desktop/SubcategoryObjectsListPage/SubcategoryObjectsListPage';
import CategoryObjectPage from './Pages/Desktop/CategoryObjectPage/CategoryObjectPage';
import CategoryObjectsListPage from './Pages/Desktop/CategoryObjectsListPage/CategoryObjectsListPage';
import TouristObjectPage from './Pages/Desktop/TouristObjectPage/TouristObjectPage';
import TouristObjectsListPage from './Pages/Desktop/TouristObjectsListPage/TouristObjectsListPage';
import NotFoundPage from './Pages/Common/NotFoundPage';

// const BaseChatPage = lazy(() => import('src/Routes/Pages/Desktop/BaseChatPage'));
// const GeneralInformationPage = lazy(
// 	() => import('src/Routes/Pages/Desktop/GeneralInformationPage/GeneralInformationPage'),
// );
// const EditEventPage = lazy(() => import('src/Routes/Pages/Desktop/EditEventPage/EditEventPage'));
// const CategoryObjectPage = lazy(() => import('src/Routes/Pages/Desktop/CategoryObjectPage/CategoryObjectPage'));
// const SubcategoryObjectPage = lazy(
// 	() => import('src/Routes/Pages/Desktop/SubcategoryObjectPage/SubcategoryObjectPage'),
// );
// const TouristObjectPage = lazy(() => import('src/Routes/Pages/Desktop/TouristObjectPage/TouristObjectPage'));
// const TouristObjectsListPage = lazy(
// 	() => import('src/Routes/Pages/Desktop/TouristObjectsListPage/TouristObjectsListPage'),
// );
// const CategoryObjectsListPage = lazy(
// 	() => import('src/Routes/Pages/Desktop/CategoryObjectsListPage/CategoryObjectsListPage'),
// );
// const SubcategoryObjectsListPage = lazy(
// 	() => import('src/Routes/Pages/Desktop/SubcategoryObjectsListPage/SubcategoryObjectsListPage'),
// );
// const TouristRoutPage = lazy(() => import('src/Routes/Pages/Desktop/TouristRoutPage/TouristRoutPage'));
// const TouristRoutesListPage = lazy(
// 	() => import('src/Routes/Pages/Desktop/TouristRoutesListPage/TouristRoutesListPage'),
// );
// const RecommendListPage = lazy(() => import('src/Routes/Pages/Desktop/RecommendListPage/RecommendListPage'));
// const EventsListPage = lazy(() => import('src/Routes/Pages/Desktop/EventsListPage/EventsListPage'));
// const NotFound = lazy(() => import('src/Routes/Pages/Common/NotFoundPage'));

const RouterDesktop = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<PublicRoute />}>
				<Route index element={<LoginPage />} />
			</Route>
			<Route element={<ProtectedRoute Comp={BaseChatPage} />}>
				<Route
					loader={(args) => pageLoader(store, EnumRouteSlugs.INFORMATION, args)(args)}
					path={EnumRouteSlugs.INFORMATION}
					element={
						<Suspense>
							<GeneralInformationPage />
						</Suspense>
					}
				/>
				<Route
					loader={(args) => pageLoader(store, EnumRouteSlugs.EVENT, args)(args)}
					path={EnumRouteSlugs.EVENT}
					element={
						<Suspense>
							<EditEventPage />
						</Suspense>
					}
				/>
				<Route
					loader={(args) => pageLoader(store, EnumRouteSlugs.EVENTS, args)(args)}
					path={EnumRouteSlugs.EVENTS}
					element={
						<Suspense>
							<EventsListPage />
						</Suspense>
					}
				/>
				<Route
					loader={(args) => pageLoader(store, EnumRouteSlugs.RECOMMEND, args)(args)}
					path={EnumRouteSlugs.RECOMMEND}
					element={
						<Suspense>
							<RecommendListPage />
						</Suspense>
					}
				/>
				<Route
					loader={(args) => pageLoader(store, EnumRouteSlugs.TOURIST_ROUT, args)(args)}
					path={EnumRouteSlugs.TOURIST_ROUT}
					element={
						<Suspense>
							<TouristRoutPage />
						</Suspense>
					}
				/>
				<Route
					loader={(args) => pageLoader(store, EnumRouteSlugs.TOURIST_ROUTES, args)(args)}
					path={EnumRouteSlugs.TOURIST_ROUTES}
					element={
						<Suspense>
							<TouristRoutesListPage />
						</Suspense>
					}
				/>
				<Route
					loader={(args) => pageLoader(store, EnumRouteSlugs.SUBCATEGORY_OBJECT, args)(args)}
					path={EnumRouteSlugs.SUBCATEGORY_OBJECT}
					element={
						<Suspense>
							<SubcategoryObjectPage />
						</Suspense>
					}
				/>
				<Route
					loader={(args) => pageLoader(store, EnumRouteSlugs.SUBCATEGORIES_OBJECTS, args)(args)}
					path={EnumRouteSlugs.SUBCATEGORIES_OBJECTS}
					element={
						<Suspense>
							<SubcategoryObjectsListPage />
						</Suspense>
					}
				/>
				<Route
					loader={(args) => pageLoader(store, EnumRouteSlugs.CATEGORY_OBJECT, args)(args)}
					path={EnumRouteSlugs.CATEGORY_OBJECT}
					element={
						<Suspense>
							<CategoryObjectPage />
						</Suspense>
					}
				/>
				<Route
					loader={(args) => pageLoader(store, EnumRouteSlugs.CATEGORIES_OBJECTS, args)(args)}
					path={EnumRouteSlugs.CATEGORIES_OBJECTS}
					element={
						<Suspense>
							<CategoryObjectsListPage />
						</Suspense>
					}
				/>

				<Route
					loader={(args) => pageLoader(store, EnumRouteSlugs.TOURIST_OBJECT, args)(args)}
					path={EnumRouteSlugs.TOURIST_OBJECT}
					element={
						<Suspense>
							<TouristObjectPage />
						</Suspense>
					}
				/>
				<Route
					loader={(args) => pageLoader(store, EnumRouteSlugs.TOURIST_OBJECTS, args)(args)}
					path={EnumRouteSlugs.TOURIST_OBJECTS}
					element={
						<Suspense>
							<TouristObjectsListPage />
						</Suspense>
					}
				/>
			</Route>

			<Route
				element={
					<Suspense>
						<NotFoundPage />
					</Suspense>
				}
				path="*"
			/>
		</>,
	),
);

export default RouterDesktop;
