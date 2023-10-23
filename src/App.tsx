import withDisableRightClick from "./components/hoc/withDisabledRightClick";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return <AppRoutes />;
};

export default withDisableRightClick(App);
