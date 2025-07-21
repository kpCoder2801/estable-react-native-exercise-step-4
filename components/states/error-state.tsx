import { Header } from "@/components/header";
import { ScreenLayout } from "@/components/screen-layout";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import React from "react";

type Props = {
  error: Error;
  title?: string;
};

const ErrorState: React.FC<Props> = ({
  error,
  title = "Error loading transactions",
}) => {
  return (
    <ScreenLayout className="items-center justify-center flex-1">
      <Header />
      <Box className="items-center justify-center flex-1">
        <Text className="text-center text-red-500">
          {title}: {error.message}
        </Text>
      </Box>
    </ScreenLayout>
  );
};

export { ErrorState };
