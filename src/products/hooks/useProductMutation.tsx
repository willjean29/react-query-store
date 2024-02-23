import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productsActions } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();
  const muation = useMutation({
    mutationFn: productsActions.createProduct,
    onMutate: (product) => {
      console.log("Mutating - Optimistic update");
      const optimisticProduct: Product = { id: Math.random(), ...product };
      queryClient.setQueriesData<Product[]>(["products", { filterKey: product.category }], (oldData) => {
        oldData = oldData || [];
        return [...oldData, optimisticProduct];
      });
      return {
        optimisticProduct,
      };
    },
    onSuccess: (product, _, context) => {
      const optimisticProduct = context?.optimisticProduct;
      queryClient.removeQueries(["product", optimisticProduct?.id]);
      // Invalidate and refetch
      // queryClient.invalidateQueries(["products", { filterKey: data.category }]);
      queryClient.setQueriesData<Product[]>(["products", { filterKey: product.category }], (oldData) => {
        oldData = oldData || [];
        return oldData.map((cacheProduct) => (cacheProduct.id === optimisticProduct?.id ? product : cacheProduct));
      });
    },
    onError: (error, variables, context) => {
      console.log({ error, variables, context });
      const optimisticProduct = context?.optimisticProduct;
      queryClient.removeQueries(["product", optimisticProduct?.id]);

      queryClient.setQueriesData<Product[]>(["products", { filterKey: optimisticProduct?.category }], (oldData) => {
        oldData = oldData || [];
        return oldData.filter((cacheProduct) => cacheProduct.id !== optimisticProduct?.id);
      });
    },
  });

  return muation;
};
