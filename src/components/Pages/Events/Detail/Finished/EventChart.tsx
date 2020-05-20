import React, { FC } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { EventType } from "../../../../../store/events/types";
import { useEventChart } from "./hooks/hookEventChart";

type PropTypes = {
  event: EventType
}

export const EventChart: FC<PropTypes> = ({ event }: PropTypes) => {

  const { loader, totalMax, error, chartData } = useEventChart(event);

  if (loader) {
    return <Spinner animation="border" variant="warning" />
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }

  if (!chartData.length) {
    return null;
  }

  return (
    <div>
      <p className="lead mb-5">
        Максимальное кол-во участников: <b>{totalMax}</b>
      </p>

      <ResponsiveContainer width={'100%'} aspect={4.0/1.5}>
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}