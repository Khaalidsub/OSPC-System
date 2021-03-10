export * from './mongo';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

export const formatError = (error: GraphQLError) => {
  let message = error.message;

  if (
    error.extensions.exception.response &&
    error.extensions.exception.response.message
  ) {
    const errorMsg = error.extensions.exception.response.message;
    // message = typeof errorMsg !== 'string' ? errorMsg.join(' , ') : errorMsg;
    message = errorMsg;
  }
  const graphQLFormattedError: GraphQLFormattedError = {
    message: message,
    path: error.path,
    extensions: {
      status:
        error.extensions.exception.response?.statusCode ||
        error.extensions.status,
    },
  };
  return graphQLFormattedError;
};
