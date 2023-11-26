/* eslint-disable @typescript-eslint/no-explicit-any */
import {Action, ActionCreatorWithPreparedPayload, createAction, PrepareAction} from '@reduxjs/toolkit';
import _ from 'lodash';

export enum EnumActionRole {
	CLIENT_TO_SERVER = 'CLIENT_TO_SERVER',
	CLIENT_ONLY = 'CLIENT_ONLY',
}

abstract class VActions<S extends string, R extends EnumActionRole, DefaultPA extends () => {payload: any}> {
	/** Should be same with Slice.name **/
	abstract readonly scope: S;
	abstract readonly role: R;
	protected abstract readonly defaultPrepareAction: DefaultPA;

	protected getPrepareAction<P = never, M = undefined, E = undefined>(): TIfUndefined<
		M,
		(...args: [undefined] extends [P] ? [payload?: P] : [payload: P]) => {payload: P},
		TIfUndefined<
			E,
			(...args: [undefined] extends [P] ? [payload?: P, meta?: M] : [payload: P, meta?: M]) => {payload: P; meta: M},
			(...args: [undefined] extends [P] ? [payload?: P, meta?: M, error?: E] : [payload: P, meta?: M, error?: E]) => {
				payload: P;
				meta: M;
				error: E;
			}
		>
	> {
		return ((payload: P, meta: M, error: E) => ({payload, meta, error})) as any;
	}

	protected _createAction<
		PA extends TPrepareActionWithMetaErrorAndArgs<any, any, any, any[]> | undefined = undefined,
		T extends string = never,
		TA extends string = never,
	>(
		type: T,
		typeAlias: TA,
		prepareAction?: PA,
	): ActionCreatorWithPreparedPayload<
		TIfUndefined<PA, [], Parameters<Exclude<PA, undefined>>>,
		TIfUndefined<PA, undefined, ReturnType<Exclude<PA, undefined>>['payload']>,
		`${S}/${TA}/${R}`,
		TIfUndefined<
			PA,
			false,
			ReturnType<Exclude<PA, undefined>>['error'] extends unknown ? false : ReturnType<Exclude<PA, undefined>>['error']
		>,
		TIfUndefined<PA, Record<string, never>, ReturnType<Exclude<PA, undefined>>['meta']> &
			TPrepareActionCreatorOptions<T>
	> {
		return createAction(`${this.scope}/${typeAlias}/${this.role}`, ((
			...args: Parameters<TFallback<PA, DefaultPA>>
		): TExtraAction<
			ReturnType<TFallback<PA, DefaultPA>>['payload'],
			TIfUndefined<PA, Record<string, never>, ReturnType<Exclude<PA, undefined>>['meta']>,
			TIfUndefined<PA, false, ReturnType<Exclude<PA, undefined>>['error']>,
			T
		> => {
			const prepared = (prepareAction ?? this.defaultPrepareAction)(...args);

			return {
				payload: prepared.payload,
				error: _.get(prepared, 'error', false),
				meta: {
					..._.get(prepared, 'meta', false),
					role: this.role,
					originalType: type,
					isProcessedAction: true,
				},
			};
		}) as PrepareAction<any>);
	}
}

export abstract class ClientToServerActions<S extends string = string> extends VActions<
	S,
	EnumActionRole.CLIENT_TO_SERVER,
	() => {payload: undefined}
> {
	readonly role = EnumActionRole.CLIENT_TO_SERVER;
	protected readonly defaultPrepareAction = () => ({payload: undefined});

	protected createAction<
		T extends string = never,
		PA extends TPrepareActionWithMetaErrorAndArgs<any, any, any, any[]> | undefined = undefined,
	>(type: T, prepareAction?: PA) {
		return super._createAction(type, type, prepareAction);
	}
}

export abstract class ClientOnlyActions<S extends string = string> extends VActions<
	S,
	EnumActionRole.CLIENT_ONLY,
	() => {payload: undefined}
> {
	readonly role = EnumActionRole.CLIENT_ONLY;
	protected readonly defaultPrepareAction = () => ({payload: undefined});

	protected createAction<
		T extends string = never,
		PA extends TPrepareActionWithMetaErrorAndArgs<any, any, any, any[]> | undefined = undefined,
	>(type: T, prepareAction?: PA) {
		return super._createAction(type, type, prepareAction);
	}
}

type TExtraAction<P, M, E, OT> = {
	payload: P;
	meta: TPrepareActionCreatorOptions<OT> & M;
	error: boolean | E;
};

export type TPrepareActionWithMetaErrorAndArgs<P, M = any, E = any, A extends any[] = any[]> = (...args: A) => {
	payload: P;
	meta?: M;
	error?: E;
};

type TPrepareActionCreatorOptions<OT> = {
	role: EnumActionRole;
	originalType: OT;
	isProcessedAction: boolean;
};

type TIfUndefined<TTest, TTrue, TFalse> = Exclude<TTest, undefined> extends never ? TTrue : TFalse;

type TFallback<PA, DefaultPA> = PA extends undefined ? DefaultPA : PA;

export type TServerMeta<T> = Omit<T, 'commands'>;

export type TAnyActionCreator = ActionCreatorWithPreparedPayload<any[], any, any, any, any>;

export type TAnyAction = Action<any>;
