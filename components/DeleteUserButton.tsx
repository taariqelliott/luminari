import React from 'react';
import { Button } from './ui/button';
import { useUser } from '@clerk/clerk-react';
import { Text } from './ui/text';
import { router } from 'expo-router';

export default function DeleteUserButton() {
  const { user } = useUser();

  const handleDelete = async () => {
    if (!user) return;

    try {
      await user.delete();
      router.push('/');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Button onPress={handleDelete}>
      <Text>Delete Account</Text>
    </Button>
  );
}
