import { useEffect, useState } from "react";
import { useInitData, useLaunchParams } from "@tma.js/sdk-react";
import { validate } from "@tma.js/init-data-node";
import { Flex, Text } from "@radix-ui/themes";

export function Dummy() {
  const initDataRaw = useLaunchParams().initDataRaw;
  const initData = useInitData();

  useEffect(() => {
    // const isValid = validate(initData);
    console.log("initData", initData);
  });

  return (
    <>
      <Flex direction="column" gap="2">
        <Text>initData</Text>
        <textarea name="init-data" id="1" rows={20} defaultValue={JSON.stringify(initData, null, 2)}></textarea>
      </Flex>
      <Flex direction="column" gap="2">
        <Text>initDataRaw</Text>
        <textarea name="init-data-raw" id="2" rows={20} defaultValue={JSON.stringify(initDataRaw, null, 2)}></textarea>
      </Flex>
    </>
  );
}
