# MT Error

## Documentation

[Documentation](https://github.com/MINIMAL-TECHNOLOGY/mt-error)

## Installation

```bash
pnpm add https://github.com/MINIMAL-TECHNOLOGY/mt-error.git
```

## Usage

1. Create file `ErrorBoundary.tsx`:

```tsx
import React from 'react';
import {
  IClient,
  IBaseDetail,
  EventTypes,
  getErrorBoundaryDetail,
} from '@mt/error';

//----------------------------------------------
interface IReactErrorDetail extends IBaseDetail {
  name: string;
  filename: string;
  lineno: string;
  colno: string;
  stack?: string;
  location: string;
}

//----------------------------------------------
interface IErrorBoundaryProps {
  client: IClient;
  FallbackComponent?: React.ReactElement;
  children?: React.ReactNode;
}

//----------------------------------------------
interface IErrorBoundaryState {
  isError: boolean;
}

//----------------------------------------------
export class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  state = { isError: false };

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch(error: Error) {
    const { client } = this.props;

    const details: IReactErrorDetail = getErrorBoundaryDetail({ error });

    const event = client.createEvent<IReactErrorDetail>({
      type: EventTypes.ERROR,
      details,
    });

    client.notify(event);
  }

  render() {
    const { isError } = this.state;
    const { FallbackComponent, children } = this.props;

    if (!isError) {
      return children;
    }

    if (FallbackComponent) {
      return FallbackComponent;
    }

    return <>Something went wrong.</>;
  }
}
```

2. Add into your project:

```jsx
import ReactDOM from "react-dom/client";
import App from "./App";
import { client } from '@/providers';
import { ErrorBoundary } from './ErrorBoundary';
import { MTError } from '@mt/error';

export const client = MTError.getInstance({
  apiKey: 'YOUR_API_KEY',
  projectId: 'YOUR_PROJECT_ID',
  secretKey: 'YOUR_SECRET_KEY',
  endpoint: 'YOUR_ENDPOINT',
  environment: 'YOUR_ENVIRONMENT',
}).client;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <ErrorBoundary client={client}>
    <App />
  </ErrorBoundary>
)
```
