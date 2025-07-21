import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Box className="items-center justify-center flex-1 gap-4 p-5">
        <Text>This screen does not exist.</Text>
        <Link href="/">
          <Text className="text-blue-600">Go to home screen!</Text>
        </Link>
      </Box>
    </>
  );
}
