import { useState } from "react";
import styled from "styled-components";
import { Address, toNano, comment } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";

export function TransferTon() {
  const { sender, connected } = useTonConnect();

  const [tonAmount, setTonAmount] = useState("0.001");
  const [tonComment, setTonComment] = useState("");
  const [tonRecipient, setTonRecipient] = useState(
    "UQCqOu6ajaBgdcvlVhmU3WaD2d7HQaCzRNdn8xcJx31kbvkr"
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
            value={tonRecipient}
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
              body: comment(tonComment),
            });
          }}
        >
          Transfer
        </Button>
      </FlexBoxCol>
    </Card>
  );
}
