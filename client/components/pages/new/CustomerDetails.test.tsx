import { render, screen } from "@testing-library/react";
import moment from "moment";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../../../../app/store";
import { dateFormat } from "../../../../features/customerPlan/customerPlanSlice";
import CustomerDetails from "./CustomerDetails";

describe("CustomerDetails", () => {
  beforeEach(() => {
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
          startDate: moment().toDate(),
          endDate: moment().toDate(),
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
    render(
      <ReduxProvider store={store}>
        <CustomerDetails />
      </ReduxProvider>
    );
    // Age
    expect(screen.getByRole("spinbutton")).toHaveValue("18");
    // Starting date
    expect(screen.getByTestId("starting-date")).toHaveValue(
      moment().add(1, "day").format(dateFormat)
    );
    // Ending date
    expect(screen.getByTestId("ending-date")).toHaveValue(
      moment().add(1, "month").format(dateFormat)
    );
  });
});
