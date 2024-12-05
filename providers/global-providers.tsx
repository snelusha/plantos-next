import React from "react";

import { QueryClientProvider } from "@/providers/query-client-provider";

export function GlobalProviders({ children }: React.PropsWithChildren) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}
