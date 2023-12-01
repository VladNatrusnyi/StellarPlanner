import {useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {Button, Divider, IconButton} from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS} from "../colors";
import {formatDate, formatTime} from "../helpers/dateTransformers";

export const Calendar = ({value, type, getData}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    getData(currentDate.toISOString())
    setDate(currentDate);
  };

  const shoPicker = () => {
    setShow(true);
  };

  return (
    <View>
      <Button
        icon={type === 'date' ? 'calendar' : 'clock-outline'}
        mode="contained"
        onPress={shoPicker}
        style={{backgroundColor: COLORS.primary}}
      >
        {type === 'date' ? 'Date' : 'Time'}
      </Button>

      {value &&
        <View>
          <View style={styles.resWrapper}>
            <Text
              style={{paddingLeft: 30}}
              variant="titleLarge">{type === 'date' ? formatDate(value) : formatTime(value)}</Text>
            <IconButton
              icon="close"
              iconColor={COLORS.secondary}
              size={32}
              onPress={() => getData(null)}
            />
          </View>
          <Divider />
        </View>
      }

      {show && (
        <DateTimePicker
          testID={`CustomPicker`}
          value={date}
          mode={type}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  resWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});
