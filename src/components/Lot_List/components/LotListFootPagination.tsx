import {FC} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';

import {pageSize} from '../../../constants/data/Pages';
import {AppText, ButtonStyled} from '../..';
import {textColorStyles} from '../../AppText/styles';
import {styles} from '../styles';
import {RenderBottomBtnsProps} from '../types/types';

export const LotListFooterPagin: FC<RenderBottomBtnsProps> = ({
  isSizeVisible,
  handleChangeCountItems,
  toggleSizeWindow,
  size,
  totalPages,
  isCanNext,
  handleChangePage,
  isVisible,
  handlePickPage,
  togglePickPage,
  page,
}) => {
  return (
    <View style={styles.listFooterContainer}>
      {isSizeVisible && (
        <View style={styles.listFooterPickCount}>
          <FlatList
            data={pageSize}
            ItemSeparatorComponent={() => (
              <AppText style={textColorStyles['#38999B']} text={''} />
            )}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleChangeCountItems(item)}>
                <AppText
                  style={textColorStyles['#38999B']}
                  variant="label16_400">
                  {' '}
                  {item}
                </AppText>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <TouchableOpacity
        onPress={() => toggleSizeWindow()}
        style={styles.listFooterPages}>
        <AppText variant="label16_400" style={textColorStyles['#38999B']}>
          {size} ▾
        </AppText>
      </TouchableOpacity>
      {totalPages.length > 1 && (
        <View style={styles.listFooterLoadMoreContainer}>
          {!isCanNext && (
            <ButtonStyled
              isDisabled={isCanNext}
              title="Load more variants"
              style="borderNone"
              onPress={() => handleChangePage()}
            />
          )}
          {isVisible && (
            <View style={styles.listFooterPickPage}>
              <FlatList
                data={totalPages}
                horizontal={true}
                ItemSeparatorComponent={() => (
                  <AppText style={textColorStyles['#38999B']} text={', '} />
                )}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => handlePickPage(item)}>
                    <AppText
                      style={textColorStyles['#38999B']}
                      variant="label16_400">
                      {' '}
                      {item}
                    </AppText>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          <TouchableOpacity
            onPress={() => togglePickPage()}
            style={styles.listFooterCurrPage}>
            <AppText variant="label16_400" style={textColorStyles['#38999B']}>
              {page + 1} ▾
            </AppText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
