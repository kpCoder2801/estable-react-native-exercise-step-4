import { Header } from "@/components/header";
import { ScreenLayout } from "@/components/screen-layout";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import React from "react";
import { ActivityIndicator } from "react-native";

type Props = {
  message?: string;
};

const LoadingState: React.FC<Props> = ({
  message = "Loading transactions...",
}) => {
  return (
    <ScreenLayout className="items-center justify-center flex-1">
      <Header />
      <Box className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="mt-2 text-white">{message}</Text>
      </Box>
    </ScreenLayout>
  );
};

export { LoadingState };
