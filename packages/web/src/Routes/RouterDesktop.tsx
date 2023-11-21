import React, {lazy, Suspense} from 'react';
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';

import LoginPage from 'src/Routes/Pages/Desktop/LoginPage';
import ProtectedRoute from 'src/Routes/ProtectedRoute/ProtectedRoute';
import PublicRoute from 'src/Routes/PublicRoute/PublicRoute';
import store from 'src/Redux/store';
import {bulkPageLoader, pageLoader} from 'src/Routes/PageLoaders';
import {EnumRouteSlugs} from 'src/Routes/EnumRouteSlugs';

const BaseChatPage = lazy(() => import('src/Routes/Pages/Desktop/BaseChatPage'));
const GeneralInformationPage = lazy(
	() => import('src/Routes/Pages/Desktop/GeneralInformationPage/GeneralInformationPage'),
);
const EditEventPage = lazy(() => import('src/Routes/Pages/Desktop/EditEventPage/EditEventPage'));
const CategoryObjectPage = lazy(() => import('src/Routes/Pages/Desktop/CategoryObjectPage/CategoryObjectPage'));
const SubcategoryObjectPage = lazy(
	() => import('src/Routes/Pages/Desktop/SubcategoryObjectPage/SubcategoryObjectPage'),
);
const TouristObjectPage = lazy(() => import('src/Routes/Pages/Desktop/TouristObjectPage/TouristObjectPage'));
const TouristObjectsListPage = lazy(
	() => import('src/Routes/Pages/Desktop/TouristObjectsListPage/TouristObjectsListPage'),
);
const CategoryObjectsListPage = lazy(
	() => import('src/Routes/Pages/Desktop/CategoryObjectsListPage/CategoryObjectsListPage'),
);
const SubcategoryObjectsListPage = lazy(
	() => import('src/Routes/Pages/Desktop/SubcategoryObjectsListPage/SubcategoryObjectsListPage'),
);
const TouristRoutPage = lazy(() => import('src/Routes/Pages/Desktop/TouristRoutPage/TouristRoutPage'));
const TouristRoutesListPage = lazy(
	() => import('src/Routes/Pages/Desktop/TouristRoutesListPage/TouristRoutesListPage'),
);
const RecommendListPage = lazy(() => import('src/Routes/Pages/Desktop/RecommendListPage/RecommendListPage'));
const EventsListPage = lazy(() => import('src/Routes/Pages/Desktop/EventsListPage/EventsListPage'));
const NotFound = lazy(() => import('src/Routes/Pages/Common/NotFoundPage'));

const RouterDesktop = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<PublicRoute />}>
				<Route index element={<LoginPage />} />
			</Route>
			<Route element={<ProtectedRoute Comp={BaseChatPage} />}>
				<Route
					loader={bulkPageLoader(store)}
					path={EnumRouteSlugs.INFORMATION}
					element={
						<Suspense>
							<GeneralInformationPage />
						</Suspense>
					}
				/>
				<Route
					loader={bulkPageLoader(store)}
					path={EnumRouteSlugs.EVENT}
					element={
						<Suspense>
							<EditEventPage />
						</Suspense>
					}
				/>
				<Route
					loader={bulkPageLoader(store)}
					path={EnumRouteSlugs.EVENTS}
					element={
						<Suspense>
							<EventsListPage />
						</Suspense>
					}
				/>
				<Route
					loader={bulkPageLoader(store)}
					path={EnumRouteSlugs.RECOMMEND}
					element={
						<Suspense>
							<RecommendListPage />
						</Suspense>
					}
				/>
				<Route
					loader={bulkPageLoader(store)}
					path={EnumRouteSlugs.TOURIST_ROUT}
					element={
						<Suspense>
							<TouristRoutPage />
						</Suspense>
					}
				/>
				<Route
					loader={bulkPageLoader(store)}
					path={EnumRouteSlugs.TOURIST_ROUTES}
					element={
						<Suspense>
							<TouristRoutesListPage />
						</Suspense>
					}
				/>
				<Route
					loader={bulkPageLoader(store)}
					path={EnumRouteSlugs.SUBCATEGORY_OBJECT}
					element={
						<Suspense>
							<SubcategoryObjectPage />
						</Suspense>
					}
				/>
				<Route
					loader={bulkPageLoader(store)}
					path={EnumRouteSlugs.SUBCATEGORIES_OBJECTS}
					element={
						<Suspense>
							<SubcategoryObjectsListPage />
						</Suspense>
					}
				/>
				<Route
					loader={bulkPageLoader(store)}
					path={EnumRouteSlugs.CATEGORY_OBJECT}
					element={
						<Suspense>
							<CategoryObjectPage />
						</Suspense>
					}
				/>
				<Route
					loader={bulkPageLoader(store)}
					path={EnumRouteSlugs.CATEGORIES_OBJECTS}
					element={
						<Suspense>
							<CategoryObjectsListPage />
						</Suspense>
					}
				/>

				<Route
					loader={bulkPageLoader(store)}
					path={EnumRouteSlugs.TOURIST_OBJECT}
					element={
						<Suspense>
							<TouristObjectPage />
						</Suspense>
					}
				/>
				<Route
					loader={bulkPageLoader(store)}
					path={EnumRouteSlugs.TOURIST_OBJECTS}
					element={
						<Suspense>
							<TouristObjectsListPage />
						</Suspense>
					}
				/>
			</Route>

			<Route element={<NotFound />} path="*" />
		</>,
	),
);

export default RouterDesktop;
