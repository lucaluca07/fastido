import React from 'react';
import PageFailed from '@/components/failed-page';

interface IProps {
  children: React.ReactNode;
}
interface IState {
  hasError: boolean;
}

interface Error {
  stack?: string;
}

export default class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {}

  componentWillUnmount() {
    this.setState = () => {};
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return <PageFailed msg="加载失败，请点击重试" />;
    }
    return children;
  }
}
