import React, { PropsWithChildren } from "react";
import { ScreenHeader } from "./screen-header";
import { Box } from "./ui/box";

type Props = PropsWithChildren & {
  className?: string;
};

const ScreenLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <Box className="flex-1 px-4 bg-estable-grey-900">
      <ScreenHeader />
      <Box className={className}>{children}</Box>
    </Box>
  );
};

export { ScreenLayout };
