import { render, screen } from "../../utils/test/test-utils";
import App from "../App";

describe("App", () => {
  test("Renders counter", () => {
    render(<App />);
    expect(screen.getByRole("heading")).toHaveTextContent("Vite + React");
    expect(screen.getByRole("button")).toHaveTextContent("count is 0");
  });
});
