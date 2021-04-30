import AppText from 'components/AppText';
import color from 'helpers/color';
import font from 'helpers/font';
import fontSize from 'helpers/fontSize';
import padding from 'helpers/padding';
import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface AppTimeLineScheduleI {
  title: String;
  longText: String;
  firstPoint?: boolean;
  lastPoint?: boolean;
}
const AppTimeLineSchedule = ({
  title,
  longText,
  firstPoint = false,
  lastPoint = false,
}: AppTimeLineScheduleI) => {
  //! Hook, Reducers

  //! State
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  //! Function
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 2); //to check the text is more than 2 lines or not
  }, []);

  //! UseEffects

  //! Render
  return (
    <View style={styles.container}>
      <View style={styles.viewLeft}>
        <View style={styles.viewLineTopFirst}>
          {!firstPoint && <View style={styles.viewLineTop}></View>}
        </View>
        <View style={styles.viewCircle}></View>
        {!lastPoint && <View style={styles.viewLineBottom}></View>}
      </View>
      <View style={styles.viewRight}>
        <AppText style={styles.textTitle}>{title}</AppText>
        <AppText
          onTextLayout={onTextLayout}
          numberOfLines={textShown ? undefined : 2}>
          {longText}
        </AppText>
        {lengthMore ? (
          <View style={styles.viewLongText}>
            <TouchableOpacity onPress={toggleNumberOfLines}>
              <AppText style={styles.textReadMore}>
                {textShown ? 'Read less...' : 'Read more...'}
              </AppText>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default React.memo(AppTimeLineSchedule);

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  textTitle: {
    fontSize: fontSize.f16,
    fontFamily: font.VDBrevia_Sb,
  },
  viewLongText: {
    flexDirection: 'row-reverse',
  },
  textReadMore: {
    fontFamily: font.VDBrevia_Sb,
    color: color.tulip,
  },
  viewLeft: {width: 50, alignItems: 'center'},
  viewRight: {marginRight: 50, paddingVertical: 5},
  viewLineTopFirst: {
    height: 9,
  },
  viewLineTop: {
    width: 15 / 2,
    height: 10,
    backgroundColor: color.tulip,
  },
  viewCircle: {
    width: 15,
    aspectRatio: 1,
    borderRadius: 15 / 2,
    backgroundColor: color.tulip,
  },
  viewLineBottom: {
    flex: 1,
    width: 15 / 2,
    height: '100%',
    backgroundColor: color.tulip,
  },
});
