import { Route, Switch } from "react-router-dom";
import "./App.css";
import Dangki from "./pages/CDW/Dangki";
import DanhSach from "./pages/CDW/DanhSach";
import ThanhCong from "./pages/CDW/ThanhCong";
import ThanhVien from "./pages/CDW/ThanhVien";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/dangki" component={Dangki} exact />
        <Route path="/thanhvien/:email" component={ThanhVien} exact />
        <Route
          path="/thanhcong"
          render={(props) => <ThanhCong {...props} />}
          exact
        />
        <Route path="/" component={DanhSach} />
      </Switch>
    </div>
  );
}

export default App;
