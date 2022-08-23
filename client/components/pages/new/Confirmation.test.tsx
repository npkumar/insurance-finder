import { render, screen } from "@testing-library/react";
import moment from "moment";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../../../../app/store";
import { dateFormat } from "../../../../features/customerPlan/customerPlanSlice";
import Confirmation from "./Comfirmation";

describe("Confirmation", () => {
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
        <Confirmation />
      </ReduxProvider>
    );
    // Starting date
    expect(
      screen.getByText(moment().add(1, "day").format(dateFormat))
    ).toBeInTheDocument();
    // Ending date
    expect(
      screen.getByText(moment().add(1, "month").format(dateFormat))
    ).toBeInTheDocument();
    // Age
    expect(screen.getByText(18)).toBeInTheDocument();
    // Base price, total price
    expect(screen.getAllByText("1000円")).toHaveLength(2);
  });
});
