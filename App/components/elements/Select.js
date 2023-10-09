import { Picker } from "@react-native-picker/picker";

export const Select = ({ value, onChange, options }) => {
  return (
    <Picker
      selectedValue={value}
      style={{
        // width: 100,
        backgroundColor: "white",
        borderRadius: 12,
      }}
      onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
    >
      {options.map((option) => (
        <Picker.Item label={option.label} value={option.value} />
      ))}
    </Picker>
  );
};
