import { useState } from "react";
import NftCollection from "../contracts/NftCollection";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract, beginCell, toNano } from "ton-core";
import { useQuery } from "@tanstack/react-query";
import { CHAIN } from "@tonconnect/protocol";
import { setItemContentCell } from "../contracts/nftContent/onChain";
import { useTonConnectUI } from "@tonconnect/ui-react";

const randomSeed = Math.floor(Math.random() * 10000);

export type mintArgs = {
  name: string;
  description: string;
  image: string;
};

export function useNftContract() {
  const { client } = useTonClient();
  const { sender, network, wallet } = useTonConnect();
  const [tonConnectUI] = useTonConnectUI();

  const nftContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new NftCollection(
      Address.parse(
        network === CHAIN.MAINNET
          ? "EQDLcS-wf4j9KFN5jtJ_sAOxnrv_x9rE6GCctQgkC2an6jQY"
          : "EQDzkXSigq_FQzQ6VYU-e84VgyRLk5avV2NxRiA5INjyepBe"
      )
    );
    return client.open(contract) as OpenedContract<NftCollection>;
  }, [client]);

  return {
    address: nftContract?.address.toString(),
    sendMintNft: (args: mintArgs) => {

      if (!nftContract) throw new Error("Nft contract not initialized");
      if (!wallet) throw new Error("Wallet not initialized");

      return nftContract.sendMintNft(sender, {
        value: toNano("0.02"),
        queryId: randomSeed,
        amount: toNano("0.014"),
        itemIndex: 0,
        itemOwnerAddress: Address.parse(wallet),
        itemContent: setItemContentCell({
          name: args.name,
          description: args.description,
          image: args.image,
        })
      });
    },
    sendMintNftFromFaucet: async (args: mintArgs) => {
      if (!nftContract) throw new Error("Nft contract not initialized");
      if (!wallet) throw new Error("Wallet not initialized");
      const nftMessage = beginCell();
      nftMessage.storeAddress(Address.parse(wallet))
      nftMessage.storeRef(setItemContentCell({
        name: args.name,
        description: args.description,
        image: args.image,
      }))
      const body = beginCell()
        .storeUint(1, 32)  // operation
        .storeUint(randomSeed, 64)
        .storeUint(0, 64)
        .storeCoins(toNano("0.014"))
        .storeRef(nftMessage)  // body
        .endCell();
      const boc = await tonConnectUI.sendTransaction({
        messages: [
          {
            address: nftContract.address.toString(),
            amount: toNano("0.02").toString(),
            payload: body.toBoc().toString("base64"),
          },
        ],
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
      });
      console.log({ boc });
      return boc;
    }
  };
}
