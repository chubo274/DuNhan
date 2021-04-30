import AppText from 'components/AppText';
import color from 'helpers/color';
import font from 'helpers/font';
import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

interface AppReadMoreI {
  longText: String;
}
const AppReadMore = (props: AppReadMoreI) => {
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
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
  }, []);

  //! UseEffects

  //! Render
  return (
    <View>
      <AppText
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : 4}>
        {props.longText}
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
  );
};

export default React.memo(AppReadMore);

const styles = StyleSheet.create({
  viewLongText: {
    flexDirection: 'row-reverse',
  },
  textReadMore: {
    fontFamily: font.VDBrevia_Sb,
    color: color.tulip,
  },
});
