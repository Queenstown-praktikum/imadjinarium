import React, { ErrorInfo, FC, ReactNode, useCallback } from 'react';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import { UnexpectedErrorPage } from '../../pages/unexpected-error/unexpected-error';

type Props = {
  children: ReactNode;
};

export const GlobalErrorBoundary: FC<Props> = ({ children }) => {
  const getErrorContent = useCallback(() => <UnexpectedErrorPage />, []);

  // eslint-disable-next-line no-unused-vars
  const handleError = useCallback((_error: Error, _errorInfo: ErrorInfo) => {
    // todo - отправка логов в Sentry
    // eslint-disable-next-line no-console
    console.log('отправка логов в Sentry');
  }, []);

  return (
    <ErrorBoundary onError={handleError} onErrorContent={getErrorContent}>
      {children}
    </ErrorBoundary>
  );
};
