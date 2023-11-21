declare module 'react-https-redirect' {
	import {FC, PropsWithChildren} from 'react';
	const HttpsRedirect: FC<PropsWithChildren<{disabled: boolean}>>;

	export = HttpsRedirect;
}
