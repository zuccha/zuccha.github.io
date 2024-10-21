import { React } from "../../deps.ts";

type Resource<T> =
  | readonly [undefined, "initial"]
  | readonly [undefined, "loading"]
  | readonly [undefined, "failure"]
  | readonly [T, "success"];

const emptyResource = [undefined, "initial"] as const;

const useResource = <T>(
  url: string,
  parse: (data: string) => T
): Resource<T> => {
  const [resource, setResource] = React.useState<Resource<T>>(emptyResource);

  React.useEffect(() => {
    const fetchResource = async () => {
      try {
        setResource([undefined, "loading"]);
        const response = await fetch(url);
        if (response.status !== 200) throw new Error("Failed to retrieve data");
        const data = await response.text();
        const parsedData = parse(data);
        setResource([parsedData, "success"]);
      } catch {
        setResource([undefined, "failure"]);
      }
    };
    fetchResource();
  }, [url, parse]);

  return resource;
};

export default useResource;
