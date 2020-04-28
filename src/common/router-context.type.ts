// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36161

import * as Router from '@koa/router';
import { DefaultState, Context, ParameterizedContext } from 'koa';

export type TRouterContext = ParameterizedContext<
  DefaultState,
  Context & Router.RouterParamContext<DefaultState, Context>
>;
