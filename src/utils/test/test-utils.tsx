import { ReactElement } from "react";
import { render } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

interface ProviderProps {
  children: ReactElement;
}

const customRender = (ui: ReactElement) => {
  const AllTheProviders = ({ children }: ProviderProps) => {
    return <>{children}</>;
  };

  return render(ui, { wrapper: AllTheProviders });
};

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { customRender as render, userEvent };
