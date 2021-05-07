import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, processColor, Platform} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';
import _ from 'lodash';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/reducers';
import padding from 'helpers/padding';
import {DEVICE} from 'helpers/dimentions';
import color from 'helpers/color';
import AppText from 'components/AppText';
import fontSize from 'helpers/fontSize';
import {ACTUAL_DATE, FORMAT_DATE} from 'helpers/constants';

interface BarChartReportProps {
  onSelectChart?: (day: any, value: any) => void;
  startDate: Date;
  endDate: Date;
}

const Chart = ({
  onSelectChart = () => {},
  startDate,
  endDate,
}: BarChartReportProps) => {
  //! State
  const listBooking = useSelector(
    (state: RootState) => state.bookingReducer.data,
  );
  const [newDataChart, setNewDataChart] = useState<any>([]);
  const barChartRef = useRef(null);

  //! Function
  const onSelect = (indexChart: number) => {
    if (indexChart >= 0) {
      onSelectChart(
        newDataChart[indexChart].day,
        newDataChart[indexChart].value,
      );
    }
  };

  //! Effects
  useEffect(() => {
    //TODO tạo list booking rỗng theo start,end time
    let newDay = moment(startDate).startOf('day').format(ACTUAL_DATE);
    const newData: any = [];
    while (
      moment(newDay).isSameOrBefore(
        moment(endDate).startOf('day').format(ACTUAL_DATE),
      )
    ) {
      const newLabel =
        String(newDay).split('-')[2] + '/' + String(newDay).split('-')[1];
      newData.push({
        day: newDay,
        // total: 0,
        // label: newLabel,
        value: 0,
      });
      newDay = moment(newDay).add(1, 'day').format(ACTUAL_DATE);
    }

    //TODO tạo list booking theo listBooking và filter
    const newListBooking: any[] = [];
    listBooking.map((el: any) => {
      if (_.isEmpty(newListBooking)) {
        newListBooking.push({
          day: moment(moment(el.booking_date).startOf('day').toDate()).format(
            ACTUAL_DATE,
          ),
          value: el.total_money,
        });
      } else {
        if (
          moment(newListBooking[newListBooking.length - 1].day)
            .startOf('day')
            .isSame(moment(el.booking_date).startOf('day'))
        ) {
          newListBooking[newListBooking.length - 1].value =
            newListBooking[newListBooking.length - 1].value + el.total_money;
        } else {
          newListBooking.push({
            day: moment(moment(el.booking_date).startOf('day').toDate()).format(
              ACTUAL_DATE,
            ),
            value: el.total_money,
          });
        }
      }
    });

    //TODO đổ dữ liệu vào list
    newData.map((el: any, idx: any) => {
      const dataEl = newListBooking.find((e: any, i: any) => {
        return moment(e.day, ACTUAL_DATE)
          .startOf('day')
          .isSame(moment(el.day, ACTUAL_DATE).startOf('day'));
      });
      if (!_.isEmpty(dataEl))
        newData[idx] = {
          day: dataEl.day,
          value: dataEl.value,
        };
    });
    setNewDataChart(newData);

    if (barChartRef.current != null) {
      if (Platform.OS === 'android')
        Object(barChartRef.current).moveViewToX(
          newDataChart.length - 1,
          0,
          'left',
          500,
        );
      if (Platform.OS === 'ios')
        Object(barChartRef.current).centerViewToAnimated(
          newDataChart.length - 1,
          0,
          'left',
          500,
        );
    }
  }, [listBooking]);

  //! Render
  return (
    <View style={styles.container}>
      {!_.isEmpty(newDataChart) ? (
        <View style={styles.viewChart}>
          <BarChart
            style={styles.chart}
            data={{
              dataSets: [
                {
                  values:
                    newDataChart?.map((el: any) => {
                      return {y: Number((el.value / 1000000).toFixed(1))};
                    }) || [],
                  label: 'Tiền',
                  config: {
                    valueTextSize: fontSize.f12,
                    color: processColor(color.sundown),
                    drawValues: true,
                    highlightColor: processColor(color.geraldine),
                  },
                },
              ],
              config: {
                barWidth: 0.7,
              },
            }}
            xAxis={{
              valueFormatter:
                newDataChart?.map((el: any) =>
                  moment(el.day).format('DD/MM'),
                ) || [],
              granularityEnabled: true,
              granularity: 1,
              position: 'BOTTOM',
              drawGridLines: false,
              textSize: fontSize.f12,
            }}
            yAxis={{
              left: {
                axisMinimum: 0,
                drawAxisLines: false,
                // drawGridLines: false,
                // drawLabels: false,
                textSize: fontSize.f12,
              },
              right: {
                axisMinimum: 0,
                drawAxisLines: false,
                drawGridLines: false,
                drawLabels: false,
                textSize: fontSize.f12,
              },
            }}
            // animation={{durationX: 2000}}
            legend={{
              enabled: false,
            }}
            ref={barChartRef}
            minOffset={0}
            gridBackgroundColor={processColor('#ffffff')}
            chartDescription={{text: ''}}
            visibleRange={{x: {min: 7, max: 7}}}
            drawBarShadow={false}
            drawValueAboveBar={true}
            autoScaleMinMaxEnabled={false}
            // touchEnabled={false}
            onSelect={(event: any) => onSelect(event.nativeEvent?.x ?? -1)}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.5}
            doubleTapToZoomEnabled={false}
            scaleEnabled={false}
          />
        </View>
      ) : (
        <View style={styles.viewNodata}>
          <AppText>"Chưa có dữ liệu"</AppText>
        </View>
      )}
    </View>
  );
};

export default React.memo(Chart);

const styles = StyleSheet.create({
  container: {
    height: DEVICE.HEIGHT / 3.2,
  },
  viewChart: {
    flex: 1,
    backgroundColor: color.white,
  },
  viewEdit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: padding.p4,
    padding: padding.p8,
    backgroundColor: color.blueBg,
  },
  viewText: {
    alignSelf: 'center',
    fontSize: fontSize.f16,
    fontWeight: '600',
  },
  BtnEdit: {width: DEVICE.WIDTH * 0.35},
  chart: {
    flex: 1,
  },
  viewNodata: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
