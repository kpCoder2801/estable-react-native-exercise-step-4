import { COLOR_BRANDING } from "@/constants";
import { useScreen } from "@/hooks";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Box } from "./ui/box";
import { Pressable } from "./ui/pressable";

type Props = {
  allowBack?: boolean;
};

const ScreenHeader: React.FC<Props> = ({ allowBack = true }) => {
  const { SAFE_AREA_TOP } = useScreen();
  const router = useRouter();

  // NOTE: Need to check if the router can go back
  // remove here to show the back button as design
  const showBackButton = allowBack;

  return (
    <Box className="pb-6">
      <Box style={{ height: SAFE_AREA_TOP }} />
      {showBackButton ? (
        <Box className="items-start justify-start flex-shrink w-fit">
          <Pressable
            className="p-1 rounded-full bg-estable-grey-600"
            onPress={() => router.back()}
          >
            <ArrowLeft
              width={20}
              height={20}
              color={COLOR_BRANDING.base.light}
            />
          </Pressable>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export { ScreenHeader };
