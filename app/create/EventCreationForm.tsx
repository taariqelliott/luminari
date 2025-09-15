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
import { THEME } from '@/lib/theme';
import * as ImagePicker from 'expo-image-picker';
import { CameraIcon, Images, Trash2, Upload } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

export default function EventCreationForm() {
  return (
    <View>
      <CameraUploadOptions />
    </View>
  );
}

export function CameraUploadOptions() {
  const { colorScheme } = useColorScheme();
  const [image, setImage] = useState<string | undefined>(undefined);

  const iconColor = colorScheme === 'dark' ? THEME.dark.accent : THEME.light.accentForeground;
  const buttonTextColor = colorScheme === 'dark' ? 'text-accent' : 'text-accent-foreground';
  const cancelTextColor =
    colorScheme === 'dark' ? 'text-accent-foreground' : 'text-accent-foreground';

  const uploadImage = async (mode?: string) => {
    try {
      let result: ImagePicker.ImagePickerResult;

      if (mode === 'gallery') {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      throw error;
    }
  };

  const saveImage = async (image: string) => {
    try {
      setImage(image);
      console.log(image);
    } catch (error) {
      throw error;
    }
  };

  const removeImage = () => {
    setImage(undefined);
  };

  return (
    <View className="gap-2">
      <Dialog>
        <DialogTrigger disabled={!image}>
          <Image
            source={{ uri: image }}
            className="h-[150px] w-[150px] rounded-full border-4 border-primary"></Image>
        </DialogTrigger>
        <DialogContent>
          <DialogClose asChild>
            <Pressable>
              <Image source={{ uri: image }} className="h-[375px] w-[375px] object-cover" />
            </Pressable>
          </DialogClose>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mx-auto mb-2 shadow-sm">
            {/* <Text className={cancelTextColor}>Upload</Text> */}
            <Upload
              // size={15}
              color={colorScheme === 'light' ? iconColor : THEME.dark.primary}
              strokeWidth={2}
              className="h-24 w-24"
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>Choose how you want to upload your image.</DialogDescription>
          </DialogHeader>

          <View className="flex-row justify-between gap-2">
            <DialogClose asChild>
              <Button
                variant="default"
                className="h-20 w-24 flex-col gap-0.5 rounded-2xl shadow-sm"
                onPress={() => {
                  uploadImage();
                }}>
                <CameraIcon color={iconColor} size={24} strokeWidth={2} />
                <Text className={buttonTextColor}>Camera</Text>
              </Button>
            </DialogClose>

            <DialogTrigger asChild>
              <Button
                variant="default"
                className="h-20 w-24 flex-col gap-0.5 rounded-2xl shadow-sm"
                onPress={() => {
                  uploadImage('gallery');
                }}>
                <Images color={iconColor} size={24} strokeWidth={2} />
                <Text className={buttonTextColor}>Gallery</Text>
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="h-20 w-24 flex-col gap-0.5 rounded-2xl shadow-sm"
                onPress={removeImage}>
                <Trash2 color={iconColor} size={24} strokeWidth={2} />
                <Text className={buttonTextColor}>Remove</Text>
              </Button>
            </DialogTrigger>
          </View>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                <Text className={cancelTextColor}>Cancel</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
}
