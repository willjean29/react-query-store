import { useQuery } from "@tanstack/react-query";
import { productsActions } from "..";

interface UseProductsProps {
  filterKey?: string;
}
export const useProducts = ({ filterKey }: UseProductsProps) => {
  const {
    isLoading,
    isError,
    error,
    data: products = [],
    isFetching,
  } = useQuery(["products", { filterKey }], () => productsActions.getProducts({ filterKey }), {
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    isError,
    error,
    products,
    isFetching,
  };
};
