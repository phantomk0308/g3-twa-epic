import { useState } from "react";
import { beginCell, toNano, Address, Cell, fromNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { useNftContract } from "../hooks/useNftContract";
import { CHAIN } from "@tonconnect/protocol";

import { Flex, Text, Button } from "@radix-ui/themes";

export function Radix() {
  const { connected } = useTonConnect();
  const { address, sendMintNft } = useNftContract();
  const { network } = useTonConnect();

  const [name, setName] = useState("NFT Name");
  const [description, setDescription] = useState("Description");
  const [image, setImage] = useState(
    "ipfs://QmTPSH7bkExWcrdXXwQvhN72zDXK9pZzH3AGbCw13f6Lwx/logo.jpg"
  );

  return (
    <>
      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes :)</Text>
        <Button>Let's go</Button>
      </Flex>
    </>
  );
}
