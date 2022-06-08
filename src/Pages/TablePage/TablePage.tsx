import { Table } from "Components/Table/Table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "utils/request";
import "./TablePage.scss";

export function TablePage() {
  const { tableName, subTableName } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const suphics = subTableName ? "/" + subTableName : "";
    const response = request("/" + tableName!.toLowerCase() + suphics);
    response.then((newData) => setData(newData));
  }, [tableName, subTableName]);

  return (
    <div className="table-page">
      <Table data={data} tableName={tableName!} subTableName={subTableName} />
    </div>
  );
}
