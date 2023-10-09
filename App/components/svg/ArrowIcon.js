import Svg, { Path } from "react-native-svg";
import { colors } from "../../styles/colors";

const ArrowIcon = ({ color, w }) => (
  <Svg
    style={{width: w ? w : 20}}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke={color ? color : colors.WHITE[0]}
    strokeWidth={1.5}
    className="w-6 h-6"
    viewBox="0 0 24 24"
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </Svg>
);
export default ArrowIcon;
