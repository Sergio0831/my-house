import DashboardMenu from "../components/DasboardMenu";

const DashboardScreen = {
  after_render: () => {},
  render: () => {
    return `
    <div class="dashboard">
      ${DashboardMenu.render({ selected: "dashboard" })}
      <div class="dashboard__content">
        <h1 class="dashboard__title">Dashboard</h1>
        <div>
          Info and Charts will be added here
        </div>
      </div>
    </div>
    `;
  },
};

export default DashboardScreen;
