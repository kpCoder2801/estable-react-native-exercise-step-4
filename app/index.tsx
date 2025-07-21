import { ScreenLayout } from "@/components/screen-layout";
import { Text } from "@/components/ui/text";
import React from "react";

const Screen: React.FC = () => {
  return (
    <ScreenLayout>
      <Text className="text-xl font-medium">Screen</Text>
    </ScreenLayout>
  );
};

export default Screen;
