import { render, screen } from "@testing-library/react";
import Home from "./Home";
import '@testing-library/jest-dom';

describe("Home", () => {
    test("renders heading", async () => {
        render(<Home />);
        expect(screen.getByRole("heading", { name: "Home" })).toBeInTheDocument();
    });
});