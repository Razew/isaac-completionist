import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import fetchItems, { ItemData } from "../utils/fetchItems";

type ContextValue = {
  items: ItemData[];
  loading: boolean;
};

const ItemContext = createContext<ContextValue>({} as ContextValue);

export default function ItemProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItems = async () => {
      setLoading(true); // Might not be necessary, but for good measure
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
