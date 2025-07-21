import { Box } from "@/components/ui/box";
import React from "react";
import { ActivityIndicator } from "react-native";

type Props = {
  isLoading: boolean;
};

const LoadMoreFooter: React.FC<Props> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <Box className="items-center py-4">
      <ActivityIndicator size="small" color="#ffffff" />
    </Box>
  );
};

export { LoadMoreFooter };
