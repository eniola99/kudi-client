import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { Chart, registerables } from 'chart.js'
import moment from 'moment'
// import { LineChart, Line, XAxis, Tooltip } from 'recharts';


Chart.register(...registerables);

const { Title } = Typography;

const myChart = ({ coinHistory, currentPrice, coinName}) => {

  const coinPrice = []

  const coinTimestamp = []

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }
  
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(moment(coinHistory?.data?.history[i].timestamp * 1000).format("DD MMM hh a"));
  }
  coinPrice.reverse()
  coinTimestamp.reverse()

  const data = {
    labels: coinTimestamp,
    datasets: [{
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      }],
  }

  // const data = coinHistory?.data?.history


  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true
        }
      }
    }
  }
  
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
        <Line data={data}  />

        {/* <LineChart width={1000} height={600} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
          <XAxis dataKey="timestamp" />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart> */}
    </>
  );
}
export default myChart;