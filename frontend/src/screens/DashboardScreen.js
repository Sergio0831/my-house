import { getSummary } from "../api";
import DashboardMenu from "../components/DasboardMenu";
import Chartist from "chartist";

let summary = {};

const DashboardScreen = {
  after_render: () => {
    new Chartist.Line(
      ".ct-chart-line",
      {
        labels: summary.dailyOrders.map((x) => x._id),
        series: [summary.dailyOrders.map((x) => x.sales)],
      },
      {
        low: 0,
        showArea: true,
      }
    );
    new Chartist.Pie(
      ".ct-chart",
      {
        labels: summary.productCategories.map((x) => x._id),
        series: [summary.productCategories.map((x) => x.count)],
      },
      {
        donut: true,
        donutWidth: 60,
        donutSolid: true,
        startAngle: 270,
        showLabel: true,
      }
    );
  },
  render: async () => {
    summary = await getSummary();
    return `
    <div class="dashboard">
      ${DashboardMenu.render({ selected: "dashboard" })}
      <div class="dashboard__content">
        <h1 class="dashboard__title">Dashboard</h1>
        <ul class ="summary">
        <li class="summary__item">
          <div class="summary__title color2">
            <span><i class="fa fa-users"></i>Users</span>
          </div>
          <div class="summary__body">${summary.users[0].numUsers}</div>
        </li>
        <li class="summary__item">
          <div class="summary__title color1">
            <span><i class="fa fa-users"></i>Orders</span>
          </div>
          <div class="summary__body">${summary.orders[0].numOrders}</div>
        </li>
        <li class="summary__item">
          <div class="summary__title color3">
            <span><i class="fa fa-users"></i>Sales</span>
          </div>
          <div class="summary__body">&euro; ${
            summary.orders[0].totalSales
          }</div>
        </li>
        </ul>
        <div class="charts">
          <div class="charts__item">
            <h2>Sales</h2>
            <div class="ct-perfect-fourth ct-chart-line"></div>
          </div>
          <div class="charts__item">
            <h2>Categories</h2>
            <div class="ct-perfect-fourth ct-chart"></div>
          </div>
        </div>
      </div>
    </div>
    `;
  },
};

export default DashboardScreen;
