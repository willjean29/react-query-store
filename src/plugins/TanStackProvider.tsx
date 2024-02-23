import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const query = new QueryClient();
export const TanStackProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={query}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
