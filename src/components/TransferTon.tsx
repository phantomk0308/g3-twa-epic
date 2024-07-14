import { useState } from "react";
import styled from "styled-components";
import { Address, toNano, comment, beginCell } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";
import { useTonConnectUI } from "@tonconnect/ui-react";

export function TransferTon() {
  const { sender, connected } = useTonConnect();
  const [tonConnectUI] = useTonConnectUI();

  const [tonAmount, setTonAmount] = useState("0.02");
  const [tonComment, setTonComment] = useState("Check in");
  const [tonRecipient, setTonRecipient] = useState(
    "UQCTSiULauZbMap-b9sYoSgWMHZPGF4YPG4cTp5Nepb3Hfuf"
  );

  return (
    <Card>
      <FlexBoxCol>
        <h3>Transfer TON: G3.io</h3>
        <FlexBoxRow>
          <label>Amount </label>
          <Input
            style={{ marginRight: 8 }}
            type="number"
            value={tonAmount}
            onChange={(e) => setTonAmount(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          <label>To </label>
          <Input
            style={{ marginRight: 8 }}
            value={tonRecipient}
            onChange={(e) => setTonRecipient(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          <label>Comment </label>
          <Input
            style={{ marginRight: 8 }}
            value={tonComment}
            onChange={(e) => setTonComment(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <Button
          disabled={!connected}
          style={{ marginTop: 18 }}
          onClick={async () => {
            sender.send({
              to: Address.parse(tonRecipient),
              value: toNano(tonAmount),
              // bounce: true,
              body: comment(tonComment),
            });
          }}
        >
          Transfer Only Pay GAS
        </Button>
        <Button
          disabled={!connected}
          style={{ marginTop: 18 }}
          onClick={async () => {
            const nonce = Math.floor(10000 + Math.random() * 100000);
            const memo_tx = `MINT $user_id $package_id ${nonce}`;

            const comment = beginCell()
              .storeUint(0, 32)
              .storeStringTail(memo_tx)
              .endCell();

            await tonConnectUI.sendTransaction({
              validUntil: Math.floor(Date.now() / 1000) + 360,
              messages: [
                {
                  address: tonRecipient,
                  amount: toNano(tonAmount).toString(),
                  payload: comment.toBoc().toString("base64"),
                },
              ],
            });
          }}
        >
          Transfer Normal Wallet
        </Button>
      </FlexBoxCol>
    </Card>
  );
}
