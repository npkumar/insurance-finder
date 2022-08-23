import moment from "moment";
import { store } from "../../app/store";
import {
  dateFormat,
  resetState,
  setAge,
  setEndDate,
  setPlan,
  setPrice,
  setStartDate,
  setTotalPrice,
} from "./customerPlanSlice";

describe("customerPlanSlice", () => {
  beforeEach(() => {
    store.dispatch(resetState());
  });

  afterEach(() => {
    store.dispatch(resetState());
  });

  it("setPlan", () => {
    store.dispatch(
      setPlan({
        id: "1",
        title: "title",
        description: "description",
        price: 10,
      })
    );
    const afterStore = store.getState().customerPlan;
    expect(afterStore.plan).toStrictEqual({
      id: "1",
      title: "title",
      description: "description",
      price: 10,
    });
  });

  it("setStartDate", () => {
    const beforeStore = store.getState().customerPlan;
    expect(beforeStore.startDate).toEqual(
      moment().add(1, "day").format(dateFormat)
    );
    expect(beforeStore.endDate).toEqual(
      moment().add(1, "month").format(dateFormat)
    );
    store.dispatch(setStartDate(moment().add(1, "month").toISOString()));
    const afterStore = store.getState().customerPlan;
    expect(afterStore.startDate).toEqual(
      moment().add(1, "month").format(dateFormat)
    );
    expect(afterStore.endDate).toEqual(
      moment().add(2, "month").format(dateFormat)
    );
  });

  it("setEndDate", () => {
    const beforeStore = store.getState().customerPlan;
    expect(beforeStore.endDate).toEqual(
      moment().add(1, "month").format(dateFormat)
    );
    store.dispatch(setEndDate(moment().add(2, "month").toISOString()));
    const afterStore = store.getState().customerPlan;
    expect(afterStore.endDate).toEqual(
      moment().add(2, "month").format(dateFormat)
    );
  });

  it("setAge", () => {
    const beforeStore = store.getState().customerPlan;
    expect(beforeStore.age).toEqual(18);
    store.dispatch(setAge(30));
    const afterStore = store.getState().customerPlan;
    expect(afterStore.age).toEqual(30);
  });

  it("setPrice", () => {
    const beforeStore = store.getState().customerPlan;
    expect(beforeStore.price).toEqual(1000);
    store.dispatch(setPrice(10000));
    const afterStore = store.getState().customerPlan;
    expect(afterStore.price).toEqual(10000);
  });

  it("setTotalPrice", () => {
    const beforeStore = store.getState().customerPlan;
    expect(beforeStore.totalPrice).toEqual(1000);
    store.dispatch(setStartDate(moment().add(1, "month").toISOString()));
    store.dispatch(setEndDate(moment().add(3, "month").toISOString()));
    store.dispatch(setTotalPrice());
    const afterStore = store.getState().customerPlan;
    // 8 weeks * base price of 1000
    expect(afterStore.totalPrice).toEqual(1000 * 8);
  });
});
