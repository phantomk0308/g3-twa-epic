import { useEffect, useState } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { Flex, Text, Button } from "@radix-ui/themes";

export function Dummy() {
  const { initDataRaw, initData } = retrieveLaunchParams();

  return (
    <>
      <Flex direction="column" gap="2">
        <Text>initData</Text>
        <textarea
          name="init-data"
          id="1"
          rows={20}
          defaultValue={JSON.stringify(initData, null, 2)}
        ></textarea>
        <textarea
          name="init-data-raw"
          id="1"
          rows={20}
          defaultValue={JSON.stringify(initDataRaw, null, 2)}
        ></textarea>
      </Flex>
    </>
  );
}
