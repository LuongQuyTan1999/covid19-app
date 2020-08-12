import { Card, CardContent } from "@material-ui/core";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import InfoBox from "../components/InfoBox";
import LineGraph from "../components/LineGraph";
import Map from "../components/Map";
import Table from "../components/Table";
import { prettyPrintStat, sortData } from "../utils";

const App = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
  @media (min-width: 990px) {
    flex-direction: row;
  }
`;

const StyledAppLeft = styled.div`
  flex: 0.9;
`;

const StyledStats = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledAppRight = styled(Card)`
  .appRight__cartContent {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

function Home() {
  const [inputCountry, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => {
            return {
              name: country.country,
              value: country.countryInfo.iso2,
            };
          });
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(6);
      });
  };
  return (
    <App>
      <StyledAppLeft>
        <Header
          inputCountry={inputCountry}
          onCountryChange={onCountryChange}
          countries={countries}
        />
        <StyledStats>
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={() => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={() => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={() => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </StyledStats>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </StyledAppLeft>
      <StyledAppRight>
        <CardContent className="appRight__cartContent">
          <div>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
          </div>
          <div>
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </StyledAppRight>
    </App>
  );
}

export default Home;
