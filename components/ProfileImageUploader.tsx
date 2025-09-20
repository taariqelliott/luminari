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
import { CameraIcon, Images, Trash2 } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileImageUploader() {
  const { colorScheme } = useColorScheme();

  const currentUser = useQuery(api.users.currentUser);
  const uploadProfileImage = useMutation(api.profileImages.sendProfileImage);
  const generateUploadUrlMutation = useMutation(api.profileImages.generateUploadUrl);
  const deleteProfileImageMutation = useMutation(api.profileImages.deleteProfileImageById);

  const currentProfileImage = useQuery(
    api.profileImages.getProfileImage,
    currentUser ? { userId: currentUser._id } : 'skip'
  );

  if (!currentUser) return null;

  const iconColor = colorScheme === 'dark' ? THEME.dark.accent : THEME.light.accentForeground;
  const buttonTextColor = colorScheme === 'dark' ? 'text-accent' : 'text-accent-foreground';
  const cancelTextColor = 'text-accent-foreground';
  const uploadButtonColor = colorScheme === 'light' ? iconColor : THEME.dark.primary;

  const pickImage = async (mode?: 'camera' | 'gallery') => {
    try {
      let pickerResult: ImagePicker.ImagePickerResult;
      const perms = await ImagePicker.requestCameraPermissionsAsync();
      if (perms.granted === false) {
        Alert.alert('This app requires user permission to use the camera.');
        return;
      }

      if (mode === 'gallery') {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        pickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        pickerResult = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!pickerResult.canceled) {
        await saveSelectedImage(pickerResult.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      throw error;
    }
  };

  const sendImageToStorage = async (imageUri: string) => {
    if (!imageUri) return;

    if (currentProfileImage?.url) {
      deleteProfileImageMutation({ storageId: currentProfileImage.storageId });
    }
    const response = await fetch(imageUri);
    const imageBlob = await response.blob();
    const uploadUrl = await generateUploadUrlMutation();
    const uploadResult = await fetch(uploadUrl, {
      method: 'POST',
      headers: { 'Content-Type': imageBlob.type },
      body: imageBlob,
    });
    const uploadJson = await uploadResult.json();
    console.log(uploadJson);

    if (!uploadResult.ok) {
      throw new Error(`Upload failed: ${JSON.stringify(uploadJson)}`);
    }
    const { storageId } = uploadJson;
    if (!currentUser) return;
    await uploadProfileImage({ storageId, createdBy: currentUser?._id });
  };

  const saveSelectedImage = async (imageUri: string) => {
    try {
      await sendImageToStorage(imageUri);
    } catch (error) {
      console.error('Save image error:', error);
      throw error;
    }
  };

  const removeProfileImage = () => {
    if (!currentProfileImage) return;
    deleteProfileImageMutation({ storageId: currentProfileImage.storageId });
  };

  return (
    <View className="relative mx-auto inline-flex gap-2">
      <Avatar alt="User Avatar" className="h-40 w-40">
        <AvatarImage
          source={{ uri: currentProfileImage?.url ?? undefined }}
          className="rounded-full border border-primary"
        />
        <AvatarFallback>
          <View className="h-full w-full items-center justify-center object-contain">
            <Text className="text-muted-foreground">No Image</Text>
          </View>
        </AvatarFallback>
      </Avatar>

      <Dialog className="absolute bottom-0 right-0 rounded-full">
        <DialogTrigger asChild>
          <Button
            variant={colorScheme === 'dark' ? 'default' : 'outline'}
            size={'icon'}
            className="mx-auto rounded-full shadow-sm">
            <CameraIcon color={colorScheme === 'dark' ? iconColor : uploadButtonColor} size={17} />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>Choose how you want to upload your image.</DialogDescription>
          </DialogHeader>

          <View className="flex-row justify-between gap-2">
            <DialogClose asChild>
              <TouchableOpacity onPress={() => pickImage('camera')}>
                <Button
                  variant="default"
                  className="h-20 w-24 flex-col gap-0.5 rounded-2xl shadow-sm">
                  <CameraIcon color={iconColor} size={24} strokeWidth={2} />
                  <Text className={buttonTextColor}>Camera</Text>
                </Button>
              </TouchableOpacity>
            </DialogClose>

            <DialogClose asChild>
              <Button
                variant="default"
                className="h-20 w-24 flex-col gap-0.5 rounded-2xl shadow-sm"
                onPress={() => pickImage('gallery')}>
                <Images color={iconColor} size={24} strokeWidth={2} />
                <Text className={buttonTextColor}>Gallery</Text>
              </Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                variant="default"
                className="h-20 w-24 flex-col gap-0.5 rounded-2xl shadow-sm"
                onPress={removeProfileImage}>
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
