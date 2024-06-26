import {IconDefinition} from '@fortawesome/fontawesome-svg-core';

export type BtnProps = {
  title: string;
  onPress: () => void;
};

export type BtnIconProps = BtnProps & {
  icon: IconDefinition;
};
