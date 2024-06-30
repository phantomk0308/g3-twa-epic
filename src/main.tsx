import { SDKProvider, useLaunchParams } from "@tma.js/sdk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "@radix-ui/themes/styles.css";
import "./index.css";
import './mockEnv.ts';

// this manifest is used temporarily for development purposes
const manifestUrl =
  "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <QueryClientProvider client={queryClient}>
      <SDKProvider acceptCustomStyles>
        <Theme>
          <App />
        </Theme>
      </SDKProvider>
    </QueryClientProvider>
  </TonConnectUIProvider>
);
