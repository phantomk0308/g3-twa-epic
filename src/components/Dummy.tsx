import { useEffect, useState } from "react";
import { useInitData, retrieveLaunchParams } from "@tma.js/sdk-react";
import { validate } from "@tma.js/init-data-node";
// import { v as validate } from "../packs/test/entries/index-uL7oQrpu";
// import { validate } from "../packs/test/entries/node";
import { Flex, Text, Button } from "@radix-ui/themes";

export function Dummy() {
  const initDataRaw = retrieveLaunchParams();
  const initData = useInitData();

  const [botToken, setBotToken] = useState<string>("");

  const iniDataRawTest =
    "user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-3788475317572404878&chat_type=private&auth_date=1709144340&hash=371697738012ebd26a111ace4aff23ee265596cd64026c8c3677956a85ca1827";

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
        <Button
          onClick={() => {
            console.log({ iniDataRawTest, botToken });
            validate(iniDataRawTest, botToken);
            console.log("validate done");
          }}
        >
          Validate data
        </Button>
      </Flex>

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
