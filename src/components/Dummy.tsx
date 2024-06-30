import { useEffect, useState } from "react";
import { useInitData, useLaunchParams, type User } from "@tma.js/sdk-react";
import { Flex, Box, Container, Button, Code, Text } from "@radix-ui/themes";

export function Dummy() {
  // const initDataRaw = useLaunchParams().initDataRaw;
  const initData = useInitData();

  useEffect(() => {
    console.log("initData", initData);
  });

  return (
    <>
      <Flex direction="column" gap="2">
        <Text>Init Data</Text>
        <pre>
          <Code>{JSON.stringify(initData, null, 2)}</Code>
        </pre>
      </Flex>
    </>
  );
}
