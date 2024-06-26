import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function StarIcon() {
  return (
    <Svg width={12} height={11} viewBox="0 0 12 11" fill="none">
      <Path
        d="M6 9.019l-3.527 1.974.787-3.964L.293 4.285l4.013-.476L6 .139l1.693 3.67 4.014.476-2.968 2.744.788 3.964-3.527-1.974z"
        fill="#368ACE"
      />
    </Svg>
  );
}
