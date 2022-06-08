import "./Table.scss";

interface TableProps {
  data: any[];
  tableHeaders?: string[];
  tableName: string;
  subTableName?: string;
}

export function Table({
  data,
  tableHeaders,
  tableName,
  subTableName,
}: TableProps) {
  return (
    <>
      {data &&
        data.length > 0 &&
        (subTableName ? (
          <h1 className="table__title">{subTableName}:</h1>
        ) : (
          <h1 className="table__title">{tableName}:</h1>
        ))}
      <table className="table">
        {data && data.length > 0 && (
          <>
            <thead>
              <tr className="table__title-row">
                {tableHeaders
                  ? tableHeaders.map((item) => (
                      <th className="table__title-row-item">
                        {item.toUpperCase()}
                      </th>
                    ))
                  : Object.keys(data[0]).map((key) => (
                      <th className="table__title-row-item">
                        {key.toUpperCase()}
                      </th>
                    ))}
              </tr>
            </thead>
            <tbody>
              {data.map((entity) => {
                const fields = Object.keys(entity);
                return (
                  <tr className="table__row">
                    {fields.map((field) => {
                      let value: any = entity[field];
                      if (value === null) {
                        value = "";
                      } else if (typeof value === "object") {
                        while (typeof value === "object") {
                          value = value?.title
                            ? value.title
                            : value?.lastName
                            ? value.lastName
                            : value?.company
                            ? value.company
                            : value?.name
                            ? value.name
                            : value?.address
                            ? value.address
                            : value?.value
                            ? value.value
                            : value?.trainer
                            ? value.trainer
                            : value?.sport
                            ? value.sport
                            : "object";
                        }
                      } else if (typeof value === "boolean") {
                        value = value ? "Да" : "Нет";
                      }

                      if (field === "period") {
                        console.log(field);
                        value = value.slice(0, 10);
                      }

                      return <td className="table__ceil">{value}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </>
        )}
      </table>
    </>
  );
}
