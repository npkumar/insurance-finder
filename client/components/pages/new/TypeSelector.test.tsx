import { render, screen, waitFor } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../../../../app/store";
import TypeSelector from "./TypeSelector";

describe("TypeSelector", () => {
  beforeEach(() => {
    jest.mock("../../../../client/api/plan", () => {
      return {
        ...jest.requireActual("../../../../client/api/plan"),
        usePlans: jest.fn().mockReturnValue({
          isLoading: false,
          isError: false,
          isForbidden: false,
          plans: [
            {
              id: "1",
              title: "title",
              description: "description",
              price: 1000,
            },
          ],
        }),
      };
    });

    jest.mock("../../../../app/hooks", () => {
      return {
        ...jest.requireActual("../../../../app/hooks"),
        useCustomerPlanAppSelector: jest.fn().mockReturnValue({
          plan: {
            id: "1",
            title: "title",
            description: "description",
            price: 1000,
          },
          startDate: "",
          endDate: "",
          age: 18,
          price: 1000,
          totalPrice: 1000,
        }),
      };
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render without crashing", async () => {
    await waitFor(() => {
      render(
        <ReduxProvider store={store}>
          <TypeSelector />
        </ReduxProvider>
      );
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });
});
