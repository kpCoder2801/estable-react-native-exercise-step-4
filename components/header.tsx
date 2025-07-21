import React from "react";
import { Button } from "./ui/button";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

const FILTER_OPTIONS = ["Type", "Account", "Status", "Date"];

const Header: React.FC = () => {
  return (
    <VStack className="gap-3 pb-4">
      <Text className="text-3xl font-bold text-white">All transactions</Text>
      <HStack className="gap-2">
        {FILTER_OPTIONS.map((option) => (
          <Button
            key={option}
            className="bg-transparent border rounded-lg border-estable-primary-400"
          >
            <Text className="font-semibold text-estable-primary-400">
              {option}
            </Text>
          </Button>
        ))}
      </HStack>
    </VStack>
  );
};

Header.displayName = "Header";

export { Header };
