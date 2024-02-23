import { useQuery } from "@tanstack/react-query";
import { productsActions } from "..";

interface UseProductProps {
  id?: number;
}
export const useProduct = ({ id }: UseProductProps) => {
  const {
    isLoading,
    isError,
    error,
    data: product,
    isFetching,
  } = useQuery(["product", id], () => productsActions.getProduct({ id }), {
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    isError,
    error,
    product,
    isFetching,
  };
};
