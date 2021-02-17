import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import color from 'helpers/color';
import AppText from 'components/AppText';
import {useNavigation} from '@react-navigation/native';
import {HIT_SLOP} from 'helpers/constants';
import padding from 'helpers/padding';
import font from 'helpers/font';
import fontSize from 'helpers/fontSize';

interface AppHeaderBackProps {
  title?: string;
  content?: string;
  onPressBack?: () => void;
  justHeader?: boolean;
}

const AppHeaderBack = ({
  title = '',
  content = '',
  onPressBack,
  justHeader = false,
}: AppHeaderBackProps) => {
  const navigation = useNavigation();
  //! state

  //! function

  //! render
  return (
    <View style={styles.container}>
      <View style={styles.viewLeft}>
        {justHeader && (
          <TouchableOpacity
            hitSlop={HIT_SLOP}
            onPress={() => {
              if (onPressBack) {
                onPressBack();
                return;
              }
              navigation.canGoBack() && navigation.goBack();
            }}>
            <AntDesign name="arrowleft" size={25} color={color.primary} />
          </TouchableOpacity>
        )}
        <View style={styles.viewTitle}>
          <AppText style={styles.txtTitle} numberOfLines={1}>
            {title}
          </AppText>
          {!!content && <AppText style={styles.txtContent}>{content}</AppText>}
        </View>
      </View>
    </View>
  );
};

export default React.memo(AppHeaderBack);

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.blueBg,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: padding.p8,
    paddingHorizontal: padding.p8,
  },
  viewLeft: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  txtTitle: {
    fontSize: fontSize.f22,
    color: color.primary,
    fontFamily: font.VDBrevia_Sb,
  },
  txtContent: {
    fontSize: fontSize.f12,
    fontWeight: 'bold',
    color: color.primary,
  },
  viewTitle: {
    marginLeft: padding.p16,
  },
});
