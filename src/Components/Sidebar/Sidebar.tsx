import { Link } from "react-router-dom";
import { paths, reportPaths } from "../../utils/paths";
import { useState } from "react";
import "./Sidebar.scss";

type displayType = "none" | "block";

export function Sidebar() {
  const [tablesDisplay, setTablesDisplay] = useState<displayType>("none");
  const [reportDisplay, setReportDisplay] = useState<displayType>("none");
  const tableOnClick = () => {
    tablesDisplay === "none"
      ? setTablesDisplay("block")
      : setTablesDisplay("none");
  };

  const reportOnClick = () => {
    reportDisplay === "none"
      ? setReportDisplay("block")
      : setReportDisplay("none");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__list">
        <h2 onClick={tableOnClick} className="sidebar__list-title">
          Таблицы
        </h2>
        <div
          style={{ display: tablesDisplay }}
          className="sidebar__list-items-wrapper"
        >
          <Link className="sidebar__link" to={paths.sport}>
            <div className="sidebar__list-item">Виды спорта</div>
          </Link>
          <Link className="sidebar__link" to={paths.athleteRank}>
            <div className="sidebar__list-item">Спортивные ранги</div>
          </Link>
          <Link className="sidebar__link" to={paths.courtSurface}>
            <div className="sidebar__list-item">Покрытия кортов</div>
          </Link>
          <Link className="sidebar__link" to={paths.sportsFacilityType}>
            <div className="sidebar__list-item">Виды спортивных сооружений</div>
          </Link>
          <Link className="sidebar__link" to={paths.sportsFacility}>
            <div className="sidebar__list-item">Спортивные сооружения</div>
          </Link>
          <Link className="sidebar__link" to={paths.court}>
            <div className="sidebar__list-item">Теннисные корты</div>
          </Link>
          <Link className="sidebar__link" to={paths.gym}>
            <div className="sidebar__list-item">Тренировочные залы</div>
          </Link>
          <Link className="sidebar__link" to={paths.stadium}>
            <div className="sidebar__list-item">Стадионы</div>
          </Link>
          <Link className="sidebar__link" to={paths.arena}>
            <div className="sidebar__list-item">Арены</div>
          </Link>
          <Link className="sidebar__link" to={paths.sportClub}>
            <div className="sidebar__list-item">Спортивные клубы</div>
          </Link>
          <Link className="sidebar__link" to={paths.athlete}>
            <div className="sidebar__list-item">Спортсмены</div>
          </Link>
          <Link className="sidebar__link" to={paths.athleteRanking}>
            <div className="sidebar__list-item">Ранги спортсменов</div>
          </Link>
          <Link className="sidebar__link" to={paths.trainer}>
            <div className="sidebar__list-item">Тренеры</div>
          </Link>
          <Link className="sidebar__link" to={paths.trainerLicense}>
            <div className="sidebar__list-item">Лицензии тренеров</div>
          </Link>
          <Link className="sidebar__link" to={paths.training}>
            <div className="sidebar__list-item">Тренируют</div>
          </Link>
          <Link className="sidebar__link" to={paths.sponsor}>
            <div className="sidebar__list-item">Спонсоры</div>
          </Link>
          <Link className="sidebar__link" to={paths.competition}>
            <div className="sidebar__list-item">Соревнования</div>
          </Link>
          <Link className="sidebar__link" to={paths.competitionPlayer}>
            <div className="sidebar__list-item">Участники соревнований</div>
          </Link>
        </div>
      </div>

      <div className="sidebar__list">
        <h2 onClick={reportOnClick} className="sidebar__list-title">
          Создать отчет
        </h2>
        <div
          style={{ display: reportDisplay }}
          className="sidebar__list-items-wrapper"
        >
          <Link className="sidebar__link" to={reportPaths.sportsFacilityByFieldValue} >
            <div className="sidebar__list-item">Спортивные сооружения по значению</div>
          </Link>
          <Link className="sidebar__link" to={reportPaths.athleteBySportAndRanking} >
            <div className="sidebar__list-item">Спортсмены по спорту и рангу</div>
          </Link>
          <Link className="sidebar__link" to={reportPaths.athleteByTrainerAndRanking} >
            <div className="sidebar__list-item">Спортсмены по тренеру и рангу</div>
          </Link>
          <Link className="sidebar__link" to={reportPaths.athleteWhoMoreThanOneSport} >
            <div className="sidebar__list-item">Спортсмены занимающиеся более одним видом спорта</div>
          </Link>
          <Link className="sidebar__link" to={reportPaths.trainerByAthlete} >
            <div className="sidebar__list-item">Тренеры по спортсмену</div>
          </Link>
          <Link className="sidebar__link" to={reportPaths.competitionByPeriod} >
            <div className="sidebar__list-item">Соревнования по периоду</div>
          </Link>
          <Link className="sidebar__link" to={reportPaths.athleteWhoWinnerByCompetition} >
            <div className="sidebar__list-item">Призеры по соревнованию</div>
          </Link>
          <Link className="sidebar__link" to={reportPaths.competitionBySportsFacility} >
            <div className="sidebar__list-item">Соревнования по спорт объекту</div>
          </Link>
          <Link className="sidebar__link" to={reportPaths.sportClubWithAthleteCountByPeriod} >
            <div className="sidebar__list-item">Спорт клубы и их спортсмены по периоду</div>
          </Link>
          <Link className="sidebar__link" to={reportPaths.trainerBySport} >
            <div className="sidebar__list-item">Тренеры по спорту</div>
          </Link>
          <Link className="sidebar__link" to={reportPaths.athleteWhoNotInCompetitionByPeriod} >
            <div className="sidebar__list-item">Спортсмены которые не участвуют в соревнованиях</div>
          </Link>
          <Link className="sidebar__link" to={reportPaths.sponsorByCompetitionPeriod} >
            <div className="sidebar__list-item">Спонсоры и число соревнований с их участием</div>
          </Link>
          <Link className="sidebar__link" to={reportPaths.sportsFacilityByCompetitionPeriod} >
            <div className="sidebar__list-item">Спорт сооружения и их соревнования</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
