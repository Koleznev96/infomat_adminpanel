import React, {ReactNode} from 'react';
import renderer, {TestRendererOptions} from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

const renderWithRouter = (children: ReactNode, options?: TestRendererOptions) =>
	renderer.create(<BrowserRouter>{children}</BrowserRouter>, options);

export default renderWithRouter;
