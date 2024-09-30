import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import fetchItems, { Item as ItemProps } from "../utils/fetchItems";

type ContextValue = {
  items: ItemProps[];
  loading: boolean;
};

const ItemContext = createContext<ContextValue>({} as ContextValue);

export default function ItemProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      const items = await fetchItems();
      setItems(items);
      setLoading(false);
    };

    getItems();
  }, []);

  return (
    <ItemContext.Provider value={{ items, loading }}>
      {children}
    </ItemContext.Provider>
  );
}

export const useItems = () => useContext(ItemContext);
