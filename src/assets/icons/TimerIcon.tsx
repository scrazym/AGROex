import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export function TimerSVG() {
  return (
    <Svg width={10} height={10} viewBox="0 0 10 10" fill="none">
      <Path
        d="M5 10A5 5 0 115 0a5 5 0 010 10zm0-1a4 4 0 100-8 4 4 0 000 8zm.5-4h2v1h-3V2.5h1V5z"
        fill="#2978B8"
      />
    </Svg>
  );
}
