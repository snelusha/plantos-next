"use client";

import React from "react";

import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (typeof window === "undefined") return makeQueryClient();
  if (!browserClient) browserClient = makeQueryClient();
  return browserClient;
}

export function QueryClientProvider({ children }: React.PropsWithChildren) {
  const client = getQueryClient();

  return <Provider client={client}>{children}</Provider>;
}
