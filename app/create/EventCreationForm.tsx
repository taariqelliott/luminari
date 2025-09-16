import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { api } from '@/convex/_generated/api';
import { THEME } from '@/lib/theme';
import { useMutation, useQuery } from 'convex/react';
import * as ImagePicker from 'expo-image-picker';
import { CameraIcon, Images, Trash2, Upload } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

export default function EventCreationForm() {
  return (
    <View>
      <ImageUploadSection />
    </View>
  );
}

export function ImageUploadSection() {
  const { colorScheme } = useColorScheme();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const currentUser = useQuery(api.users.currentUser);
  const sendImage = useMutation(api.profileImages.sendProfileImage);
  const generateUploadUrl = useMutation(api.profileImages.generateUploadUrl);
  const deleteProfileImage = useMutation(api.profileImages.deleteById);

  if (!currentUser) return;
  const imageUrl = useQuery(api.profileImages.getProfileImage, { userId: currentUser?._id });

  const iconColor = colorScheme === 'dark' ? THEME.dark.accent : THEME.light.accentForeground;
  const buttonTextColor = colorScheme === 'dark' ? 'text-accent' : 'text-accent-foreground';
  const cancelTextColor =
    colorScheme === 'dark' ? 'text-accent-foreground' : 'text-accent-foreground';
  const uploadIconColor = colorScheme === 'light' ? iconColor : THEME.dark.primary;

  const launchImagePicker = async (mode?: string) => {
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
        await handleImageSave(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      throw error;
    }
  };

  const sendImageToDB = async (imageUri: string) => {
    if (!imageUri) return;
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': blob.type },
      body: blob,
    });
    const json = await result.json();
    console.log(json);

    if (!result.ok) {
      throw new Error(`Upload failed: ${JSON.stringify(json)}`);
    }
    const { storageId } = json;
    if (!currentUser) return;
    await sendImage({ storageId, createdBy: currentUser?._id });
  };

  const handleImageSave = async (imageUri: string) => {
    try {
      setSelectedImage(imageUri);
      await sendImageToDB(imageUri);
    } catch (error) {
      console.error('Save image error:', error);
      throw error;
    }
  };

  const handleImageRemove = () => {
    if (!imageUrl) {
      return;
    }
    setSelectedImage(undefined);
    deleteProfileImage({ storageId: imageUrl.storageId });
  };

  return (
    <View className="gap-2">
      <Dialog>
        <DialogTrigger disabled={!imageUrl} className="flex items-center">
          <Avatar alt="Zach Nugent's Avatar" className="h-24 w-24">
            <AvatarImage
              source={{ uri: imageUrl?.url ?? undefined }}
              className="rounded-full border border-primary"
            />
            <AvatarFallback>
              <Text className="text-primary">TE</Text>
            </AvatarFallback>
          </Avatar>
        </DialogTrigger>
        <DialogContent>
          <DialogClose asChild>
            <Pressable>
              <Image
                source={{ uri: imageUrl?.url ?? undefined }}
                className="h-[375px] w-[375px] object-cover"
              />
            </Pressable>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mx-auto mb-2 shadow-sm">
            <Upload color={uploadIconColor} strokeWidth={2} className="h-24 w-24" />
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
                onPress={() => launchImagePicker()}>
                <CameraIcon color={iconColor} size={24} strokeWidth={2} />
                <Text className={buttonTextColor}>Camera</Text>
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                variant="default"
                className="h-20 w-24 flex-col gap-0.5 rounded-2xl shadow-sm"
                onPress={() => launchImagePicker('gallery')}>
                <Images color={iconColor} size={24} strokeWidth={2} />
                <Text className={buttonTextColor}>Gallery</Text>
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                variant="default"
                className="h-20 w-24 flex-col gap-0.5 rounded-2xl shadow-sm"
                onPress={handleImageRemove}>
                <Trash2 color={iconColor} size={24} strokeWidth={2} />
                <Text className={buttonTextColor}>Remove</Text>
              </Button>
            </DialogClose>
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
