import { Text } from '@/components/ui/text';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { View } from 'react-native';

export default function DatePickerNormal() {
  const [date, setDate] = useState(new Date());

  return (
    <View className="items-center justify-center">
      <View className="grid gap-4">
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          display="inline"
          mode={'datetime'}
          onChange={(_, selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />

        <Text>
          {date.toLocaleString([], {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </Text>
      </View>
    </View>
  );
}
