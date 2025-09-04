import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Text } from './ui/text';
import { useUsernameStore } from '@/stores/stores';

export default function UnauthenticatedView({ username }: { username: string }) {
  const updateUsername = useUsernameStore((user) => user.updateUsername);
  const [nameInput, setNameInput] = useState('');

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          {username === '' && (
            <View className="flex-1 items-center justify-center">
              <Card className="w-full max-w-sm">
                <CardHeader className="flex-row">
                  <View className="flex-1 gap-1.5">
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>Sign up to get started with our app</CardDescription>
                  </View>
                </CardHeader>
                <CardContent>
                  <View className="w-full justify-center gap-4">
                    <View className="gap-2">
                      <Label htmlFor="name">Username</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={nameInput}
                        onChangeText={(event: string) => {
                          const value = event.trim();
                          if (value === '') return;
                          setNameInput(value);
                        }}
                        returnKeyType="done"
                        onSubmitEditing={() => updateUsername(nameInput)}
                      />
                    </View>
                    {/* <View className="gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="m@example.com" />
                    </View>
                    <View className="gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" placeholder="Enter your password" secureTextEntry />
                    </View> */}
                  </View>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                  <Button onPress={() => updateUsername(nameInput)} className="w-full">
                    <Text>Sign Up</Text>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Text>Already have an account? Log In</Text>
                  </Button>
                </CardFooter>
              </Card>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}
