import { Button } from "Components/Button/Button";
import { Select } from "Components/Select/Select";
import { Table } from "Components/Table/Table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "utils/request";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ReportPage.scss";

function isZeroParam(tableName, reportName) {
  return (
    reportName === "morethanone" ||
    (tableName === "sportclub" && reportName === "byperiod") ||
    (tableName === "athlete" && reportName === "notincompetitionbyperiod") ||
    (tableName === "sponsor" && reportName === "byperiod") ||
    (tableName === "sportsfacility" && reportName === "bycompetitionperiod")
  );
}

function isOneParam(tableName, reportName) {
  return (
    (tableName === "trainer" && reportName === "byathlete") ||
    (tableName === "athlete" && reportName === "bycompetition") ||
    (tableName === "competition" && reportName === "byperiod") ||
    (tableName === "trainer" && reportName === "bysport")
  );
}

function getTableHeader(tableName, reportName) {
  if (tableName === "athlete" && reportName === "morethanone") {
    return ["id", "firstname", "patronymic", "lastname", "club", "sport"];
  }
  if (tableName === "sportclub" && reportName === "byperiod") {
    return ["club", "athletecount"];
  }
  if (tableName === "sponsor" && reportName === "byperiod") {
    return ["id", "name", "company", "competitioncount"];
  }
  if (tableName === "sportsfacility" && reportName === "bycompetitionperiod") {
    return ["id", "address", "type", "competitiondate"];
  }

  return undefined;
}

function isSpecialValues(tableName, reportName) {
  return (
    (tableName === "athlete" && reportName === "bytrainerlicense") ||
    (tableName === "trainer" && reportName === "byathlete") || 
    (tableName === "competition" && reportName === "byperiod") ||
    (tableName === "athlete" && reportName === "bycompetition") ||
    (tableName === "competition" && reportName === "byfacility")
  );
}

export function ReportPage() {
  const { tableName, reportName } = useParams();
  const [firstParam, setFirstParam] = useState("");
  const [firstData, setFirstData] = useState([]);
  const [firstValues, setFirstValues] = useState([]);
  const [secondParam, setSecondParam] = useState("");
  const [secondData, setSecondData] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [tableData, setTableData] = useState(undefined);

  const firstSelectCallback = (value) => {
    setFirstParam(value);
  };

  const secondSelectCallback = (value) => {
    setSecondParam(value);
  };

  const createReport = () => {
    const response = request(
      "/" +
        tableName +
        (reportName !== "null" ? "/" + reportName : "") +
        (reportName.includes("period")
          ? "/" +
            startTime.getFullYear() +
            "-" +
            startTime.getMonth() +
            "-" +
            startTime.getDay() +
            "/" +
            endTime.getFullYear() +
            "-" +
            endTime.getMonth() +
            "-" +
            endTime.getDay()
          : "") +
        (firstParam ? "/" + firstParam : "") +
        (secondParam ? "/" + secondParam : "")
    );
    response.then((newData) => setTableData(newData));
  };

  useEffect(() => {
    if (firstParam) {
      if (
        isZeroParam(tableName, reportName) ||
        isOneParam(tableData, reportName)
      ) {
        return;
      }

      const response = request(
        tableName === "sportsfacility"
          ? "/sportsfacility/" + firstParam
          : tableName === "competition" && reportName === "byfacility"
          ? "/sport"
          : "/athleterank"
      );

      response.then((newData) =>
        setSecondData(
          newData.map((item) => {
            if (typeof item === "object") {
              return item?.value
                ? item.value
                : item?.capacity
                ? item.capacity
                : item?.floorArea
                ? item.floorArea
                : item?.surface
                ? item.surface.value
                : item?.trackNumber
                ? item.trackNumber
                : "";
            }
            return item;
          })
        )
      );
    }
  }, [firstParam, tableName, reportName]);

  useEffect(() => {
    setFirstData([]);
    setFirstParam("");
    setSecondData([]);
    setSecondParam("");
    setStartTime(new Date());
    setEndTime(new Date());
    setTableData([]);

    if (isZeroParam(tableName, reportName)) {
      return;
    }

    const requestUrl =
      tableName === "sportsfacility"
        ? "/sportsfacilitytype"
        : reportName.includes("period")
        ? "/sponsor"
        : reportName.includes("facility")
        ? "/sportsfacility"
        : "/" + reportName.slice(2);
    const response = request(requestUrl);
    response.then((newData) => {
      const tempData = newData.map((item) => {
        if (typeof item === "object") {
          return item?.value
            ? item.value
            : item?.capacity
            ? item.capacity
            : item?.floorArea
            ? item.floorArea
            : item?.surface
            ? item.surface.value
            : item?.trackNumber
            ? item.trackNumber
            : item?.id
            ? item.id
            : JSON.stringify(item);
        }
        return item;
      });

      setFirstData([...tempData]);

      if (isSpecialValues(tableName, reportName)) {
        setFirstValues(
          newData.map(
            (item) =>
              "" +
              item?.id +
              (item?.lastName ? " - " + item.lastName : "") +
              (item?.name ? " - " + item.name : "") +
              (item?.company ? " - " + item.company : "") +
              (item?.title ? " - " + item.title : "") +
              (item?.trainer?.lastName ? " - " + item.trainer.lastName : "") +
              (item?.sport?.value && !item?.title ? " - " + item.sport.value : "") +
              (item?.type?.value ? " - " + item.type.value : "") +
              (item?.address ? " - " + item.address : "")
          )
        );
      } else {
        setFirstValues([...tempData]);
      }
    });
  }, [tableName, reportName]);

  return (
    <div className="report-page">
      {isZeroParam(tableName, reportName) ? (
        ""
      ) : isOneParam(tableName, reportName) ? (
        <Select
          title="option 1"
          data={firstData}
          values={firstValues}
          setValueCallback={firstSelectCallback}
        />
      ) : (
        <>
          <Select
            title="option 1"
            data={firstData}
            values={firstValues}
            setValueCallback={firstSelectCallback}
          />
          <Select
            title="option 2"
            data={secondData}
            values={secondData}
            setValueCallback={secondSelectCallback}
          />
        </>
      )}
      {reportName.includes("period") && (
        <>
          <div className="date-picker__wrapper">
            <h2 className="date-picker__title">Start time: </h2>
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
            />
          </div>
          <div className="date-picker__wrapper">
            <h2 className="date-picker__title">end time: </h2>
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
            />
          </div>
        </>
      )}
      <Button onClickCallback={createReport} />
      <Table
        tableName="Report"
        tableHeaders={getTableHeader(tableName, reportName)}
        data={tableData}
      />
    </div>
  );
}
