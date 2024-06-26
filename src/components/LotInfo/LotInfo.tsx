import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FC, useState} from 'react';
import {View} from 'react-native';

import {Colors} from '../../constants/Colors';
import {currencyStorage} from '../../screens/PersonalAcc/ChangeCurrencyScreen/ChangeCurrencyScreen';
import {AppText} from '../AppText/AppText';
import {textColorStyles, textTypographyStyles} from '../AppText/styles';
import {Bet} from '../Lot_List/components/IsBets';
import {LotCardProps} from '../Lot_List/types/types';
import {styles} from './styles';

const LotSection: FC<{label: string; value?: string | number}> = ({
  label,
  value,
}) => {
  return (
    <View style={styles.lotSectionContainer}>
      <View style={styles.labelColumn}>
        <AppText
          style={[
            textTypographyStyles.label16_400,
            textColorStyles[Colors.GRAY_PRIMARY],
          ]}>
          {label}
        </AppText>
      </View>
      <View style={styles.valueColumn}>
        {value !== undefined && (
          <AppText
            style={[
              textTypographyStyles.label16_400,
              textColorStyles[Colors.BLACK_PRIMARY],
            ]}>
            {value}
          </AppText>
        )}
      </View>
    </View>
  );
};

const LotInfo: FC<LotCardProps> = ({
  title,
  latestBet,
  weight,
  price,
  variety,
  quantity,
  sizeLower,
  packaging,
  country,
  creationDate,
  description,
  lotType,
  author,
  isPlaceBet,
}) => {
  const [currencyIcon, setCurrencyIcon] = useState(
    JSON.parse(currencyStorage.getString('selectedCurrencyIcon') || ''),
  );

  return (
    <View style={styles.container}>
      <AppText
        style={[
          textTypographyStyles.label20_500,
          textColorStyles[Colors.BLACK_PRIMARY],
          styles.lotTitle,
        ]}>
        {title}
      </AppText>
      <View style={styles.lotInfo} />
      <View style={styles.lotPrice}>
        <View style={styles.lotPriceSection}>
          <Bet
            isBetting={isPlaceBet}
            author={author}
            lotType={lotType}
            variant="label24_500"
            bet={latestBet}
          />

          {latestBet && (
            <AppText
              style={[
                textTypographyStyles.label12_400,
                textColorStyles[Colors.GRAY_PRIMARY],
              ]}>
              {weight}
            </AppText>
          )}
        </View>
        <View style={styles.lotPriceSection}>
          <AppText
            style={[
              textTypographyStyles.label24_500,
              textColorStyles[Colors.BLACK_PRIMARY],
              styles.lotCost,
            ]}>
            <View style={styles.currencyIcon}>
              <FontAwesomeIcon icon={currencyIcon} size={20} />
            </View>
            {price}
          </AppText>
          <View style={styles.lotWeight}>
            <AppText
              style={[
                textTypographyStyles.label12_400,
                textColorStyles[Colors.GRAY_PRIMARY],
              ]}>
              <View>
                <FontAwesomeIcon
                  icon={currencyIcon}
                  size={9}
                  color={Colors.GRAY_PRIMARY}
                />
              </View>
              {weight}
            </AppText>
          </View>
        </View>
      </View>
      <View>
        <LotSection label="Description" value={description} />
        <LotSection label="Variety" value={variety} />
        <LotSection label="Quantity" value={quantity} />
        <LotSection label="Size" value={sizeLower} />
        <LotSection label="Packaging" value={packaging} />
        <LotSection label="Location" value={country} />
        <LotSection label="Created" value={creationDate} />
      </View>
    </View>
  );
};

export default LotInfo;
