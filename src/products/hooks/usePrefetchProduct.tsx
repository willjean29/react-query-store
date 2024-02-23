import { useQueryClient } from "@tanstack/react-query";
import { productsActions } from "..";

export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();
  const prefetchProduct = (id: number) => {
    queryClient.prefetchQuery(["product", id], () => productsActions.getProduct({ id }));
  };

  return prefetchProduct;
};
