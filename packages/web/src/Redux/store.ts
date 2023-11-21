import 'reflect-metadata';
import {container} from 'tsyringe';
import {Dispatch} from 'redux';

import DIToken from '@infomat/core/src/BusinessLogic/DIToken';
import createStore from '@infomat/core/src/Redux/createStore';

import middleware from 'src/Middleware/middleware';

const store = createStore(middleware);

container.register<Dispatch>(DIToken.reduxDispatch, {useValue: store.dispatch});

export default store;
