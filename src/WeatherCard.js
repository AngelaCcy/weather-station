import React from 'react';
import styled from '@emotion/styled';
// 載入圖示
import WeatherIcon from './WeatherIcon.js';
// import { ReactComponent as CloudyIcon } from './images/day-cloudy.svg';
import { ReactComponent as AirFlowIcon } from './images/airFlow.svg';
import { ReactComponent as RedoIcon } from './images/refresh.svg';
import { ReactComponent as RainIcon } from './images/rain.svg';
import { ReactComponent as LoadingIcon } from './images/loading.svg';
import { ReactComponent as CogIcon } from './images/cog.svg';

// STEP 2：定義帶有 styled 的 component
const WeatherCardWrapper = styled.div`
  background-color: ${({ theme }) => theme.foregroundColor};
  position: relative;
  min-width: 360px;
  box-shadow: 0 1px 3px 0 #999999;
  box-sizing: border-box;
  padding: 30px 15px;
`;

const Location = styled.div`
  color: ${({ theme }) => theme.titleColor};
  font-size: 28px;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    /* STEP 2:使用 rotate 動畫效果在 svg 圖示上 */
    animation: rotate infinite 1.5s linear;
    /* STEP 2: 取得傳入的 props 並根據它來決定動畫要不要執行 */
    animation-duration: ${({ isLoading }) => (isLoading ? '1.5s' : '0s')};
  }

  /* STEP 1:定義旋轉的動畫效果，並取名為 rotate */
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;

const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;


const WeatherCard = (props) => {
    const { weatherElement, moment, fetchData, setCurrentPage, cityName } = props;
    const {
        observationTime,
        // locationName,
        temperature,
        windSpeed,
        description,
        weatherCode,
        rainPossibility,
        comfortability,
        isLoading,
      } = weatherElement;

    return (
        <WeatherCardWrapper>
          <Cog onClick={() => setCurrentPage('WeatherSetting')} />
          <Location>{cityName}</Location>
          <Description>
            {description} {comfortability}
          </Description>
          <CurrentWeather>
            <Temperature>
            {Math.round(temperature)} <Celsius>°C</Celsius>
            </Temperature>
            <WeatherIcon 
              currentWeatherCode = {weatherCode}
              moment={moment || 'day'}
            />
          </CurrentWeather>
          <AirFlow>
              <AirFlowIcon/>
              {windSpeed} m/h
          </AirFlow>
          <Rain>
              <RainIcon/>
              {Math.round(rainPossibility)}%
          </Rain>
          <Refresh onClick={fetchData} isLoading={isLoading}>
          最後觀測時間：
            {new Intl.DateTimeFormat('zh-TW', {
              hour: 'numeric',
              minute: 'numeric',
            }).format(new Date(observationTime))}{' '}
            {isLoading ? <LoadingIcon /> : <RedoIcon />}
          </Refresh>
        </WeatherCardWrapper>
    )
}

export default WeatherCard;