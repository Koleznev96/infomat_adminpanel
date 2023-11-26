import {Task, Saga, SagaMiddleware} from 'redux-saga';

let sagaRunner: Task;

const startRootSaga = (sagaMiddleware: SagaMiddleware, rootSaga: Saga): Task => {
	const prevSagaRunner = sagaRunner;

	sagaRunner = sagaMiddleware.run(rootSaga);

	module?.hot && prevSagaRunner && prevSagaRunner.cancel();

	return sagaRunner;
};

export default startRootSaga;
