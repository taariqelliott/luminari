import {
  useEventDateStore,
  useEventEndTimeStore,
  useEventStartTimeStore,
} from '@/stores/EventCreationForm';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { View } from 'react-native';
import { Label } from './ui/label';

export default function DatePicker() {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  startTime.setHours(9, 0, 0, 0);
  endTime.setHours(12, 0, 0, 0);

  const updateEventDate = useEventDateStore((state) => state.updateEventDate);
  const updateStartTime = useEventStartTimeStore((state) => state.updateEventStartTime);
  const updateEndTime = useEventEndTimeStore((state) => state.updateEventEndTime);

  return (
    <View className="items-center justify-center">
      <View className="grid gap-2">
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          display="inline"
          mode="date"
          onChange={(_, selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
              updateEventDate(selectedDate.toDateString());
            }
          }}
        />

        <View className="flex-row items-center justify-between">
          <Label htmlFor="startTime">Start Time</Label>
          <DateTimePicker
            value={startTime}
            mode="time"
            onChange={(_, selectedStart) => {
              if (selectedStart) {
                setStartTime(selectedStart);
                updateStartTime(
                  selectedStart.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })
                );
              }
            }}
          />
        </View>

        <View className="flex-row items-center justify-between">
          <Label htmlFor="endTime">End Time</Label>
          <DateTimePicker
            value={endTime}
            mode="time"
            onChange={(_, selectedEnd) => {
              if (selectedEnd) {
                setEndTime(selectedEnd);
                updateEndTime(
                  selectedEnd.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                  })
                );
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}
