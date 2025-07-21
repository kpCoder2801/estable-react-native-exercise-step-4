import React, { PropsWithChildren } from "react";
import { ScreenHeader } from "./screen-header";
import { Box } from "./ui/box";

type Props = PropsWithChildren;

const ScreenLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box className="flex-1 px-4 bg-estable-grey-900">
      <ScreenHeader />
      {children}
    </Box>
  );
};

export { ScreenLayout };
