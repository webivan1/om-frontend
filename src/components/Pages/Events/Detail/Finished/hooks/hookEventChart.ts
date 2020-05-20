import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "../../../../../../services/moment";

// Types
import { RootState } from "../../../../../../store/store";
import { EventType } from "../../../../../../store/events/types";
import { EventStatisticStateType } from "../../../../../../store/eventStatistic/types";

// Actions
import { fetchEventStatAsync, setStat } from "../../../../../../store/eventStatistic/actions";

export const useEventChart = ({ id, timezoneUTC }: EventType): EventStatisticStateType & {
  chartData: Array<object>
} => {

  const dispatch = useDispatch();
  const stat = useSelector<RootState, EventStatisticStateType>(state => state.eventStat);
  const [chartData, setChartData] = useState<Array<object>>([])

  useEffect(() => {
    dispatch(fetchEventStatAsync(id));
  }, [dispatch]);

  useEffect(() => {
    if (stat.rows.length > 0) {
      setChartData(stat.rows.map(row => {
        return {
          ...row,
          name: moment(row.createdAt).utcOffset(timezoneUTC).format('HH:mm')
        }
      }));
    }

    return function cleanup() {
      dispatch(setStat([]));
    }
  }, [stat.rows.length])

  return {
    ...stat,
    chartData
  };
}