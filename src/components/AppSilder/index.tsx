import {FastField} from 'formik';
import color from 'helpers/color';
import {DEVICE} from 'helpers/dimentions';
import padding from 'helpers/padding';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel, {Pagination} from 'react-native-snap-carousel';

interface AppSliderI {
  data: any[];
}
const AppSlider = ({data}: AppSliderI) => {
  //! State
  const [activeSlide, setActiveSlide] = useState(0);

  //! Function
  const pagination = () => {
    return (
      <Pagination
        dotsLength={data?.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.ctnPaging}
        dotContainerStyle={styles.dotContainerStyle}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  };

  //! Render
  const renderItem = ({index, item}: any) => {
    return (
      <View style={styles.viewItem}>
        <FastImage source={{uri: item}} style={styles.img} />
      </View>
    );
  };
  return (
    <View>
      <Carousel
        data={data}
        renderItem={renderItem}
        itemWidth={DEVICE.WIDTH}
        sliderWidth={DEVICE.WIDTH}
        // itemHeight={DEVICE.WIDTH / 2}
        // sliderHeight={DEVICE.WIDTH / 2}
        onSnapToItem={setActiveSlide}
        autoplay
        loop
      />
      {pagination()}
    </View>
  );
};

export default React.memo(AppSlider);

const styles = StyleSheet.create({
  viewItem: {},
  img: {
    width: '100%',
    aspectRatio: 1 / 0.5,
  },
  // paging style \/
  ctnPaging: {
    backgroundColor: color.blueBg,
    paddingVertical: padding.p8,
    paddingHorizontal: 0,
  },
  dotStyle: {
    width: 30,
    height: 2,
    borderRadius: 2,
    backgroundColor: color.primary,
  },
  inactiveDotStyle: {
    width: 15,
    backgroundColor: color.black,
  },
  dotContainerStyle: {
    marginHorizontal: 1,
  },
});
