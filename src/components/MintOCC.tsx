import { useState } from "react";
import { beginCell, toNano, Address, Cell, fromNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { useNftContract } from "../hooks/useNftContract";
import { CHAIN } from "@tonconnect/protocol";

import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Button,
  Ellipsis,
  Input,
} from "./styled/styled";

export function MintOCC() {
  const { connected } = useTonConnect();
  const { address, sendMintNft } = useNftContract();
  const { network } = useTonConnect();

  const [name, setName] = useState("NFT Name");
  const [description, setDescription] = useState("Description");
  const [image, setImage] = useState(
    "ipfs://QmTPSH7bkExWcrdXXwQvhN72zDXK9pZzH3AGbCw13f6Lwx/logo.jpg"
  );

  return (
    <Card title="Jetton">
      <FlexBoxCol>
        <h3>Mint OCC</h3>
        <FlexBoxRow>
          Wallet
          <Ellipsis>
            <a
              href={`https://${
                network == CHAIN.MAINNET ? "" : "testnet."
              }getgems.io/collection/${address}`}
            >
              {address}
            </a>
          </Ellipsis>
        </FlexBoxRow>
        <FlexBoxRow>
          <label>Name </label>
          <Input
            style={{ marginRight: 8 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          <label>Description </label>
          <Input
            style={{ marginRight: 8 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          <label>Image Url (https:// or ipfs://)</label>
          <Input
            style={{ marginRight: 8 }}
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <Button
          disabled={!connected}
          onClick={async () => {
            sendMintNft({
              name,
              description,
              image,
            });
          }}
        >
          Mint OCC
        </Button>
      </FlexBoxCol>
    </Card>
  );
}
