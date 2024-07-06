import { useEffect, useState } from "react";
import { useInitData, retrieveLaunchParams } from "@tma.js/sdk-react";
import { validate, parse } from "@tma.js/init-data-node";
import { Flex, Text } from "@radix-ui/themes";

export function Dummy() {
  const initDataRaw = retrieveLaunchParams();
  const initData = useInitData();

  const [botToken, setBotToken] = useState<string>("");

  function validate(initDataRaw: any, botToken: string) {
    try {
      validate(initDataRaw, botToken);
      return true;
    } catch (e) {
      return false;
    }
  }

  return (
    <>
      <Flex direction="column" gap="2">
        <Text>Bot Token</Text>
        <input
          type="text"
          value={botToken}
          onChange={(e) => {
            setBotToken(e.target.value);
          }}
        />
      </Flex>
      {botToken && (
        <Flex direction="column" gap="2">
          <Text>Is Validate: {validate(initDataRaw, botToken)}</Text>
        </Flex>
      )}
      <Flex direction="column" gap="2">
        <Text>initData</Text>
        <textarea
          name="init-data"
          id="1"
          rows={20}
          defaultValue={JSON.stringify(initData, null, 2)}
        ></textarea>
      </Flex>
      <Flex direction="column" gap="2">
        <Text>initDataRaw</Text>
        <textarea
          name="init-data-raw"
          id="2"
          rows={20}
          defaultValue={JSON.stringify(initDataRaw, null, 2)}
        ></textarea>
      </Flex>
    </>
  );
}
