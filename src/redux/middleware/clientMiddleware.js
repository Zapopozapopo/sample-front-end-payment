export default function clientMiddleware(client) {
    return ({dispatch, getState}) => {
        return next => action => {
            if (!action) return; // This should never happen
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }

            const {promise, types, ...rest} = action; // eslint-disable-line no-redeclare
            if (!promise) {
                return next(action);
            }

            const [REQUEST, SUCCESS, FAILURE] = types;

            const actionPromise = promise(client);

            next({...rest, type: REQUEST});

            actionPromise.then(
                (result) => next({...rest, result, type: SUCCESS}),
                (error) => {
                    if (error && error.response && error.response.status === 401) {
                        dispatch(logout());
                    }

                    console.log(error);

                    next({...rest, error, type: FAILURE});
                }
            ).catch((error) => {
                if (error && error.response && error.response.status === 401) {
                    dispatch(logout());
                }

                console.log(error);

                next({...rest, error, type: FAILURE});
            });

            return actionPromise;
        };
    };
}
