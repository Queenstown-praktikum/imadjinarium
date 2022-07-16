/* eslint-disable react/destructuring-assignment */
import React, { ErrorInfo } from 'react';

type Props = {
  onError: (error: Error, errorInfo: ErrorInfo) => void;
  children: React.ReactNode;
  onErrorContent: () => React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.onErrorContent();
    }

    return this.props.children;
  }
}
