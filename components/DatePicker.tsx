import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Text } from '@/components/ui/text';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { View } from 'react-native';

export default function DatePicker() {
  const [date, setDate] = useState(new Date());

  return (
    <View className="flex-1 items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Text>Choose A Date</Text>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Choose your event date</DialogTitle>
            <DialogDescription>
              Make changes to your event date here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
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
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                <Text>Cancel</Text>
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>
                <Text>Save changes</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
}
