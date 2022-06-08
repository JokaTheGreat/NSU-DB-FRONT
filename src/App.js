import { BrowserRouter, Routes, Route } from "react-router-dom";
import { paths } from "./utils/paths";
import './App.css';
import { Home } from "./Pages/HomePage/Home";
import { TablePage } from "Pages/TablePage/TablePage";
import { WithSidebar } from "Components/Sidebar/WithSidebar";
import { ReportPage } from "Pages/ReportPage/ReportPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WithSidebar />} >
          <Route path={paths.home} element={<Home />}></Route>
          <Route path={"/:tableName"} element={<TablePage />}></Route>
          <Route path={"/report/:tableName/:reportName"} element={<ReportPage />}></Route>
          <Route path={"/:tableName/:subTableName"} element={<TablePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
