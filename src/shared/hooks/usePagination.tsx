import { useSearchParams } from "react-router";

type Props = {
  sizeDefault?: number;
}

export default function usePagination({ sizeDefault = 10 }: Props = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 0;
  const size = Number(searchParams.get("size")) || sizeDefault;

  return { pagination: { page, size }, setSearchParams };
}
