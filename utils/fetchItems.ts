import cheerio from "cheerio-without-node-native";

export interface Item {
  title: string;
  image: string;
  link: string;
}

const fetchItems = async (): Promise<Item[]> => {
  try {
    const response = await fetch(
      "https://bindingofisaacrebirth.fandom.com/wiki/Collection_Page_(Repentance)"
    );

    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    const itemsArray: Item[] = Array.from($("td > span.tooltip")).map(
      (element: any) => ({
        title: $(element).find("a").attr("title"),
        image: $(element).find("img").attr("data-src"),
        link: $(element).find("a").attr("href"),
      })
    );

    // console.log("Items Array:", itemsArray);
    return itemsArray;
  } catch (error) {
    console.error("Error fetching Isaac items:", error);
    return [];
  }
};

export default fetchItems;
